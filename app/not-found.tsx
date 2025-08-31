import { Button, Header1 } from '@components';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Header1>Side finnes ikke</Header1>

      <p>Vi fant ikke siden du leter etter.</p>

      <div className="mt-8">
        <Button href="/" variant="solid">
          Gå til forsiden
        </Button>
      </div>
    </div>
  );
}
