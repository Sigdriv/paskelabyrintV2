'use client';

import type { ReactNode } from 'react';

import { Code as HeroCode } from '@heroui/react';

interface Props {
  children: ReactNode;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger';
}

export function Code({ children, color = 'default' }: Props) {
  return <HeroCode color={color}>{children}</HeroCode>;
}
