'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    window.gtag?.('config', 'G-QERT5EKPR7', { page_path: pathname });
  }, [pathname]);

  return null;
}
