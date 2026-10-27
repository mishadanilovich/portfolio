'use client';

import { requestOverview } from '@/scene/camera-events';
import { control } from '@/styles/controls';
import styles from './side-controls.module.css';

export function OverviewButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className={`${control('icon', 'ring-dark')} ${styles.overview}`}
      aria-label={label}
      onClick={requestOverview}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.6">
          <path d="M7 2.5H2.5V7" />
          <path d="M11 2.5H15.5V7" />
          <path d="M7 15.5H2.5V11" />
          <path d="M11 15.5H15.5V11" />
        </g>
      </svg>
    </button>
  );
}
