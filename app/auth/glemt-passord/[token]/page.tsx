'use client';

import { Button, Card, Form, InfoBox, Skeleton, TextInput } from '@components';
import { useResetPassword, useValidateToken } from '@hooks';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { checkSchemaError } from '@schema';
import { addToast } from '@heroui/react';

import { initialNewPassword } from './utils';
import { useSchema } from './schema';

export default function ResetPassword() {
  const router = useRouter().push;
  const { token } = useParams<{ token: string }>();
  const { schema } = useSchema();

  const [newPassword, setNewPassword] = useState(initialNewPassword);
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  const {
    data: { valid } = {},
    isPending: isFetchingValidation,
    error,
  } = useValidateToken({ token });

  const { mutate, isPending } = useResetPassword({
    onSuccess: () => {
      addToast({
        title: 'Passordet er tilbakestilt',
        description: 'Du kan nå logge inn med ditt nye passord.',
        color: 'success',
      });
      router('/dev');
    },
  });

  const fieldError = {
    password: checkSchemaError(schema.password, newPassword.password),
    confirmPassword: checkSchemaError(schema.repeatPassword, {
      password: newPassword.password,
      confirmPassword: newPassword.confirmPassword,
    }),
  };

  const errors = Object.values(fieldError).filter((error) => !!error);

  const handleCreatePassword = () => {
    if (errors.length === 0) mutate({ token, body: newPassword });

    setIsSubmitAttempted(true);
  };

  const InfoBoxEndContent = () => (
    <div className=" max-w-40 mr-2">
      <Button href="." variant="solid">
        Be om ny
      </Button>
    </div>
  );

  return (
    <div className="flex items-center justify-center">
      <Card header="Tilbakestill passord">
        <Form action="submit" onAction={handleCreatePassword}>
          <InfoBox
            body="Denne lenken er ikke lenger gyldig. Vennligst be om en ny."
            endContent={<InfoBoxEndContent />}
            header="Ugyldig lenke"
            isVisible={!!error && !valid}
            variant="danger"
          />

          {(valid || isFetchingValidation) && (
            <>
              <Skeleton isLoading={isFetchingValidation}>
                <TextInput
                  isRequired
                  errorText={fieldError.password}
                  isError={!!fieldError.password && isSubmitAttempted}
                  label="Passord"
                  type="password"
                  value={newPassword.password}
                  onChange={(value) =>
                    setNewPassword({ ...newPassword, password: value })
                  }
                />
              </Skeleton>

              <Skeleton isLoading={isFetchingValidation}>
                <TextInput
                  isRequired
                  errorText={fieldError.confirmPassword}
                  isError={!!fieldError.confirmPassword && isSubmitAttempted}
                  label="Bekreft passord"
                  type="password"
                  value={newPassword.confirmPassword}
                  onChange={(value) =>
                    setNewPassword({ ...newPassword, confirmPassword: value })
                  }
                />
              </Skeleton>

              <Button isLoading={isPending} type="submit" variant="solid">
                Tilbakestill passord
              </Button>
            </>
          )}
        </Form>
      </Card>
    </div>
  );
}
