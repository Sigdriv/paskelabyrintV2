import type { User } from './types';

import { get } from '@http';

import { urls } from '../urls';

export function getUser(): Promise<User> {
  return get({ url: urls.getUser });
}
