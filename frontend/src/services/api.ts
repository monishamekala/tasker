import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080',
});

export const fetchTasks = () => API.get('/tasks');
export const getTask = (id: string) => API.get(`/tasks/${id}`);
export const createTask = (data: any) => API.post('/tasks', data);
export const updateTask = (id: string, data: any) => API.put(`/tasks/${id}`, data);
