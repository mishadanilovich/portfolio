'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { APARTMENT_TITLE_ID } from './apartment';
import styles from './room.module.css';

export function RoomShell({ floor, children }: { floor: number; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const room = ref.current;
    if (room === null) return;

    room.dataset.room = String(floor);
    room.focus({ preventScroll: true });

    return () => {
      delete room.dataset.room;
    };
  }, [floor]);

  return (
    <main
      ref={ref}
      className={styles.room}
      data-room={floor}
      aria-labelledby={APARTMENT_TITLE_ID}
      tabIndex={-1}
    >
      {children}
    </main>
  );
}
