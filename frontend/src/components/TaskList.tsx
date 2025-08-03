import { useEffect, useState } from 'react';
import { fetchTasks } from '../services/api';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks().then(res => setTasks(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Tasks</h2>
      <ul>
        {tasks.map((t: any) => (
          <li key={t.id}>
            <b>{t.title}</b> – {t.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
