'use client';

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
}

export function Dialog({
  isOpen,
  header,
  children,
  isDelete = false,
  onClose,
  onSubmit,
  isSubmitting = false,
}: Props) {
  return (
    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{header}</ModalHeader>

            <ModalBody>{children}</ModalBody>

            <ModalFooter>
              <Button onClick={onClose}>Close</Button>

              <Button
                color={isDelete ? 'danger' : 'default'}
                isLoading={isSubmitting}
                variant="solid"
                onClick={onSubmit}
              >
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
