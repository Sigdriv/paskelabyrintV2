export type Role = 'USER' | 'ADMIN' | 'DEV';

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  password: string;
  phoneNr: string;
  createdAt: string;
  avatar: string;
};
