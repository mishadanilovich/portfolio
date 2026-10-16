'use client';

import { useEffect, useRef, type ReactNode } from 'react';

export function SceneCover({
  id,
  className,
  labelledBy,
  children,
}: {
  id: string;
  className?: string;
  labelledBy: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const cover = ref.current;
    if (cover === null) return;

    cover.dataset.room = id;
    cover.focus({ preventScroll: true });

    return () => {
      delete cover.dataset.room;
    };
  }, [id]);

  return (
    <main ref={ref} className={className} data-room={id} aria-labelledby={labelledBy} tabIndex={-1}>
      {children}
    </main>
  );
}
