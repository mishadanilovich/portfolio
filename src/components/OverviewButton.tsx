'use client';

import { requestOverview } from '@/scene/camera-events';
import styles from './header.module.css';

export function OverviewButton({ label }: { label: string }) {
  return (
    <button type="button" className={styles.overview} onClick={requestOverview}>
      {label}
    </button>
  );
}
