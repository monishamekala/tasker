import { useEffect, useState } from 'react';
import axios from 'axios';

interface TaskEvent {
  event_time: string;
  event_type: string;
  payload?: string;
}

export default function TaskTimeline({ taskId }: { taskId: string }) {
  const [events, setEvents] = useState<TaskEvent[]>([]);

  useEffect(() => {
    axios.get(`/events/${taskId}`).then(res => setEvents(res.data));
  }, [taskId]);

  return (
    <div>
      <h3 className="text-sm font-semibold mb-2">Event Timeline</h3>
      <ul className="text-xs border-l pl-4">
        {events.map((e, idx) => (
          <li key={idx} className="mb-1">
            <span className="font-mono text-gray-600">[{e.event_time}]</span> {e.event_type}
          </li>
        ))}
      </ul>
    </div>
  );
}
