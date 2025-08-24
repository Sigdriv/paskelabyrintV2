import type { TkError } from '@http';
import type { HooksParams } from '../utils';
import type { HttpResponse, Team } from '@api';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTeam } from '@api';

import { queryKeys } from '../queryKeys';

export function useDeleteTeam({ onSuccess }: HooksParams) {
  const queryClient = useQueryClient();

  const queryKey = queryKeys.getTeams(false);

  return useMutation<HttpResponse, TkError, { id: string }>({
    mutationFn: ({ id }) => deleteTeam(id),
    onSuccess: (data, variables) => {
      const teams: Team[] = queryClient.getQueryData(queryKey) || [];

      if (teams) {
        const updatedTeams = teams.filter((team) => team.id !== variables.id);

        queryClient.setQueryData(queryKey, updatedTeams);
      }

      onSuccess(data, variables);
    },
  });
}
