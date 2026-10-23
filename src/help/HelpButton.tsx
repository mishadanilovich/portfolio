'use client';

import { requestHelp } from './events';
import styles from './help.module.css';

export function HelpButton({ label }: { label: string }) {
  return (
    <button type="button" className={styles.button} aria-label={label} onClick={requestHelp}>
      ?
    </button>
  );
}
