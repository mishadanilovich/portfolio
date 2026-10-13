'use client';

import Link from 'next/link';
import type { MouseEvent, ReactNode } from 'react';
import type { Locale } from '@/content';
import { isPlainClick } from '@/lib/click';
import { requestFlyOut } from '@/scene/camera-events';
import type { LevelId } from '@/scene/layout';

export function HouseLink({
  locale,
  floor,
  level,
  className,
  children,
}: {
  locale: Locale;
  floor: number;
  level?: LevelId;
  className?: string;
  children: ReactNode;
}) {
  const leave = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isPlainClick(event)) requestFlyOut({ floor, level });
  };

  return (
    <Link href={`/${locale}`} className={className} onClick={leave}>
      {children}
    </Link>
  );
}
