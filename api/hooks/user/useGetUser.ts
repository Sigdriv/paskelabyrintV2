import type { TkError } from '@http';
import type { User } from '@api';

import { useQuery } from '@tanstack/react-query';
import { getUser } from '@api';

import { queryKeys } from '../queryKeys';

interface Params {
  userId?: string;
}

export function useGetUser({ userId }: Params = {}) {
  const queryKey = queryKeys.getUser(userId);

  return useQuery<User, TkError>({
    queryKey,
    queryFn: () => getUser(userId),
    retry: false,
  });
}
