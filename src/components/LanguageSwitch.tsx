'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, type Locale } from '@/content';
import { control } from '@/styles/controls';
import styles from './header.module.css';

export function LanguageSwitch({ label, active }: { label: string; active: Locale }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/[^/]*/, '');

  return (
    <div className={styles.language} role="group" aria-label={label}>
      {locales.map((item) => (
        <Link
          key={item}
          href={`/${item}${rest}`}
          className={control('segment', 'ring-dark')}
          aria-current={item === active ? 'true' : undefined}
        >
          {item.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
