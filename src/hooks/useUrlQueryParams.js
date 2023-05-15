import { useMemo } from 'react';

export default function useUrlQueryParams(search) {
  return useMemo(() => {
    const params = new URLSearchParams(search);
    const formatedData = {};
    for (const [key, value] of params.entries()) {
      formatedData[key] = value;
    }

    return formatedData;
  }, [search]);
}
