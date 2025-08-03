import api from './api';

export interface CRDTChange {
  task_id: string;
  type: 'OR-Set' | 'LWW';
  field: string;
  value: any;
  timestamp: number;
}

export const pushCRDTChanges = async (changes: CRDTChange[]): Promise<void> => {
  await api.post('/merge/crdt', { changes });
};

export const getEventStreamToken = async (): Promise<{ token: string }> => {
  const response = await api.get('/events/token');
  return response.data;
};
