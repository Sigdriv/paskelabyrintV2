'use client';

import { Button, Dialog, QueryError, TextInput } from '@components';
import { addToast } from '@heroui/react';
import { useLoginOptions, useVerifyPasskeyLogin } from '@hooks';
import { TkError } from '@http';
import { checkSchemaError } from '@schema';
import { startAuthentication } from '@simplewebauthn/browser';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useSchema } from '../signin/schema';

export function PasskeyLoginButton() {
  const navigate = useRouter().push;
  const { schema } = useSchema();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
  const [error, setError] = useState<number | undefined>();

  const { mutateAsync: loginOptions, isPending: isLoginPending } =
    useLoginOptions();
  const { mutateAsync: verifyPasskeyLogin, isPending: isVerifyPending } =
    useVerifyPasskeyLogin({
      onSuccess: () => {
        navigate('/dev');
        addToast({
          title: 'Innlogging vellykket',
          description: 'Du er nå logget inn.',
          color: 'success',
        });
      },
    });

  const isLoading = isLoginPending || isVerifyPending;

  const fieldError = {
    email: checkSchemaError(schema.email, email),
  };

  const errors = Object.values(fieldError).filter((error) => !!error);

  const handlelogin = async () => {
    setIsSubmitAttempted(true);
    setError(undefined);
    if (errors.length > 0) {
      return;
    }

    try {
      const options = await loginOptions({ email });

      const assertion = await startAuthentication({
        optionsJSON: options,
      });

      await verifyPasskeyLogin({ email, credentials: assertion });
    } catch (error) {
      if (error instanceof TkError) {
        if (error.message === 'No credentials found for user') setError(404);

        return;
      }
      addToast({
        title: 'Innlogging feilet',
        description:
          'Det oppstod en feil under innlogging med passkey. Vennligst prøv igjen.',
        color: 'danger',
      });
    }
  };

  return (
    <div className=" max-w-60 mx-auto mt-4">
      <Button variant="solid" onClick={() => setIsDialogOpen(true)}>
        Logg inn med passkey
      </Button>

      <Dialog
        isForm
        header="Logg inn med passkey"
        isOpen={isDialogOpen}
        isSubmitting={isLoading}
        submitText="Logg inn"
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handlelogin}
      >
        <TextInput
          isRequired
          errorText={fieldError.email}
          isError={!!fieldError.email && isSubmitAttempted}
          label="E-post"
          type="email"
          value={email}
          onChange={(value) => setEmail(value)}
        />

        <QueryError
          error={
            error
              ? new TkError({
                  errorText:
                    'Fant ingen passnøkkel for denne brukeren, vennligst logg inn med e-post og passord eller Google.',
                  statusCode: 404,
                })
              : null
          }
          text="Fant ingen passnøkkel for denne brukeren, vennligst logg inn med e-post og passord eller Google."
        />
      </Dialog>
    </div>
  );
}
