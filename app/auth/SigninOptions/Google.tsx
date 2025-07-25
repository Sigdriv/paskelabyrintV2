import { Button, GoogleLogo } from '@components';
import { useGoogleSignin } from '@hooks';

export function GoogleSignin() {
  const { mutate, isPending } = useGoogleSignin();

  return (
    <div className=" max-w-60 mx-auto mt-4">
      <Button isLoading={isPending} variant="solid" onClick={mutate}>
        <div className=" flex flex-row items-center gap-2">
          <GoogleLogo />
          Logg inn med Google
        </div>
      </Button>
    </div>
  );
}
