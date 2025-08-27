'use client';

import type { JSX } from 'react';

import { Alert } from '@heroui/react';

interface Props {
  isVisible?: boolean;
  header: string;
  body: string;
  variant?: 'success' | 'warning' | 'danger' | 'default';
  endContent?: JSX.Element;
  isClosable?: boolean;
  isQuery?: boolean;
}

export function InfoBox({
  isVisible = true,
  header,
  body,
  variant = 'default',
  endContent,
  isClosable = false,
  isQuery = false,
}: Props) {
  return (
    <Alert
      className={`w-fit ${isQuery ? 'border-l-4 border-red-500' : 'mb-4'}`}
      color={variant}
      description={body}
      endContent={endContent}
      isClosable={isClosable}
      isVisible={isVisible}
      title={header}
      variant="faded"
    />
  );
}
