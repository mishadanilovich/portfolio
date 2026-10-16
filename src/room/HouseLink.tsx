'use client';

import Link from 'next/link';
import type { MouseEvent, ReactNode } from 'react';
import type { Locale } from '@/content';
import { isPlainClick } from '@/lib/click';
import { requestFlyOut } from '@/scene/camera-events';

export function HouseLink({
  locale,
  floor,
  className,
  children,
}: {
  locale: Locale;
  floor: number;
  className?: string;
  children: ReactNode;
}) {
  const leave = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isPlainClick(event)) requestFlyOut(floor);
  };

  return (
    <Link href={`/${locale}`} className={className} onClick={leave}>
      {children}
    </Link>
  );
}
