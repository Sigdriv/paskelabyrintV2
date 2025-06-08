'use client';

import { Skeleton as HeroSkeleton } from '@heroui/react';

interface Props {
  children: JSX.Element;
  isLoading: boolean;
}

export function Skeleton({ children, isLoading }: Props) {
  return (
    <HeroSkeleton className=" rounded-lg w-full" isLoaded={!isLoading}>
      {children}
    </HeroSkeleton>
  );
}
