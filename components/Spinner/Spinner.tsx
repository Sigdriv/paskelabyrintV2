import { Spinner as HeroSpinner } from '@heroui/react';

interface Props {
  label?: string;
}
export function Spinner({ label }: Props) {
  return <HeroSpinner label={label} variant="wave" />;
}
