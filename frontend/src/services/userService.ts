import api from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'contributor' | 'viewer';
}

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get('/users/me');
  return response.data;
};

export const login = async (email: string, password: string): Promise<{ token: string }> => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem('authToken');
};
