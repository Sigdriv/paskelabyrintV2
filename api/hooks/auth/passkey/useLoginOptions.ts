import type { TkError } from '@http';
import type { PasskeyLoginOptions, SigninPasskey } from '@api';

import { fetchLoginOptions } from '@api';
import { useMutation } from '@tanstack/react-query';

export function useLoginOptions() {
  return useMutation<PasskeyLoginOptions, TkError, SigninPasskey>({
    mutationFn: fetchLoginOptions,
    onError: () => {},
  });
}
