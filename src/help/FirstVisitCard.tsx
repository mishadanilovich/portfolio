'use client';

import { useSyncExternalStore } from 'react';
import type { Ui } from '@/content';
import { control } from '@/styles/controls';
import { requestHelp } from './events';
import styles from './first-visit.module.css';

const KEY = 'house:first-visit';
const listeners = new Set<() => void>();

let dismissed = false;

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function isFirstVisit() {
  if (dismissed) return false;

  try {
    return window.localStorage.getItem(KEY) === null;
  } catch {
    return true;
  }
}

function remember() {
  dismissed = true;
  listeners.forEach((notify) => notify());

  try {
    window.localStorage.setItem(KEY, 'seen');
  } catch {
    return;
  }
}

export function FirstVisitCard({ ui }: { ui: Ui['firstVisit'] }) {
  const shown = useSyncExternalStore(subscribe, isFirstVisit, () => false);

  if (!shown) return null;

  const openHelp = () => {
    remember();
    requestHelp();
  };

  return (
    <div className={styles.card} role="status" data-hidden-in-focus>
      <span className={styles.arrow} />

      <p className={styles.title}>{ui.title}</p>
      <p className={styles.text}>{ui.text}</p>

      <div className={styles.actions}>
        <button
          type="button"
          className={control('text', 'text-inline', 'ring-paper')}
          onClick={openHelp}
        >
          {ui.legend}
        </button>
        <button type="button" className={control('quiet', 'ring-paper')} onClick={remember}>
          {ui.dismiss}
        </button>
      </div>
    </div>
  );
}
