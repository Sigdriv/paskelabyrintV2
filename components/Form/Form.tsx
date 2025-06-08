'use client';

import type { ReactNode } from 'react';

import { Form as HeroForm } from '@heroui/react';

interface Props {
  children: ReactNode | ReactNode[];
  action: 'submit';
  onAction: () => void;
}

export function Form({ children, action, onAction }: Props) {
  return (
    <HeroForm
      action={action}
      className="flex flex-col gap-8 w-full"
      validationBehavior="aria"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onAction();
      }}
    >
      {children}
    </HeroForm>
  );
}
