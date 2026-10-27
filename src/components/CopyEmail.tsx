'use client';

import { useEffect, useRef, useState } from 'react';
import { control } from '@/styles/controls';
import styles from './roof.module.css';

const FEEDBACK = 2000;

export function CopyEmail({
  email,
  copy,
  copied,
}: {
  email: string;
  copy: string;
  copied: string;
}) {
  const [done, setDone] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const write = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return;
    }

    setDone(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDone(false), FEEDBACK);
  };

  return (
    <>
      <button
        type="button"
        className={`${styles.copy} ${control('tile', 'tile-square', 'ring-paper')}`}
        aria-label={done ? copied : copy}
        onClick={() => void write()}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <g stroke="var(--icon)" strokeWidth="1.6">
            {done ? (
              <path d="M3 9.5L7 13.5L15 5" />
            ) : (
              <>
                <rect x="6" y="6" width="9" height="10" rx="1.5" />
                <path d="M12 6V3.5Q12 2 10.5 2H4.5Q3 2 3 3.5V11Q3 12.5 4.5 12.5H6" />
              </>
            )}
          </g>
        </svg>
      </button>

      <p className={styles.announce} role="status">
        {done ? copied : ''}
      </p>
    </>
  );
}
