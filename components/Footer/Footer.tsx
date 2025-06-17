'use client';

// TODO: Use from '@components'
import { Link } from '@heroui/react';

export function Footer() {
  return (
    <footer className="w-full flex items-center justify-center py-3">
      <Link
        isExternal
        className="flex items-center gap-1 text-current"
        href="https://github.com/Sigdriv"
        title="Sigdriv on GitHub"
      >
        <span className="text-default-600">Laget av</span>

        <p className="text-primary">Sigdriv</p>
      </Link>
    </footer>
  );
}
