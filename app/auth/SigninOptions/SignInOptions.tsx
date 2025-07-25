'use client';

import { Divider } from '@heroui/react';
import { usePathname } from 'next/navigation';

import { GoogleSignin } from './Google';
import { PasskeyLoginButton } from './PasskeyLoginButton';
import { PasskeyRegisterButton } from './PasskeyRegisterButton';

export function SignInOptions() {
  const pathName = usePathname();

  return (
    <div className=" max-w-80 mx-auto mt-4">
      <Divider />

      {pathName.includes('signin') && <PasskeyLoginButton />}

      {pathName.includes('signup') && <PasskeyRegisterButton />}

      <GoogleSignin />
    </div>
  );
}
