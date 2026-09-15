import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000' });

// Auth
export const login = (email, password) =>
  API.get(`/users?email=${encodeURIComponent(email)}&password=${password}`).then(res => res.data[0]);

export const registerUser = (userData) =>
  API.post('/users', userData).then(res => res.data);

// Users
export const getUsers = () => API.get('/users').then(res => res.data);

// Events
export const getEvents = () => API.get('/events').then(res => res.data);

export const getEvent = (id) => API.get(`/events/${id}`).then(res => res.data);

export const createEvent = (eventData) =>
  API.post('/events', eventData).then(res => res.data);

export const updateEvent = (id, eventData) =>
  API.patch(`/events/${id}`, eventData).then(res => res.data);

export const deleteEvent = (id) => API.delete(`/events/${id}`);

export const incrementViews = (id) =>
  API.get(`/events/${id}`).then(res => {
    const current = res.data.views || 0;
    return API.patch(`/events/${id}`, { views: current + 1 }).then(r => r.data);
  }).catch(() => null);

// Registrations
export const getRegistrations = (eventId) =>
  API.get(`/registrations?eventId=${eventId}`).then(res => res.data);

export const getRegistrationsByUser = (userId) =>
  API.get(`/registrations?userId=${userId}`).then(res => res.data);

export const createRegistration = (regData) =>
  API.post('/registrations', regData).then(res => res.data);

export const updateRegistration = (id, regData) =>
  API.patch(`/registrations/${id}`, regData).then(res => res.data);

export const deleteRegistration = (id) => API.delete(`/registrations/${id}`);

// Notifications
export const getNotifications = (userId) =>
  API.get(`/notifications?userId=${userId}`).then(res => res.data);

export const createNotification = (notifData) =>
  API.post('/notifications', notifData).then(res => res.data);

export const updateNotification = (id, notifData) =>
  API.patch(`/notifications/${id}`, notifData).then(res => res.data);
