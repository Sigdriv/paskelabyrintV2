import type { User } from '../user/types';

import { get } from '@http';

import { urls } from '../urls';

export function getUsers(): Promise<User[]> {
  return get({ url: urls.getUsers });
}
