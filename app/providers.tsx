'use client';

import type { ThemeProviderProps } from 'next-themes';

import * as React from 'react';
import { HeroUIProvider } from '@heroui/system';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { addToast, ToastProvider } from '@heroui/react';
import { errorDescriptionMapper, errorTitleMapper, TkError } from '@http';

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
    });
  } else {
    addToast({
      title: 'Ukjent feil',
      description: 'Vennligst prøv igjen senere.',
      color: 'danger',
    });
  }
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err) => {
      if (err instanceof TkError) {
        if (err.statusCode === 401) return;
      }

      onError(err);
    },
  }),
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
            <ToastProvider
              toastProps={{
                timeout: 10000,
              }}
            />

            {children}
          </UserProvider>
        </NextThemesProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  );
}
