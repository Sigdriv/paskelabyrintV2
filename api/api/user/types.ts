import type { roles } from '.';

export type Role = (typeof roles)[number];

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  password: string;
  phoneNr: string;
  createdAt: string;
  avatar: string;
  isGoogle: boolean;
};
