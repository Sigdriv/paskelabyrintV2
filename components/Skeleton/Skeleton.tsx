'use client';

import { Skeleton as HeroSkeleton } from '@heroui/react';

import { TextInput } from '../TextInput/TextInput';
import { Select } from '../Select/Select';

type SelectElement = 'textInput' | 'select';

type BaseProps = {
  isLoading: boolean;
};

type ChildrenProps = {
  children: React.ReactNode;
  elements?: never;
};

type ElementProps = {
  children?: never;
  elements: SelectElement[];
};

type Props = BaseProps & (ChildrenProps | ElementProps);

export function Skeleton({ children, isLoading, elements }: Props) {
  if (!isLoading) return null;

  if (children) {
    return (
      <HeroSkeleton className=" rounded-lg w-full" isLoaded={!isLoading}>
        {children}
      </HeroSkeleton>
    );
  }

  if (elements) {
    return elements.map((element, index) => (
      <HeroSkeleton
        key={`${element}-${index}`}
        className=" rounded-lg w-full mb-[-1rem] last:mb-0"
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
    ));
  }
}
