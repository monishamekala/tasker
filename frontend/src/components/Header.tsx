import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="font-bold text-lg">Task Manager</h1>
      <nav>
        <Link to="/" className="mx-2">Tasks</Link>
        <Link to="/new" className="mx-2">New Task</Link>
      </nav>
    </header>
  );
}
