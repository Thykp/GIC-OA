import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });
export default api;

export const fetchCafes = (location?: string) => api.get('/cafes', { params: { location } });
export const createCafe = (data: any) => api.post('/cafes', data);
export const updateCafe = (data: any) => api.put('/cafes', data);
export const deleteCafe = (id: string) => api.delete('/cafes', { params: { id } });

export const fetchEmployees = (cafe?: string) => api.get('/employees', { params: { cafe } });
export const createEmployee = (data: any) => api.post('/employees', data);
export const updateEmployee = (data: any) => api.put('/employees', data);
export const deleteEmployee = (id: string) => api.delete('/employees', { params: { id } });