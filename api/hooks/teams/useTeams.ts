import type { Team } from '@api';
import type { TkError } from '@http';

import { getTeams } from '@api';
import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKeys';

export function useTeams() {
  const queryKey = queryKeys.getTeams;

  return useQuery<Team[], TkError>({
    queryFn: getTeams,
    queryKey,
  });
}
