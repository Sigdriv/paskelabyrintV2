'use client';

import { Input, Textarea } from '@heroui/react';
import { useState } from 'react';

import { EyeFilledIcon, EyeSlashFilledIcon } from '../icons';

interface Props {
  label: string;
  type: 'text' | 'password' | 'email' | 'tel';
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  isRequired?: boolean;
  errorText?: string;
  isError?: boolean;
  defaultValue?: string;
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
  defaultValue = '',
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return multiline ? (
    <Textarea
      defaultValue={defaultValue}
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
      defaultValue={defaultValue}
      endContent={
        type === 'password' ? (
          <button
            aria-label="toggle password visibility"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        ) : null
      }
      errorMessage={errorText}
      isInvalid={isError}
      isRequired={isRequired}
      label={label}
      type={type === 'password' && showPassword ? 'text' : type}
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
    />
  );
}
