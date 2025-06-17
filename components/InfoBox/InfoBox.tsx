'use client';

import { Alert } from '@heroui/react';

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
      className="mb-4 w-fit"
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
