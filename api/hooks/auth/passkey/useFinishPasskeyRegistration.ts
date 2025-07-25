import type { TkError } from '@http';
import type { HooksParams } from '../../utils';

import { finishPasskeyRegistration } from '@api';
import { useMutation } from '@tanstack/react-query';

export function useFinishPasskeyRegistration({ onSuccess }: HooksParams) {
  return useMutation<{ message: string }, TkError, any>({
    mutationFn: finishPasskeyRegistration,
    onSuccess,
  });
}
