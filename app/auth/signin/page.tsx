'use client';

import { Button, Card, Checkbox, Form, TextInput } from '@components';
import { addToast } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSignInCredentials } from '@hooks';
import { checkSchemaError } from '@schema';

import { SignInOptions } from '../SigninOptions/SignInOptions';

import { initialCredentials } from './utils';
import { useSchema } from './schema';

export default function SignIn() {
  const navigate = useRouter().push;
  const { schema } = useSchema();

  const [credentials, setCredentials] = useState(initialCredentials);
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  const { mutate, isPending } = useSignInCredentials({
    onSuccess: () => {
      setIsSubmitAttempted(false);
      navigate('/dev');
      addToast({
        title: 'Innlogging vellykket',
        description: 'Du er nå logget inn.',
        color: 'success',
      });
    },
  });

  const fieldError = {
    email: checkSchemaError(schema.email, credentials.email),
    password: checkSchemaError(schema.password, credentials.password),
  };

  const errors = Object.values(fieldError).filter((error) => !!error);

  const handleSignin = () => {
    if (errors.length === 0) mutate(credentials);

    setIsSubmitAttempted(true);
  };

  return (
    <Card align="center" header="Logg inn">
      <Form action="submit" onAction={handleSignin}>
        <div className="flex flex-col gap-4 w-full">
          <TextInput
            isRequired
            errorText={fieldError.email}
            isError={!!fieldError.email && isSubmitAttempted}
            label="E-post"
            type="email"
            value={credentials.email}
            onChange={(value) =>
              setCredentials({ ...credentials, email: value })
            }
          />

          <div className="flex flex-col items-end">
            <TextInput
              isRequired
              errorText={fieldError.password}
              isError={!!fieldError.password && isSubmitAttempted}
              label="Passord"
              type="password"
              value={credentials.password}
              onChange={(value) =>
                setCredentials({ ...credentials, password: value })
              }
            />

            <div className=" w-32">
              <Button href="glemt-passord" variant="light">
                Glemt passord?
              </Button>
            </div>
          </div>

          <div className=" -mt-10">
            <Checkbox
              isChecked={credentials.remember}
              label="Husk meg"
              onChange={(value) =>
                setCredentials({ ...credentials, remember: value })
              }
            />
          </div>
        </div>

        <div className="w-full">
          <div className="flex flex-row gap-2 w-full">
            <Button href="signup">Opprett konto</Button>

            <Button isLoading={isPending} type="submit" variant="solid">
              Logg inn
            </Button>
          </div>

          <SignInOptions />
        </div>
      </Form>
    </Card>
  );
}
