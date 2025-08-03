import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTask } from '../services/api';

export default function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getTask(id).then(res => setTask(res.data)).catch(() => setTask(null));
    }
  }, [id]);

  if (!task) return <div>Loading or not found...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{task.title}</h2>
      <p>Status: {task.status}</p>
      <p>ID: {task.id}</p>
    </div>
  );
}
