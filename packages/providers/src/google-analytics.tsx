'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    const url = pathname + searchParams.toString();
    window.gtag?.('config', 'G-QERT5EKPR7', { page_path: url });
  }, [pathname, searchParams]);

  return null;
}
