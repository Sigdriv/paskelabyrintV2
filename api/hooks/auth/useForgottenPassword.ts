import type { ForgottPassword, HttpResponse } from '@api';
import type { TkError } from '@http';
import type { HooksParams } from '../utils';

import { forgottPassword } from '@api';
import { useMutation } from '@tanstack/react-query';

export function useForgottenPassword({
  onSuccess,
}: HooksParams<HttpResponse, ForgottPassword>) {
  return useMutation<HttpResponse, TkError, ForgottPassword>({
    mutationFn: forgottPassword,
    onSuccess,
  });
}
