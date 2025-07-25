import { useEffect, useRef, useState } from 'react';

interface Params {
  url: string;
}

export function useWebsocket<T>({ url }: Params) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Event | null>(null);
  const [readyState, setReadyState] = useState<WebSocket['readyState']>();
  const ws = useRef<WebSocket | null>(null);

  const send = (data: Object) => {
    if (ws.current) ws.current.send(JSON.stringify(data));
  };

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      setReadyState(ws.current?.readyState);
    };

    ws.current.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };

    ws.current.onerror = (event) => {
      setError(event);
    };

    ws.current.onclose = () => {
      setReadyState(ws.current?.readyState);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  return { send, data, error, readyState };
}
