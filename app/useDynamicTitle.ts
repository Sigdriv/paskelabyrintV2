'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function useDynamicTitle() {
  const [title, setTitle] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const updateTitle = () => {
      const h1 = document.querySelector('h1');

      if (h1)
        setTitle(
          h1.textContent?.includes('Kor ska oss reis') ? null : h1.textContent
        );
    };

    updateTitle();

    const observer = new MutationObserver(updateTitle);
    const h1 = document.querySelector('h1');

    if (h1) observer.observe(h1, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [pathname]);

  return title;
}
