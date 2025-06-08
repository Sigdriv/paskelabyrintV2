import type { TkError } from '@http';
import type { ValidateToken } from '@api';

import { validateToken } from '@api';
import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKeys';

interface Params {
  token: string;
}

export function useValidateToken({ token }: Params) {
  const queryKey = queryKeys.validateToken(token);

  return useQuery<ValidateToken, TkError>({
    queryKey,
    queryFn: () => validateToken(token),
    enabled: !!token,
    // retry: false,
  });
}
