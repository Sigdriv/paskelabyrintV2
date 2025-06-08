import { signOut } from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '../queryKeys';

export function useSignOut() {
  const queryClient = useQueryClient();

  const queryKey = queryKeys.getUser;

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
