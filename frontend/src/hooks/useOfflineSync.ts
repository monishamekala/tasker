import { useEffect, useState } from 'react';

const LOCAL_QUEUE_KEY = 'offline-crdt-queue';

export function useOfflineSync() {
  const [queue, setQueue] = useState<any[]>([]);
  const [online, setOnline] = useState(navigator.onLine);
  const [syncing, setSyncing] = useState(false);

  // Load any offline edits
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_QUEUE_KEY);
    if (stored) {
      setQueue(JSON.parse(stored));
    }
  }, []);

  // Queue a local CRDT update
  const queueChange = (change: any) => {
    const updated = [...queue, change];
    setQueue(updated);
    localStorage.setItem(LOCAL_QUEUE_KEY, JSON.stringify(updated));
  };

  // When online, dispatch all to backend CRDT merge endpoint
  useEffect(() => {
    const syncChanges = async () => {
      if (!online || queue.length === 0) return;
      setSyncing(true);

      try {
        const res = await fetch('/merge/crdt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ changes: queue }),
        });

        if (res.ok) {
          console.log('[CRDT] Merge successful');
          setQueue([]);
          localStorage.removeItem(LOCAL_QUEUE_KEY);
        } else {
          console.warn('[CRDT] Merge failed');
        }
      } catch (err) {
        console.error('[CRDT] Error during merge:', err);
      } finally {
        setSyncing(false);
      }
    };

    syncChanges();
  }, [online, queue]);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return { queueChange, isOnline: online, syncing };
}
