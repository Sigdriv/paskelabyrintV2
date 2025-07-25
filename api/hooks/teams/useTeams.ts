import type { GetTeamsParams, Team } from '@api';
import type { TkError } from '@http';

import { getTeams } from '@api';
import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKeys';

export function useTeams({
  isContactPersonTeams = false,
}: GetTeamsParams = {}) {
  const queryKey = queryKeys.getTeams(isContactPersonTeams);

  return useQuery<Team[], TkError>({
    queryFn: () => getTeams({ isContactPersonTeams }),
    queryKey,
  });
}
