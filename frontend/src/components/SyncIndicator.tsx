import { useEffect, useState } from 'react';

export default function SyncIndicator() {
  const [online, setOnline] = useState(navigator.onLine);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
      setSyncing(true);
      setTimeout(() => setSyncing(false), 1000);
    };
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="flex items-center space-x-2 text-xs">
      <span className={`px-2 py-1 rounded text-white ${online ? 'bg-green-500' : 'bg-red-500'}`}>
        {online ? 'Online' : 'Offline'}
      </span>
      {syncing && <span className="text-blue-500 animate-pulse">Syncing...</span>}
    </div>
  );
}
