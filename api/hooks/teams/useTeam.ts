import type { GetTeamParams } from '@api';

import { useQuery } from '@tanstack/react-query';
import { getTeam } from '@api';

import { queryKeys } from '../queryKeys';

export function useTeam({ teamId }: GetTeamParams) {
  const queryKey = queryKeys.getTeam(teamId);

  return useQuery({
    queryKey,
    queryFn: () => getTeam({ teamId }),
    enabled: !!teamId,
  });
}
