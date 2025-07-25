import type { CreateUser } from '@api';

export const initialUser: CreateUser = {
  email: '',
  name: '',
  password: '',
  phoneNr: '',
  confirmPassword: '',
  isGoogle: false,
};
