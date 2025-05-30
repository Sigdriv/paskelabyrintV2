import type { CreateUser } from '@api';
import type { TkError } from '@http';
import type { HooksParams } from '../utils';

import { createUser } from '@api';
import { useMutation } from '@tanstack/react-query';

export function useCreateUser({ onSuccess }: HooksParams) {
  return useMutation<void, TkError, CreateUser>({
    mutationFn: createUser,
    onSuccess,
  });
}
