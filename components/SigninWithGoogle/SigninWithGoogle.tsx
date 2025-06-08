'use client';

import { Divider } from '@heroui/react';
import { useGoogleSignin } from '@hooks';

import { Button } from '../Button/Button';
import { GoogleLogo } from '../icons';

export function SigninWithGoogle() {
  const { mutate, isPending } = useGoogleSignin();

  return (
    <div className=" max-w-80 mx-auto mt-4">
      <Divider />

      <div className=" max-w-60 mx-auto mt-4">
        <Button isLoading={isPending} variant="solid" onClick={mutate}>
          <div className=" flex flex-row items-center gap-2">
            <GoogleLogo />
            Logg inn med Google
          </div>
        </Button>
      </div>
    </div>
  );
}
