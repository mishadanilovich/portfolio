'use client';

import styles from '@/components/side-controls.module.css';
import { control } from '@/styles/controls';
import { requestHelp } from './events';

export function HelpButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className={`${control('icon', 'ring-dark')} ${styles.help}`}
      aria-label={label}
      onClick={requestHelp}
    >
      ?
    </button>
  );
}
