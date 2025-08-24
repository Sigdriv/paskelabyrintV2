import type { TkError } from '@http';
import type { HooksParams } from '../utils';
import type { Team } from '@api';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTeam } from '@api';

import { queryKeys } from '../queryKeys';

interface Params extends HooksParams<{ message: string }, Team> {
  userEmail: string;
}

export function useUpdateTeam({ onSuccess, userEmail }: Params) {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, TkError, Team>({
    mutationFn: updateTeam,
    onSuccess: (data, variables) => {
      onSuccess(data, variables);

      queryClient.setQueryData<Team>(queryKeys.getTeam(variables.id), {
        ...variables,
      });

      const queryKey = queryKeys.getTeams(variables.contactEmail !== userEmail);

      const existingTeams = queryClient.getQueryData<Team[]>(queryKey);

      if (!!existingTeams) {
        queryClient.setQueryData<Team[]>(queryKey, [
          ...existingTeams.filter((team) => team.id !== variables.id),
          { ...variables },
        ]);
      }
    },
  });
}
