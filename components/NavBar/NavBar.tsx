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

import { ThemeSwitch } from '../theme-switch';
import { Menu } from '../Menu/Menu';
import { InternalLink } from '../Link/InternalLink';

import { DevMenu } from './utils';

export const NavBar = () => {
  const { user } = useUser();
  const { mutate } = useSignOut();

  const navItems = user ? siteConfig.signinItems : siteConfig.navItems;

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <Avatar radius="md" src="/korSkaOssReis.png" />

            <p className="font-bold text-inherit">Kor ska oss reis</p>
          </NextLink>
        </NavbarBrand>

        {/* <ul className="hidden sm:flex gap-4 justify-start ml-2"> */}
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
            {
              section: 'Test',
              items: [
                { label: 'My Profile', href: '/' },
                { label: 'My Settings', href: '/settings' },
                { label: 'Team Settings', href: '/team-settings' },
                { label: 'Analytics', href: '/analytics' },
                { label: 'System', href: '/system' },
                { label: 'Configurations', href: '/configurations' },
                { label: 'Help & Feedback', href: '/help-and-feedback' },
              ],
            },
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
