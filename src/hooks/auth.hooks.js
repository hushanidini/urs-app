import { useMutation } from 'react-query';
import {
  login,
  logout,
  registerUser,
} from './../requests/auth.requests';

export const useLogin = () =>
  useMutation(async data => {
    const res = await login(data);
    return res;
  });

export const useLogout = () =>
  useMutation(async () => {
    const res = await logout();
    return res;
  });

export const useRegisterUser = () =>
  useMutation(async data => {
    const res = await registerUser(data);
    return res;
  });