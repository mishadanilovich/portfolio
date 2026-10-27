'use client';

import { type ReactNode, useCallback, useEffect, useRef } from 'react';
import type { Ui } from '@/content';
import { control } from '@/styles/controls';
import { onHelpRequest } from './events';
import styles from './help.module.css';

const TITLE_ID = 'help-title';

export function HelpDialog({ ui, scheme }: { ui: Ui['help']; scheme: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => onHelpRequest(() => dialogRef.current?.showModal()), []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  return (
    <dialog ref={dialogRef} className={styles.dialog} aria-labelledby={TITLE_ID}>
      <div className={styles.head}>
        <div className={styles.heading}>
          <h2 id={TITLE_ID} className={styles.title}>
            {ui.title}
          </h2>
          <p className={styles.lead}>{ui.lead}</p>
        </div>

        <button
          type="button"
          className={`${styles.close} ${control('close', 'ring-paper')}`}
          aria-label={ui.close}
          onClick={close}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3 3L13 13M13 3L3 13" stroke="var(--color-text)" strokeWidth="1.8" />
          </svg>
        </button>
      </div>

      <div className={styles.legend}>
        {scheme}

        <div className={styles.aside}>
          <ol className={styles.items}>
            {ui.items.map((item, index) => (
              <li key={item.term} className={styles.item}>
                <span className={styles.badge} aria-hidden="true">
                  {index + 1}
                </span>
                <div className={styles.text}>
                  <b className={styles.term}>{item.term}</b> {item.text}
                </div>
              </li>
            ))}
          </ol>

          <button
            type="button"
            className={`${styles.ok} ${control('dark', 'ring-paper')}`}
            onClick={close}
          >
            {ui.ok}
          </button>
        </div>
      </div>
    </dialog>
  );
}
