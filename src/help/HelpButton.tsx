'use client';

import styles from '@/components/controls.module.css';
import { requestHelp } from './events';

export function HelpButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className={`${styles.control} ${styles.help}`}
      aria-label={label}
      onClick={requestHelp}
    >
      ?
    </button>
  );
}
