import { useEffect, useRef, useState } from 'react';

export function useWebSocket(
  url: string,
  onMessage: (data: any) => void,
  options = { maxRetries: 5, baseDelay: 1000 }
) {
  const ws = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const retryCount = useRef(0);

  useEffect(() => {
    let retryTimeout: number;

    const connect = () => {
      if (retryCount.current >= options.maxRetries) {
        console.warn('[WebSocket] Max retries reached. Giving up.');
        return;
      }

      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        setConnected(true);
        retryCount.current = 0; // Reset on success
        console.log('[WebSocket] Connected');
      };

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          onMessage(data);
        } catch (err) {
          console.warn('[WebSocket] JSON parse error:', err);
        }
      };

      ws.current.onclose = () => {
        setConnected(false);
        retryCount.current += 1;

        const delay = options.baseDelay * 2 ** (retryCount.current - 1);
        console.warn(`[WebSocket] Disconnected. Retry #${retryCount.current} in ${delay}ms`);

        retryTimeout = setTimeout(connect, delay);
      };

      ws.current.onerror = (err) => {
        console.error('[WebSocket] Error:', err);
        ws.current?.close();
      };
    };

    connect();

    return () => {
      clearTimeout(retryTimeout);
      ws.current?.close();
    };
  }, [url]);

  return { connected };
}
