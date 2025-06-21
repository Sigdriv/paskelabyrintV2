import type { TkError } from '@http';
import type { HooksParams } from '../utils';
import type { HttpResponse, NewTeam } from '@api';

import { useMutation } from '@tanstack/react-query';
import { postTeam } from '@api';

export function usePostTeam({ onSuccess }: HooksParams<HttpResponse, NewTeam>) {
  return useMutation<HttpResponse, TkError, NewTeam>({
    mutationFn: postTeam,
    onSuccess,
  });
}
