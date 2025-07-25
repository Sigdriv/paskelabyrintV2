import '@styles';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import clsx from 'clsx';
import { Footer, NavBar } from '@components';
import { fontSans, siteConfig } from '@config';

import { Providers } from './providers';
// import { useDynamicTitle } from './useDynamicTitle';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  // description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  // TODO: This
  // const dynamicTitle = useDynamicTitle();

  return (
    <html suppressHydrationWarning lang="en">
      <head />

      {/* <head>
        <title>{`Kor ska oss reis | ${dynamicTitle ? dynamicTitle : 'Hjem'}`}</title>
      </head> */}
      <body
        className={clsx(
          'min-h-screen text-foreground bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers
          themeProps={{
            attribute: 'class',
            enableSystem: true,
          }}
        >
          <div className="relative flex flex-col h-screen">
            <NavBar />

            <main className="container mx-auto max-w-7xl pt-16 px-6 grow">
              {children}
            </main>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
