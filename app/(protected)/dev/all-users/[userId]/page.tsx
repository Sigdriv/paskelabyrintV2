'use client';

import type { Role, User } from '@api';

import { Button, Card, Form, Select, Skeleton, TextInput } from '@components';
import { useGetUser, useUpdateUser } from '@hooks';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkSchemaError, getErrors } from '@schema';
import { addToast } from '@heroui/react';

import { useSchema } from './schema';

export default function EditUser() {
  const { userId } = useParams<{ userId: string }>();
  const { schema } = useSchema();

  // TODO: Fix update user
  const { data, isPending } = useGetUser({ userId });
  const { mutate, isPending: isUpdating } = useUpdateUser();

  const [user, setUser] = useState<User | undefined>();
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const fieldError = {
    name: checkSchemaError(schema.name, user?.name),
    email: checkSchemaError(schema.email, user?.email),
    role: checkSchemaError(schema.role, user?.role),
  };

  const errors = getErrors<typeof fieldError>({ fieldError });

  const handleSubmitUser = () => {
    if (!user) {
      addToast({
        title: 'Oppdatering feilet',
        description: 'Oppdatering av bruker feilet, prøv igjen senere.',
        color: 'danger',
      });

      return;
    }

    if (errors.length === 0) mutate(user);

    setSubmitAttempted(true);
  };

  return (
    <Card align="center" header={`Rediger bruker ${user?.name || ''}`}>
      <Form action="submit" onAction={handleSubmitUser}>
        <Skeleton
          elements={['textInput', 'textInput', 'select']}
          isLoading={isPending}
        />

        {!isPending && !user && (
          <p className="text-default-500">Fant ingen bruker med ID {userId}</p>
        )}

        {!isPending && user && user.isGoogle && (
          <p className="text-default-500">
            Denne brukeren er opprettet via Google og kan ikke redigeres.
          </p>
        )}

        {user && !user.isGoogle && !isPending && (
          <>
            <div className="w-full flex flex-col gap-4">
              <TextInput
                isRequired
                defaultValue={user.name}
                errorText={fieldError.name}
                isError={!!fieldError.name && submitAttempted}
                label="Navn"
                type="text"
                value={user.name}
                onChange={(value) => setUser({ ...user, name: value })}
              />

              <TextInput
                isRequired
                defaultValue={user.email}
                errorText={fieldError.email}
                isError={!!fieldError.email && submitAttempted}
                label="E-post"
                type="email"
                value={user.email}
                onChange={(value) => setUser({ ...user, email: value })}
              />

              <Select<Role>
                isRequired
                errorText={fieldError.role}
                isError={!!fieldError.role && submitAttempted}
                label="Rolle"
                options={[
                  { value: 'DEV', label: 'Dev' },
                  { value: 'ADMIN', label: 'Admin' },
                  { value: 'USER', label: 'User' },
                ]}
                value={user.role}
                onChange={(value) => setUser({ ...user, role: value })}
              />
            </div>

            <Button isLoading={isUpdating} type="submit" variant="solid">
              Oppdater bruker
            </Button>
          </>
        )}
      </Form>
    </Card>
  );
}
