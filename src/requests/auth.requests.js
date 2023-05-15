import http from '../utils/http';

export const login = data => http.post('/oauth/token', data);

export const logout = () => http.get('/api/v1/logout');

export const fetchAuthUser = () => http.get('/api/v1/auth/user');

export const registerUser = data => http.post('/api/v1/register', data);