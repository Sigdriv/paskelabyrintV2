import type { TkError } from '@http';
import type { HooksParams } from '../../utils';
import type { FinishPasskeyLogin } from '@api';

import { verifyPasskeyLogin } from '@api';
import { useMutation } from '@tanstack/react-query';

export function useVerifyPasskeyLogin({ onSuccess }: HooksParams<void, any>) {
  return useMutation<void, TkError, FinishPasskeyLogin>({
    mutationFn: verifyPasskeyLogin,
    onSuccess,
  });
}
