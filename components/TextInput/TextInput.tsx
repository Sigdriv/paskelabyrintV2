'use client';

import { Input, Textarea } from '@heroui/react';

interface Props {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  isRequired?: boolean;
  errorText?: string;
  isError?: boolean;
}

export function TextInput({
  label,
  type,
  value,
  onChange,
  multiline = false,
  isRequired = false,
  errorText,
  isError,
}: Props) {
  return multiline ? (
    <Textarea
      errorMessage={errorText}
      isInvalid={isError}
      isRequired={isRequired}
      label={label}
      rows={4}
      type={type}
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
    />
  ) : (
    <Input
      errorMessage={errorText}
      isInvalid={isError}
      isRequired={isRequired}
      label={label}
      type={type}
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
    />
  );
}
