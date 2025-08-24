import type { TkError } from '@http';
import type { HooksParams } from '../utils';
import type { NewTeam, Team, TeamsResponse } from '@api';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTeam } from '@api';

import { queryKeys } from '../queryKeys';

interface Params extends HooksParams<TeamsResponse, NewTeam> {
  userEmail: string;
}

export function usePostTeam({ onSuccess, userEmail }: Params) {
  const queryClient = useQueryClient();

  return useMutation<TeamsResponse, TkError, NewTeam>({
    mutationFn: postTeam,
    onSuccess: ({ id, createdAt }, variables) => {
      onSuccess({ id, createdAt }, variables);

      const queryKey = queryKeys.getTeams(variables.contactEmail !== userEmail);

      const exisitngTeams = queryClient.getQueryData<Team[]>(queryKey);

      if (exisitngTeams) {
        queryClient.setQueryData<Team[]>(queryKey, [
          ...exisitngTeams,
          { ...variables, id, createdAt },
        ]);
      } else {
        queryClient.setQueryData<Team[]>(queryKey, [
          { ...variables, id, createdAt },
        ]);
      }
    },
  });
}
