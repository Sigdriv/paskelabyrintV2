import type { TkError } from '@http';
import type { CreatePasskey, StartRegistrationPasskeyRes } from '@api';

import { startPasskeyRegistration } from '@api';
import { useMutation } from '@tanstack/react-query';

export function useRegisterPasskey() {
  return useMutation<StartRegistrationPasskeyRes, TkError, CreatePasskey>({
    mutationFn: startPasskeyRegistration,
  });
}
