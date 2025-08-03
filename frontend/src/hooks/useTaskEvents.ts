import { useState } from 'react';
import { useWebSocket } from './useWebSocket';

export function useTaskEvents(taskId: string) {
  const [events, setEvents] = useState<any[]>([]);

  useWebSocket(`ws://localhost:8080/ws/tasks/${taskId}`, (data) => {
    if (data.task_id === taskId) {
      setEvents(prev => [...prev, data]);
    }
  });

  return events;
}
