'use client';

import type { ReactNode } from 'react';

import { Card as HeroCard, CardHeader, CardBody } from '@heroui/react';

import { Header1 } from '../typography';

interface Props {
  header: string;
  children: ReactNode;
}

export function Card({ header, children }: Props) {
  return (
    <HeroCard className={`w-fit p-4`}>
      <CardHeader>
        <Header1>{header}</Header1>
      </CardHeader>

      <CardBody>{children}</CardBody>
    </HeroCard>
  );
}
