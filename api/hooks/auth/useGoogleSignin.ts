import type { TkError } from '@http';

import { signInGoogle } from '@api';
import { useMutation } from '@tanstack/react-query';

export function useGoogleSignin() {
  return useMutation<void, TkError>({
    mutationFn: signInGoogle,
  });
}
