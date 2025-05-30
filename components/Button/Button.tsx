'use client';

import type { ReactNode } from 'react';

import { Button as HeroButton } from '@heroui/react';

type BaseProps = {
  children: ReactNode;
  variant?: 'solid' | 'light' | 'bordered';
  isLoading?: boolean;
  color?: 'default' | 'danger';
  isIconOnly?: boolean;
};

type Props = BaseProps &
  (
    | {
        type: 'submit' | 'reset';
        onClick?: never;
      }
    | {
        type?: never;
        onClick: () => void;
      }
  );

export function Button({
  onClick,
  children,
  variant = 'bordered',
  isLoading,
  color = 'default',
  isIconOnly = false,
  type,
}: Props) {
  return (
    <HeroButton
      fullWidth
      className="m-2"
      color={color}
      isIconOnly={isIconOnly}
      isLoading={isLoading}
      type={type}
      variant={variant}
      onPress={onClick}
    >
      {children}
    </HeroButton>
  );
}
