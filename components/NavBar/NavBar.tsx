'use client';

import { Logout } from '@mui/icons-material';
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarMenuItem,
} from '@heroui/navbar';
import NextLink from 'next/link';
import { Avatar, Link } from '@heroui/react';
import { siteConfig } from '@config';
import { useUser } from '@app';
import { useSignOut } from '@hooks';
import { useState } from 'react';

import { ThemeSwitch } from '../theme-switch';
import { InternalLink } from '../Link/InternalLink';
import { Menu } from '../Menu/Menu';

import { AdminMenu, DevMenu, UserMenu } from './utils';

export const NavBar = () => {
  const { user } = useUser();
  const { mutate } = useSignOut();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = user ? siteConfig.signinItems : siteConfig.navItems;

  return (
    <HeroUINavbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <Avatar radius="md" src="/korSkaOssReis.png" />

            <p className="font-bold text-inherit">Kor ska oss reis</p>
          </NextLink>
        </NavbarBrand>

        <ul className="hidden sm:flex flex-nowrap gap-4 justify-start ml-2 whitespace-nowrap">
          {navItems.map((item) => (
            <InternalLink
              key={JSON.stringify(item)}
              href={item.href}
              label={item.label}
            />
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="gap-2" justify="end">
        <ThemeSwitch />

        <NavbarMenuToggle
          aria-haspopup="menu"
          aria-label="Åpne navigasjons meny"
          className="sm:hidden"
        />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {navItems.map((item, index) => (
            <NavbarMenuItem key={JSON.stringify(item)}>
              <Link
                color={index === 1 ? 'primary' : 'foreground'}
                href={item.href}
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>

      {user && (
        <Menu
          menus={[
            // TODO: Add the rest of the menus
            ...(user.role === 'DEV' ? DevMenu : []),
            ...(user.role === 'ADMIN' || user.role === 'DEV' ? AdminMenu : []),
            ...(user.role === 'USER' ||
            user.role === 'ADMIN' ||
            user.role === 'DEV'
              ? UserMenu
              : []),
            {
              section: '',
              items: [
                {
                  label: 'Log Out',
                  onClick: mutate,
                  color: 'danger',
                  icon: <Logout />,
                },
              ],
            },
          ]}
        >
          <Avatar
            showFallback
            aria-haspopup="menu"
            aria-label="Åpne bruker navigasjons meny"
            as="button"
            className="transition-transform"
            name={user.name}
            radius="md"
            src={user.avatar}
          />
        </Menu>
      )}
    </HeroUINavbar>
  );
};
