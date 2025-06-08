'use client';

import Link from 'next/link';

interface Props {
  label: string;
  href: string;
}

export function InternalLink({ label, href }: Props) {
  return <Link href={href}>{label}</Link>;
}
