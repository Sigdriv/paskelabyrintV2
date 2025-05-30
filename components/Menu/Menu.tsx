'use client';

import type { ReactNode } from 'react';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react';

interface Props {
  children: ReactNode;
  menus: {
    label: string;
    color?: 'default' | 'danger';
    href: string;
    icon?: ReactNode;
  }[];
}

export function Menu({ children, menus }: Props) {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>{children}</DropdownTrigger>

      <DropdownMenu aria-label="Profile Actions" variant="flat">
        {menus.map(({ color, label, href, icon }) => (
          <DropdownItem
            key={JSON.stringify({ color, label, href })}
            color={color || 'default'}
            href={href}
            startContent={icon}
          >
            {label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
