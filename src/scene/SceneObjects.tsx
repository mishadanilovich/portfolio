'use client';

import Link from 'next/link';
import { useEffect, useState, type KeyboardEvent, type MouseEvent } from 'react';
import { isPlainClick } from '@/lib/click';
import { useFocusTarget, type FocusTarget } from './FocusController';
import { HOUSE, type LevelId } from './layout';
import { onFlyOutRequest, requestFlyIn, requestLevel } from './camera-events';
import styles from './scene.module.css';
import { left, size, top } from './units';

export interface FloorTarget {
  floor: number;
  level: LevelId;
  label: string;
  href: string;
}

export function SceneObjects({
  floors,
  doorLabel,
  garageLabel,
  garageHref,
}: {
  floors: FloorTarget[];
  doorLabel: string;
  garageLabel: string;
  garageHref: string;
}) {
  const [hovered, setHovered] = useState<FocusTarget | null>(null);
  const focused = useFocusTarget(hovered);

  useEffect(() => onFlyOutRequest(() => setHovered(null)), []);

  const { entrance, garage } = HOUSE;

  const hover = (target: FocusTarget | null) => (event: { pointerType: string }) => {
    if (event.pointerType === 'mouse') setHovered(target);
  };

  const enter = (target: FloorTarget) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isPlainClick(event)) return;

    if (focused !== target.level) {
      event.preventDefault();
      requestLevel(target.level);
      return;
    }

    requestFlyIn(target.floor);
  };

  const enterGarage = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isPlainClick(event)) return;

    if (focused !== 'garage') {
      event.preventDefault();
      setHovered('garage');
      return;
    }

    requestFlyIn('garage');
  };

  const activate = (event: KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key !== ' ' && event.key !== 'Spacebar') return;

    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.click();
  };

  return (
    <div className={styles.layer}>
      {floors.map((target) => {
        const geometry = HOUSE.floors.find((floor) => floor.floor === target.floor);
        if (geometry === undefined) return null;

        return (
          <Link
            key={target.floor}
            href={target.href}
            className={styles.object}
            aria-label={target.label}
            onClick={enter(target)}
            onKeyDown={activate}
            onPointerEnter={hover(target.level)}
            onPointerLeave={hover(null)}
            style={{
              left: left(geometry.rect.x),
              top: top(geometry.rect.y),
              width: size(geometry.rect.width),
              height: size(geometry.rect.height),
            }}
          />
        );
      })}

      <button
        type="button"
        className={styles.object}
        aria-label={doorLabel}
        onPointerEnter={hover('door')}
        onPointerLeave={hover(null)}
        style={{
          left: left(entrance.hitArea.x),
          top: top(entrance.hitArea.y),
          width: size(entrance.hitArea.width),
          height: size(entrance.hitArea.height),
        }}
      />

      <Link
        href={garageHref}
        className={styles.object}
        aria-label={garageLabel}
        onClick={enterGarage}
        onKeyDown={activate}
        onPointerEnter={hover('garage')}
        onPointerLeave={hover(null)}
        style={{
          left: left(garage.hitArea.x),
          top: top(garage.hitArea.y),
          width: size(garage.hitArea.width),
          height: size(garage.hitArea.height),
        }}
      />
    </div>
  );
}
