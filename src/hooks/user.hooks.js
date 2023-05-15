import { useQuery } from 'react-query';
import QueryConstant from '../constants/QueryConstant';
import {
    getProfile,
  } from '../requests/user.requests';
export const useGetProfileReq = options =>
  useQuery(
    [QueryConstant.PROFILE],
    async () => {
      const res = await getProfile();
      return res.data;
    },
    {
      ...options,
    },
  );