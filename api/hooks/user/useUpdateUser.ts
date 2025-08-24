import type { User } from '@api';
import type { TkError } from '@http';
import type { HooksParams } from '../utils';

import { updateUser } from '@api';
import { useMutation } from '@tanstack/react-query';

export function useUpdateUser({ onSuccess }: HooksParams) {
  return useMutation<{ message: string }, TkError, User>({
    mutationFn: updateUser,
    onSuccess,
  });
}
