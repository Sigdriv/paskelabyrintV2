'use client';

import { Button, Card, Form, TextInput } from '@components';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { checkSchemaError } from '@schema';
import { useCreateUser } from '@hooks';
import { addToast } from '@heroui/react';

import { SignInOptions } from '../SigninOptions/SignInOptions';

import { initialUser } from './utils';
import { useSchema } from './schema';

export default function Signup() {
  const navigate = useRouter().push;
  const { schema } = useSchema();

  const [newUser, setNewUser] = useState(initialUser);
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  const { mutate, isPending } = useCreateUser({
    onSuccess: () => {
      navigate('signin');

      addToast({
        title: 'Bruker opprettet',
        description: 'Din bruker er nå opprettet',
        severity: 'success',
        color: 'success',
      });
    },
  });

  const fieldError = {
    name: checkSchemaError(schema.name, newUser.name),
    email: checkSchemaError(schema.email, newUser.email),
    phoneNr: checkSchemaError(schema.phoneNr, newUser.phoneNr),
    password: checkSchemaError(schema.password, newUser.password),
    confirmPassword: checkSchemaError(schema.reapeatPassword, {
      password: newUser.password,
      confirmPassword: newUser.confirmPassword,
    }),
  };

  const errors = Object.values(fieldError).filter((error) => !!error);

  const handleSignup = () => {
    setIsSubmitAttempted(true);

    if (errors.length === 0) mutate(newUser);
  };

  return (
    <Card align="center" header="Opprett bruker">
      <Form action="submit" onAction={handleSignup}>
        <div className="flex flex-col gap-4 w-full">
          <TextInput
            isRequired
            errorText={fieldError.name}
            isError={!!fieldError.name && isSubmitAttempted}
            label="Fult navn"
            type="text"
            value={newUser.name}
            onChange={(value) => setNewUser({ ...newUser, name: value })}
          />

          <TextInput
            isRequired
            errorText={fieldError.email}
            isError={!!fieldError.email && isSubmitAttempted}
            label="E-post"
            type="email"
            value={newUser.email}
            onChange={(value) => setNewUser({ ...newUser, email: value })}
          />

          <TextInput
            isRequired
            errorText={fieldError.phoneNr}
            isError={!!fieldError.phoneNr && isSubmitAttempted}
            label="Telefonnummer"
            type="tel"
            value={newUser.phoneNr}
            onChange={(value) => setNewUser({ ...newUser, phoneNr: value })}
          />

          <TextInput
            isRequired
            errorText={fieldError.password}
            isError={!!fieldError.password && isSubmitAttempted}
            label="Passord"
            type="password"
            value={newUser.password}
            onChange={(value) => setNewUser({ ...newUser, password: value })}
          />

          <TextInput
            isRequired
            errorText={fieldError.confirmPassword}
            isError={!!fieldError.confirmPassword && isSubmitAttempted}
            label="Gjenta passord"
            type="password"
            value={newUser.confirmPassword}
            onChange={(value) =>
              setNewUser({ ...newUser, confirmPassword: value })
            }
          />
        </div>

        <div className="w-full">
          <div className="flex flex-row gap-2 w-full">
            <Button href="signin">Logg inn</Button>

            <Button isLoading={isPending} type="submit" variant="solid">
              Opprett bruker
            </Button>
          </div>

          <SignInOptions />
        </div>
      </Form>
    </Card>
  );
}
