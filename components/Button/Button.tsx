'use client';

import { Button as HeroButton } from '@heroui/react';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'solid' | 'light' | 'bordered';
  isLoading?: boolean;
  color?: 'default' | 'danger';
  isIconOnly?: boolean;
}

export function Button({
  onClick,
  children,
  variant = 'bordered',
  isLoading,
  color = 'default',
  isIconOnly = false,
}: Props) {
  return (
    <HeroButton
      className="m-2"
      color={color}
      isIconOnly={isIconOnly}
      isLoading={isLoading}
      variant={variant}
      onPress={onClick}
    >
      {children}
    </HeroButton>
  );
}
