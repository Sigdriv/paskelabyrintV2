import type { TkError } from '@http';
import type { User } from '@api';

import { useQuery } from '@tanstack/react-query';
import { getUser } from '@api';

import { queryKeys } from '../queryKeys';

export function useGetUser() {
  const queryKey = queryKeys.getUser;

  return useQuery<User, TkError>({
    queryKey,
    queryFn: getUser,
    retry: false,
  });
}
