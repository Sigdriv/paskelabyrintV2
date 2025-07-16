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
  width?: 'full' | 'max-w-md' | 'max-w-lg' | 'max-w-xl' | 'max-w-2xl';
};

type Props = BaseProps &
  (
    | {
        header: string;
        headerAlign?: 'left' | 'center' | 'right';
        readyState?: never;
      }
    | {
        header?: never;
        headerAlign?: never;
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
  headerAlign = 'left',
  children,
  readyState,
  align = 'left',
  fullHeight = false,
  width = 'full',
}: Props) {
  return (
    <div
      className={`${alignmentClasses[align]} ${readyState ? 'h-[40rem]' : ''} ${width === 'full' ? 'w-full' : width}`}
    >
      <HeroCard
        className={`w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-4 ${fullHeight ? 'h-full' : ''}`}
      >
        <CardHeader className={`w-full ${alignmentClasses[headerAlign]}`}>
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

          {header && <Header1 isCardHeader>{header}</Header1>}
        </CardHeader>

        <CardBody>{children}</CardBody>
      </HeroCard>
    </div>
  );
}
