'use client';

import type { ReactNode } from 'react';
import { requestIntercom } from './events';

export function CallButton({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <button type="button" className={className} onClick={requestIntercom}>
      {children}
    </button>
  );
}
