import http from '../utils/http';

export const getProfile = () => http.get('/api/v1/profile');

export const updateUserDetailsById = (data) => http.put(`/api/v1/profile`, data);
