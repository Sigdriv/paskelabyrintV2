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
