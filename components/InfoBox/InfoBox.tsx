'use client';

import { Alert } from '@heroui/react';
import { useState } from 'react';

interface Props {
  isVisible?: boolean;
  header: string;
  body: string;
  variant?: 'success' | 'warning' | 'danger' | 'default';
  endContent?: JSX.Element;
  isClosable?: boolean;
}

export function InfoBox({
  isVisible = true,
  header,
  body,
  variant = 'default',
  endContent,
  isClosable = false,
}: Props) {
  return (
    <Alert
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
