'use client';

import Link from 'next/link';
import {
  useEffect,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import { requestIntercom } from '@/intercom/events';
import { isPlainClick } from '@/lib/click';
import { useFocusTarget, type FocusTarget } from './FocusController';
import { CARD_WIDTH, HOUSE, PLAQUE, type LevelId } from './layout';
import { onFlyOutRequest, requestFlyIn, requestLevel } from './camera-events';
import styles from './scene.module.css';
import { left, size, top } from './units';

export interface FloorTarget {
  floor: number;
  level: LevelId;
  label: string;
  href: string;
  card: { kicker: string; title: string; role: string; action: string };
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

  const ring = () => {
    if (focused !== 'door') {
      setHovered('door');
      requestLevel('entrance');
      return;
    }

    requestIntercom();
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
            data-floor={target.floor}
            data-state="idle"
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
          >
            <span
              className={styles.card}
              aria-hidden="true"
              style={
                {
                  '--card-gap': size(PLAQUE.gap),
                  width: size(CARD_WIDTH),
                } as CSSProperties
              }
            >
              <span className={styles['card-kicker']}>{target.card.kicker}</span>
              <span className={styles['card-title']}>{target.card.title}</span>
              <span className={styles['card-role']}>{target.card.role}</span>
              <span className={styles['card-action']}>{target.card.action}</span>
            </span>
          </Link>
        );
      })}

      <button
        type="button"
        className={styles.object}
        aria-label={doorLabel}
        onClick={ring}
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
