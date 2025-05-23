'use client';

import { Button, Card, Checkbox, TextInput } from '@components';
import { Form } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { initialCredentials } from './utils';

export default function SignIn() {
  const navigate = useRouter().push;

  const [credentials, setCredentials] = useState(initialCredentials);

  return (
    <div className="flex flex-col items-center justify-center">
      <Card header="Logg inn">
        <Form className="flex flex-col gap-4 w-96" onSubmit={() => {}}>
          <div className="flex flex-col gap-2 w-full">
            <TextInput
              label="E-post"
              type="text"
              value={credentials.email}
              onChange={(value) =>
                setCredentials({ ...credentials, email: value })
              }
            />

            <TextInput
              label="Passord"
              type="password"
              value={credentials.password}
              onChange={(value) =>
                setCredentials({ ...credentials, password: value })
              }
            />
          </div>

          <Checkbox
            isChecked={credentials.remember}
            label="Husk meg"
            onChange={function (value: boolean): void {
              setCredentials({ ...credentials, remember: value });
            }}
          />

          <div className="flex flex-row gap-1 w-full">
            <Button onClick={() => navigate('signup')}>Opprett konto</Button>

            <Button type="submit" variant="solid">
              Logg inn
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
