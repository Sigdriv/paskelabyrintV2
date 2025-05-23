'use client';

import { Checkbox as HeroCheckbox } from '@heroui/react';

import { Text } from '../typography';

interface Props {
  label: string;
  isChecked: boolean;
  onChange: (value: boolean) => void;
}

export function Checkbox({ label, isChecked, onChange }: Props) {
  return (
    <HeroCheckbox isSelected={isChecked} onValueChange={onChange}>
      {label}
    </HeroCheckbox>
  );
}
