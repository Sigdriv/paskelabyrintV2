'use client';

import { Form as HeroForm } from '@heroui/react';

interface Props {
  children: JSX.Element[];
  action: 'submit';
  onAction: () => void;
}

export function Form({ children, action, onAction }: Props) {
  return (
    <HeroForm
      action={action}
      className="flex flex-col gap-8 w-96"
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
