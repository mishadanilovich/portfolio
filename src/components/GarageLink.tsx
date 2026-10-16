'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MouseEvent } from 'react';
import { isPlainClick } from '@/lib/click';
import { requestFlyIn } from '@/scene/camera-events';
import styles from './header.module.css';

export function GarageLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const current = pathname === href || pathname.startsWith(`${href}/`);

  const enter = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isPlainClick(event)) requestFlyIn('garage');
  };

  return (
    <Link
      href={href}
      className={styles.link}
      aria-current={current ? 'page' : undefined}
      onClick={enter}
    >
      {label}
    </Link>
  );
}
