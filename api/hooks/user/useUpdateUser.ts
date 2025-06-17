import type { User } from '@api';
import type { TkError } from '@http';

import { updateUser } from '@api';
import { useMutation } from '@tanstack/react-query';

export function useUpdateUser() {
  return useMutation<{ message: string }, TkError, User>({
    mutationFn: updateUser,
  });
}
