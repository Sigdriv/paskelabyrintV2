'use client';

import type { TkError } from '@http';

import { errorDescriptionMapper, errorTitleMapper } from '@http';
import {
  Table as HeroTable,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';

import { InfoBox } from '../InfoBox/InfoBox';
import { Spinner } from '../Spinner/Spinner';

interface Props {
  header: { label: string }[];
  items: JSX.Element[][];
  emptyText?: string;
  isLoading: boolean;
  error: TkError | null;
}

export function Table({ header, items, emptyText, isLoading, error }: Props) {
  return (
    <div>
      <InfoBox
        body={errorDescriptionMapper[error?.statusCode || 'unknown']}
        header={errorTitleMapper[error?.statusCode || 'unknown']}
        isVisible={!!error}
        variant="danger"
      />

      <HeroTable isStriped>
        <TableHeader columns={header}>
          {header.map(({ label }, index) => (
            <TableColumn key={JSON.stringify({ label, index })}>
              {label}
            </TableColumn>
          ))}
        </TableHeader>

        <TableBody
          emptyContent={<div>{emptyText || 'Ingen data funnet'}</div>}
          isLoading={isLoading}
          items={items}
          loadingContent={<Spinner label="Laster inn..." />}
          loadingState={isLoading ? 'loading' : 'idle'}
        >
          {items.map((item) => (
            <TableRow key={JSON.stringify(item.map((cell) => cell.key))}>
              {item.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </HeroTable>
    </div>
  );
}
