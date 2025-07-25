import type { MenuSection } from '../Menu/Menu';

export const DevMenu: MenuSection[] = [
  {
    section: 'Dev',
    items: [
      { label: 'Dev', href: '/dev' },
      { label: 'Alle brukere', href: '/dev/all-users' },
    ],
  },
];

export const AdminMenu: MenuSection[] = [
  {
    section: 'Admin',
    items: [
      { label: 'Admin', href: '/admin' },
      { label: 'Alle lag', href: '/admin/alle-lag' },
    ],
  },
];

export const UserMenu: MenuSection[] = [
  {
    section: 'Bruker',
    items: [
      { label: 'Min side', href: '/minside' },
      { label: 'Mine lag', href: '/minside/lag' },
    ],
  },
];
