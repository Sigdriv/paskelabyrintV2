'use client';

import type { ThemeProviderProps } from 'next-themes';

import * as React from 'react';
import { HeroUIProvider } from '@heroui/system';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { addToast, ToastProvider } from '@heroui/react';
import { TkError } from '@http';

import { errorDescriptionMapper, errorTitleMapper } from './utils';
import { UserProvider } from './UserContext';

export interface Props {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

function onError(error: TkError | Error) {
  if (error instanceof TkError) {
    addToast({
      title: errorTitleMapper[error.statusCode],
      description: errorDescriptionMapper[error.statusCode],
      color: 'danger',
      timeout: 10000,
    });
  } else {
    addToast({
      title: 'Ukjent feil',
      description: 'Vennligst prøv igjen senere.',
      color: 'danger',
      timeout: 10000,
    });
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError,
    },
  },
});

export function Providers({ children, themeProps }: Props) {
  const router = useRouter().push;

  return (
    <HeroUIProvider navigate={router}>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider {...themeProps}>
          <UserProvider>
            <ToastProvider />

            {children}
          </UserProvider>
        </NextThemesProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  );
}
