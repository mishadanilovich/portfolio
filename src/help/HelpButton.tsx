'use client';

import { requestHelp } from './events';

export function HelpButton({ className, label }: { className?: string; label: string }) {
  return (
    <button type="button" className={className} aria-label={label} onClick={requestHelp}>
      ?
    </button>
  );
}
