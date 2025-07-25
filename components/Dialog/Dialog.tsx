'use client';

import type { JSX } from 'react';

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react';

import { Button } from '../Button/Button';

interface Props {
  isOpen: boolean;
  header: string;
  isDelete?: boolean;
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  submitText?: string;
}

export function Dialog({
  isOpen,
  header,
  children,
  isDelete = false,
  onClose,
  onSubmit,
  isSubmitting = false,
  submitText = 'Lagre',
}: Props) {
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      placement="center"
      onOpenChange={onClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{header}</ModalHeader>

            <ModalBody>{children}</ModalBody>

            <ModalFooter>
              <Button onClick={onClose}>Avbryt</Button>

              <Button
                color={isDelete ? 'danger' : 'default'}
                isLoading={isSubmitting}
                variant="solid"
                onClick={onSubmit}
              >
                {isDelete ? 'Slett' : submitText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
