'use client';

import type { ReactNode } from 'react';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@heroui/react';
import { useRouter } from 'next/navigation';

interface CommonMenu {
  label: string;

  color?: 'default' | 'danger';
  icon?: ReactNode;
}

type ClickableMenu = CommonMenu & {
  onClick: () => void;
  href?: never;
};

type LinkMenu = CommonMenu & {
  href: string;
  onClick?: never;
};

export type Menu = ClickableMenu | LinkMenu;

export type MenuSection = {
  section: string;
  items: Menu[];
};

interface Props {
  children: ReactNode;
  menus: MenuSection[];
}

export function Menu({ children, menus }: Props) {
  const navigate = useRouter().push;

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>{children}</DropdownTrigger>

      <DropdownMenu aria-label="Profile Actions" variant="flat">
        {menus.map(({ section, items }) => (
          <DropdownSection key={section} items={items} title={section}>
            {items.map(({ color, label, href, icon, onClick }) => (
              <DropdownItem
                key={JSON.stringify({ color, label, href })}
                color={color || 'default'}
                href={href}
                startContent={icon}
                onClick={() => (onClick ? onClick() : navigate(href))}
              >
                {label}
              </DropdownItem>
            ))}
          </DropdownSection>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
