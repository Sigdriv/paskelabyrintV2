import type {
  CreateUser,
  Credentials,
  ForgottPassword,
  ResetPassword,
  ValidateToken,
} from './types';
import type { HttpResponse } from '../utils';

import { get, post } from '@http';

import { urls } from '../urls';

export function signInWithCredentials(credentials: Credentials): Promise<void> {
  return post({ url: urls.signIn, body: credentials });
}

export function createUser(user: CreateUser): Promise<void> {
  return post({ url: urls.signUp, body: user });
}

export function signInGoogle(): Promise<void> {
  return new Promise(() => (window.location.href = urls.googleSignin));
}

export function signOut() {
  return new Promise(() => (window.location.href = urls.signOut));
}

export function forgottPassword(email: ForgottPassword): Promise<HttpResponse> {
  return post({ url: urls.forgottPassword, body: email });
}

export function validateToken(token: string): Promise<ValidateToken> {
  return get({ url: urls.validateToken(token) });
}
export interface ResetPasswordParams {
  token: string;
  body: ResetPassword;
}

export function resetPassword({
  token,
  body,
}: ResetPasswordParams): Promise<HttpResponse> {
  return post({ url: urls.resetPassword(token), body });
}
