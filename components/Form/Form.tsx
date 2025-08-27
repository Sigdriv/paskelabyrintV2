'use client';

import type { ReactNode } from 'react';

import { Form as HeroForm } from '@heroui/react';

interface Props {
  children: ReactNode | ReactNode[];
  action: 'submit';
  onAction: () => void;
  isDialog?: boolean;
}

export function Form({ children, action, onAction, isDialog }: Props) {
  return (
    <HeroForm
      action={action}
      className={`flex flex-col ${isDialog ? 'gap-0' : 'gap-8'} w-full`}
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
