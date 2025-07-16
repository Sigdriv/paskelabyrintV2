import type { CreateUser } from '@api';
import { errorTitleMapper, TkError } from '@http';
import type { HooksParams } from '../utils';

import { createUser } from '@api';
import { useMutation } from '@tanstack/react-query';
import { addToast } from '@heroui/react';

export function useCreateUser({ onSuccess }: HooksParams) {
  return useMutation<void, TkError, CreateUser>({
    mutationFn: createUser,
    onSuccess,
    onError: (error) => {
      if (error instanceof TkError) {
        if (error.statusCode === 409) {
          addToast({
            title: errorTitleMapper[error.statusCode],
            description:
              'Denne e-postadressen er allerede i bruk. Hvis det er din, logg inn eller tilbakestill passordet ditt',
            color: 'warning',
          });
        }
      }
    },
  });
}
