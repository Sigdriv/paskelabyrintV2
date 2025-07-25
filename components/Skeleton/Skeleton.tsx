/* eslint-disable react/no-children-prop */
'use client';

import { Skeleton as HeroSkeleton } from '@heroui/react';

import { TextInput } from '../TextInput/TextInput';
import { Select } from '../Select/Select';
import { Card } from '../Card/Card';

type SelectElement = 'textInput' | 'select';

type BaseProps = {
  isLoading: boolean;
};

type ChildrenProps = {
  children: React.ReactNode;
  elements?: never;
  count?: never;
};

type ElementProps = {
  children?: never;
  elements: SelectElement[];
  count?: never;
};
type TeamsProp = {
  children?: never;
  elements: 'teams'[];
  count: number;
};

type Props = BaseProps & (ChildrenProps | TeamsProp | ElementProps);

export function Skeleton({ children, isLoading, count, elements }: Props) {
  if (!isLoading) return children;

  if (children) {
    return (
      <HeroSkeleton className="rounded-medium w-full" isLoaded={!isLoading}>
        {children}
      </HeroSkeleton>
    );
  }

  if (elements) {
    return elements.map((element, index) => {
      if (element === 'teams' && count) {
        return (
          <div
            key={`${element}-${index}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {Array.from({ length: count }).map((_, i) => (
              <HeroSkeleton
                key={`${element}-${index}-${i}`}
                className="rounded-medium w-fit mb-4"
                isLoaded={!isLoading}
              >
                <div className="w-96 min-h-40">
                  <Card children={null} header="" width="max-w-md" />
                </div>
              </HeroSkeleton>
            ))}
          </div>
        );
      }

      return (
        <HeroSkeleton
          key={`${element}-${index}`}
          className="rounded-medium w-fit mb-4"
          isLoaded={!isLoading}
        >
          {element === 'textInput' && (
            <TextInput label="Label" type="text" value="" onChange={() => {}} />
          )}

          {element === 'select' && (
            <Select
              label="Label"
              options={[]}
              value={undefined}
              onChange={() => {}}
            />
          )}
        </HeroSkeleton>
      );
    });
  }
}
