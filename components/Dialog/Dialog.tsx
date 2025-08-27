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
import { Form } from '../Form/Form';

interface Props {
  isOpen: boolean;
  header: string;
  isDelete?: boolean;
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  submitText?: string;
  isForm?: boolean;
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
  isForm = false,
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

            {isForm ? (
              <Form action="submit" onAction={onSubmit} isDialog>
                <ModalBody className="w-full">{children}</ModalBody>

                <ModalFooter className="w-full">
                  <Button onClick={onClose}>Avbryt</Button>

                  <Button
                    isLoading={isSubmitting}
                    type="submit"
                    variant="solid"
                  >
                    {submitText}
                  </Button>
                </ModalFooter>
              </Form>
            ) : (
              <>
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
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
