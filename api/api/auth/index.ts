import type { Credentials } from './types';

import { post } from '@http';

import { urls } from '../urls';

export function signIn(credentials: Credentials) {
  return post({ url: urls.signIn, body: credentials });
}
