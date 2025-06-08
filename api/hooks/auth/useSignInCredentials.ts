import type { Credentials } from '@api';
import type { HooksParams } from '../utils';

import { TkError } from '@http';
import { signInWithCredentials } from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/react';
import { errorTitleMapper } from '@app';

import { queryKeys } from '../queryKeys';

export function useSignInCredentials({
  onSuccess,
}: HooksParams<void, Credentials>) {
  const queryClient = useQueryClient();

  const queryKey = queryKeys.getUser;

  return useMutation<void, TkError, Credentials>({
    mutationFn: signInWithCredentials,
    onSuccess: (data, variables) => {
      onSuccess(data, variables);

      queryClient.invalidateQueries({ queryKey });
    },

    onError: (err) => {
      if (err instanceof TkError) {
        addToast({
          title:
            err.statusCode === 400
              ? errorTitleMapper[err.statusCode]
              : 'Ugyldig pålogging',
          description:
            'Påloggingen mislyktes. Vennligst sjekk e-post og passord, og prøv igjen.',
          color: 'danger',
          timeout: 10000,
        });
      }
    },
  });
}
