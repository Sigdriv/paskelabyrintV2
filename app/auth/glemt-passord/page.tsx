'use client';

import { Button, Card, Code, Form, TextInput } from '@components';
import { useForgottenPassword } from '@hooks';
import { useState } from 'react';
import { checkSchemaError } from '@schema';
import { addToast } from '@heroui/react';

import { useSchema } from './useSchema';

export default function ForgottenPassword() {
  const [email, setEmail] = useState('');
  const [isSubmittAttempted, setIsSubmittAttempted] = useState(false);
  const { schema } = useSchema();

  const { mutate, isPending } = useForgottenPassword({
    onSuccess: (_, data) =>
      addToast({
        title: 'Epost sendt',
        description: (
          <>
            Epost med instruksjoner er sendt til: <Code>{data.email}</Code>
          </>
        ),
        color: 'success',
      }),
  });

  const fieldError = {
    email: checkSchemaError(schema.email, email),
  };

  const errors = Object.values(fieldError).filter((error) => !!error);

  const handleResetPassword = () => {
    if (errors.length === 0) mutate({ email });

    setIsSubmittAttempted(true);
  };

  return (
    <Card align="center" header="Tilbakestill passord">
      <Form action="submit" onAction={handleResetPassword}>
        <TextInput
          isRequired
          errorText={fieldError.email}
          isError={!!fieldError.email && isSubmittAttempted}
          label="E-post"
          type="email"
          value={email}
          onChange={(value) => setEmail(value)}
        />

        <Button isLoading={isPending} type="submit" variant="solid">
          Tilbakestill
        </Button>
      </Form>
    </Card>
  );
}
