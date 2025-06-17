import type { User } from './types';

import { get, patch } from '@http';

import { urls } from '../urls';

export const roles = ['USER', 'ADMIN', 'DEV'] as const;

export function getUser(userId?: string): Promise<User> {
  return get({ url: urls.getUser(userId) });
}

export function updateUser(user: User): Promise<{ message: string }> {
  return patch({
    url: urls.updateUser,
    body: user,
  });
}
