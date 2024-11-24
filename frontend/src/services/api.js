import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const API = axios.create({
  baseURL: 'https://kicksofflabs-assignment.onrender.com/api', // Update with your backend URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const login = (credentials) => API.post('/auth/login', credentials);
export const register = (credentials) => API.post('/auth/register', credentials);
export const fetchEvents = () => API.get('/events');
export const fetchEventsforCurrentMonth=(year,month)=>API.get(`/events/currentMonth?year=${year}&month=${month}`);
export const createEvent = (eventData) => API.post('/events', eventData);
export const updateEvent = (id, eventData) => API.put(`/events/${id}`, eventData);
export const deleteEvent = (id) => API.delete(`/events/${id}`);
