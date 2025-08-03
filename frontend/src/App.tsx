import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskDetail from './components/TaskDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/" element={<TaskList />} />
        <Route path="/new" element={<TaskForm />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
