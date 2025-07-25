export type SiteConfig = typeof siteConfig;

const items = [
  {
    label: 'Hjem',
    href: '/',
  },
  {
    label: 'Bli med',
    href: '/bli-med',
  },
  {
    label: 'Kontakt oss',
    href: '/kontakt-oss',
  },
];

export const siteConfig = {
  name: 'Kor ska oss reis',
  // description: 'Make beautiful websites regardless of your design experience.',
  navItems: [
    ...items,
    {
      label: 'Logg inn',
      href: '/auth/signin',
    },
  ],
  signinItems: [...items],
  navMenuItems: [...items],
  links: {
    github: 'https://github.com/heroui-inc/heroui',
    twitter: 'https://twitter.com/hero_ui',
    docs: 'https://heroui.com',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
  },
};
