import { useState } from 'react';
import { createTask } from '../services/api';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const [created, setCreated] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTask({ title });
    setTitle('');
    setCreated(true);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <label className="block mb-2 font-medium">New Task Title</label>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border px-2 py-1 w-full mb-2"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
        Create
      </button>
      {created && <p className="text-green-600 mt-2">Task created!</p>}
    </form>
  );
}
