'use client';

import type { ReactNode } from 'react';

import { Button as HeroButton } from '@heroui/react';
import { useRouter } from 'next/navigation';

type BaseProps = {
  children: ReactNode;
  variant?: 'solid' | 'light' | 'bordered';
  isLoading?: boolean;
  color?: 'default' | 'danger';
  isIconOnly?: boolean;
  isDisabled?: boolean;
};

type Props = BaseProps &
  (
    | {
        type: 'submit' | 'reset';
        onClick?: () => void;
        href?: never;
      }
    | {
        onClick: () => void;
        type?: never;
        href?: never;
      }
    | {
        href: string;
        type?: never;
        onClick?: never;
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
  href,
  isDisabled = false,
}: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <div className="my-2 w-full">
      <HeroButton
        fullWidth
        color={color}
        isDisabled={isDisabled}
        isIconOnly={isIconOnly}
        isLoading={isLoading}
        type={type}
        variant={variant}
        onPress={onClick || (href ? handleClick : undefined)}
      >
        {children}
      </HeroButton>
    </div>
  );
}
