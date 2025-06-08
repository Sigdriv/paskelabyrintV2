import type { TkError } from '@http';
import type { HooksParams } from '../utils';

import {
  resetPassword,
  type HttpResponse,
  type ResetPasswordParams,
} from '@api';
import { useMutation } from '@tanstack/react-query';

export function useResetPassword({ onSuccess }: HooksParams) {
  return useMutation<HttpResponse, TkError, ResetPasswordParams>({
    mutationFn: resetPassword,
    onSuccess,
  });
}
