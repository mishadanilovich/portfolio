'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Contact, Ui } from '@/content';
import { onIntercomRequest } from './events';
import styles from './intercom.module.css';

const TITLE_ID = 'intercom-title';
const WARMUP = 2000;

const IntercomBody = dynamic(() => import('./IntercomBody'), { ssr: false });

export function IntercomDialog({
  ui,
  contacts,
  newTab,
}: {
  ui: Ui['intercom'];
  contacts: Contact[];
  newTab: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(
    () =>
      onIntercomRequest(() => {
        setMounted(true);
        dialogRef.current?.showModal();
      }),
    [],
  );

  useEffect(() => {
    const warm = () => void import('./IntercomBody');

    if (typeof window.requestIdleCallback === 'function') {
      const handle = window.requestIdleCallback(warm);

      return () => window.cancelIdleCallback(handle);
    }

    const timer = window.setTimeout(warm, WARMUP);

    return () => window.clearTimeout(timer);
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  return (
    <dialog ref={dialogRef} className={styles.dialog} aria-labelledby={TITLE_ID}>
      {mounted && (
        <IntercomBody
          ui={ui}
          contacts={contacts}
          newTab={newTab}
          titleId={TITLE_ID}
          onClose={close}
        />
      )}
    </dialog>
  );
}
