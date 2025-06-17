import type { TkError } from '@http';
import type { User } from '@api';

import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@api';

import { queryKeys } from '../queryKeys';

export function useUsers() {
  const queryKey = queryKeys.getUsers;

  return useQuery<User[], TkError>({
    queryFn: getUsers,
    queryKey,
  });
}
