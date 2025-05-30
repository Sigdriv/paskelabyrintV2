import type { Role } from '@api';

export function getRoleFromToken(token?: string): Role | undefined {
  try {
    if (token === undefined) throw new Error('Token is undefined');

    const decodedToken = atob(token);
    const parts = decodedToken.split('|');

    if (parts.length !== 3) throw new Error('Invalid token format');

    const role = parts[2];

    if (!role) throw new Error('Failed to parse role');

    return role as Role;
  } catch {
    return;
  }
}
