import type { CreateUser, Credentials } from './types';

import { post } from '@http';

import { urls } from '../urls';

export function signInWithCredentials(credentials: Credentials): Promise<void> {
  return post({ url: urls.signIn, body: credentials });
}

export function createUser(user: CreateUser): Promise<void> {
  return post({ url: urls.signUp, body: user });
}
