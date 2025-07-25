import type { User } from '../user/types';
import type { AuthenticationResponseJSON } from '@simplewebauthn/browser';

export type Credentials = {
  email: string;
  password: string;
  remember: boolean;
};

export type CreateUser = Omit<
  User,
  'id' | 'role' | 'createdAt' | 'avatar' | 'isGoogle'
> & {
  confirmPassword: string;
};

export type ForgottPassword = Omit<Credentials, 'password' | 'remember'>;

export type ValidateToken = {
  valid: boolean;
};

export type ResetPassword = {
  password: string;
  confirmPassword: string;
};

type Rp = {
  name: string;
  id: string;
};

type PasskeyUser = {
  name: string;
  displayName: string;
  id: string;
};

type PubKeyCredParams = {
  type: 'public-key';
  alg: number;
};

type AuthenticatorSelection = {
  userVerification: 'preferred' | 'required' | 'discouraged';
};

type Passkey = {
  challenge: string;
  rp: Rp;
  user: PasskeyUser;
  pubKeyCredParams: PubKeyCredParams[];
  authenticatorSelection: AuthenticatorSelection;
  timeout: number;
};

export type StartRegistrationPasskeyRes = {
  publicKey: Passkey;
};

export type CreatePasskey = Omit<
  CreateUser,
  'password' | 'confirmPassword' | 'isGoogle'
>;

export type PasskeyLoginOptions = {
  challenge: string;
  rpId: string;
  allowCredentials: {
    id: string;
    type: 'public-key';
  }[];
  userVerification: 'preferred' | 'required' | 'discouraged';
  timeout: number;
};

export type SigninPasskey = {
  email: string;
};

export type FinishPasskeyLogin = {
  email: string;
  credentials: AuthenticationResponseJSON;
};
