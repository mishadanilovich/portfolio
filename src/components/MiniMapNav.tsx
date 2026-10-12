'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { onLevelChange, requestLevel } from '@/scene/camera-events';
import { LANDING_LEVEL, type LevelId } from '@/scene/layout';
import styles from './minimap.module.css';

const ICONS: Record<string, ReactNode> = {
  roof: (
    <>
      <path d="M2 10L9 4L16 10" />
      <path d="M5 9V15H13V9" />
    </>
  ),
  entrance: (
    <>
      <rect x="4" y="2" width="10" height="14" rx="1" />
      <circle cx="11" cy="9.5" r="0.8" />
    </>
  ),
  basement: <path d="M2 5H6V9H10V13H16" />,
  garage: (
    <>
      <path d="M2 7L9 3L16 7V15H2Z" />
      <path d="M5 15V9H13V15M5 11.5H13" />
    </>
  ),
};

export interface MiniMapItem {
  id: LevelId;
  label: string;
  text?: string;
}

export function MiniMapNav({
  label,
  items,
  garageLabel,
}: {
  label: string;
  items: MiniMapItem[];
  garageLabel: string;
}) {
  const [current, setCurrent] = useState<LevelId>(LANDING_LEVEL);

  useEffect(() => onLevelChange(setCurrent), []);

  return (
    <nav className={styles.minimap} aria-label={label} data-minimap>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={styles.item}
          aria-label={item.label}
          aria-current={item.id === current ? 'true' : undefined}
          onClick={() => requestLevel(item.id)}
        >
          {item.text ?? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <g stroke="currentColor" strokeWidth="1.6">
                {ICONS[item.id]}
              </g>
            </svg>
          )}
        </button>
      ))}

      <span className={styles.divider} />

      <button type="button" className={styles.item} aria-label={garageLabel}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <g stroke="currentColor" strokeWidth="1.6">
            {ICONS.garage}
          </g>
        </svg>
      </button>
    </nav>
  );
}
