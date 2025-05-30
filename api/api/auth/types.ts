import type { User } from '../user/types';

export type Credentials = {
  email: string;
  password: string;
  remember: boolean;
};

export type CreateUser = Omit<User, 'id' | 'role' | 'createdAt' | 'avatar'> & {
  confirmPassword: string;
};
