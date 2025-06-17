'use client';

import { Select as HeroSelect, SelectItem } from '@heroui/react';

interface Props<T> {
  options: { value: string; label: string }[];
  label: string;
  emptyText?: string;
  onChange: (value: T) => void;
  value: T;
  errorText?: string;
  isError?: boolean;
  isRequired?: boolean;
}

export function Select<T>({
  options,
  label,
  emptyText,
  onChange,
  errorText,
  value,
  isError = false,
  isRequired = false,
}: Props<T>) {
  const stringValue = String(value);

  const selectedKeys: Set<string> =
    stringValue && options.some((option) => option.value === stringValue)
      ? new Set([stringValue])
      : new Set();

  return (
    <HeroSelect
      aria-label={label}
      errorMessage={errorText}
      isInvalid={isError}
      isRequired={isRequired}
      items={options}
      label={label}
      listboxProps={{
        emptyContent: emptyText || `Ingen ${label.toLowerCase()} tilgjengelig`,
      }}
      placeholder={`Velg en ${label.toLowerCase()}`}
      selectedKeys={selectedKeys}
      onChange={({ target: { value } }) => onChange(value as T)}
    >
      {(option) => <SelectItem key={option.value}>{option.label}</SelectItem>}
    </HeroSelect>
  );
}
