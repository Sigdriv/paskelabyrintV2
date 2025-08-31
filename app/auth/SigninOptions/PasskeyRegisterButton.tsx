'use client';

import type { CreatePasskey } from '@api';

import { Button, Dialog, TextInput } from '@components';
import { addToast } from '@heroui/react';
import { useFinishPasskeyRegistration, useRegisterPasskey } from '@hooks';
import { TkError } from '@http';
import { startRegistration } from '@simplewebauthn/browser';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { checkSchemaError } from '@schema';

import { useSchema } from '../signup/schema';

import { initialPasskeyUser } from './utils';

export function PasskeyRegisterButton() {
  const navigate = useRouter().push;

  const { schema } = useSchema();

  const [createPasskey, setCreatePasskey] = useState(false);
  const [user, setUser] = useState<CreatePasskey>(initialPasskeyUser);
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  const fieldError = {
    name: checkSchemaError(schema.name, user.name),
    email: checkSchemaError(schema.email, user.email),
    phoneNr: checkSchemaError(schema.phoneNr, user.phoneNr),
  };

  const errors = Object.values(fieldError).filter((error) => !!error);

  const { mutateAsync: registerPasskey } = useRegisterPasskey();
  const { mutateAsync: finishPasskeyRegistration } =
    useFinishPasskeyRegistration({
      onSuccess: () => {
        navigate('/dev');
        addToast({
          title: 'Opprettelse av passkey vellykket',
          description: 'Du er nå registrert med passkey.',
          color: 'success',
        });
      },
    });

  const handleCreate = async () => {
    if (errors.length > 0) {
      setIsSubmitAttempted(true);

      return;
    }

    try {
      const options = await registerPasskey(user);

      const credential = await startRegistration({
        optionsJSON: options.publicKey,
      });

      await finishPasskeyRegistration(credential);
    } catch (error) {
      if (error instanceof TkError) {
        return;
      }

      addToast({
        title: 'Opprettelse av passkey feilet',
        description:
          'Det oppstod en feil under opprettelse av passkey. Vennligst prøv igjen.',
        color: 'danger',
      });
    }
  };

  return (
    <div className=" max-w-60 mx-auto mt-4">
      <Button variant="solid" onClick={() => setCreatePasskey(true)}>
        Opprett bruker med passkey
      </Button>

      <Dialog
        isForm
        header="Opprett passkey"
        isOpen={createPasskey}
        submitText="Opprett passkey"
        onClose={() => setCreatePasskey(false)}
        onSubmit={handleCreate}
      >
        <div className="flex flex-col gap-4 w-full">
          <TextInput
            isRequired
            errorText={fieldError.name}
            isError={!!fieldError.name && isSubmitAttempted}
            label="Fult navn"
            type="text"
            value={user.name}
            onChange={(value) => setUser({ ...user, name: value })}
          />

          <TextInput
            isRequired
            errorText={fieldError.email}
            isError={!!fieldError.email && isSubmitAttempted}
            label="E-post"
            type="email"
            value={user.email}
            onChange={(value) => setUser({ ...user, email: value })}
          />

          <TextInput
            isRequired
            errorText={fieldError.phoneNr}
            isError={!!fieldError.phoneNr && isSubmitAttempted}
            label="Telefonnummer"
            type="tel"
            value={user.phoneNr}
            onChange={(value) => setUser({ ...user, phoneNr: value })}
          />
        </div>
      </Dialog>
    </div>
  );
}
