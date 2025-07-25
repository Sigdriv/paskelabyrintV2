import type {
  CreatePasskey,
  CreateUser,
  Credentials,
  FinishPasskeyLogin,
  ForgottPassword,
  PasskeyLoginOptions,
  ResetPassword,
  SigninPasskey,
  StartRegistrationPasskeyRes,
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

export async function fetchLoginOptions(
  body: SigninPasskey
): Promise<PasskeyLoginOptions> {
  const { publicKey } = await post<{ publicKey: PasskeyLoginOptions }>({
    url: urls.getLoginOptions,
    body,
  });

  return publicKey;
}

export function verifyPasskeyLogin(
  assertionResponse: FinishPasskeyLogin
): Promise<void> {
  return post({ url: urls.verifyPasskeyLogin, body: assertionResponse });
}

export async function startPasskeyRegistration(
  body: CreatePasskey
): Promise<StartRegistrationPasskeyRes> {
  return await post<StartRegistrationPasskeyRes>({
    url: urls.startPasskeyRegistration,
    body,
  });
}

export function finishPasskeyRegistration(
  body: any
): Promise<{ message: string }> {
  return post({ url: urls.finishPasskeyRegistration, body });
}
