'use client';

import type { ReactNode } from 'react';

import {
  Card as HeroCard,
  CardHeader,
  CardBody,
  Progress,
} from '@heroui/react';
import { mapReadyState, mapReadyText } from '@websocket';

import { Header1 } from '../typography';

type BaseProps = {
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
  fullHeight?: boolean;
};

type Props = BaseProps &
  (
    | {
        header: string;
        readyState?: never;
      }
    | {
        header?: never;
        readyState: WebSocket['readyState'];
      }
  );

const alignmentClasses = {
  left: 'flex justify-start',
  center: 'flex justify-center',
  right: 'flex justify-end',
};

export function Card({
  header,
  children,
  readyState,
  align = 'left',
  fullHeight = false,
}: Props) {
  return (
    <div
      className={`w-full ${alignmentClasses[align]} ${readyState ? 'h-[40rem]' : ''}`}
    >
      <HeroCard
        className={`w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-4 ${fullHeight ? 'h-full' : ''}`}
      >
        <CardHeader className="w-full">
          {!!readyState && (
            <div className="w-full flex flex-col gap-1">
              <div className="w-full flex justify-between">
                <p>Tilkoblingsstatus</p>

                <p>{mapReadyText[readyState]}</p>
              </div>

              <Progress
                aria-label={`Tilkoblingsstatus: ${mapReadyText[readyState]}`}
                color={mapReadyState[readyState]}
                value={100}
              />
            </div>
          )}

          {header && <Header1>{header}</Header1>}
        </CardHeader>

        <CardBody>{children}</CardBody>
      </HeroCard>
    </div>
  );
}
