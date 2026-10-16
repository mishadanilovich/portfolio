'use client';

import Link from 'next/link';
import type { MouseEvent, ReactNode } from 'react';
import type { Locale } from '@/content';
import { isPlainClick } from '@/lib/click';
import { requestFlyOut, type FlyTarget } from './camera-events';

export function HouseLink({
  locale,
  target,
  className,
  children,
}: {
  locale: Locale;
  target: FlyTarget;
  className?: string;
  children: ReactNode;
}) {
  const leave = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isPlainClick(event)) requestFlyOut(target);
  };

  return (
    <Link href={`/${locale}`} className={className} onClick={leave}>
      {children}
    </Link>
  );
}
