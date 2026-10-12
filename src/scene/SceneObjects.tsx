'use client';

import { HOUSE, type LevelId } from './layout';
import { requestLevel } from './camera-events';
import styles from './scene.module.css';
import { left, size, top } from './units';

export interface FloorTarget {
  floor: number;
  level: LevelId;
  label: string;
}

export function SceneObjects({
  floors,
  doorLabel,
  garageLabel,
}: {
  floors: FloorTarget[];
  doorLabel: string;
  garageLabel: string;
}) {
  const { entrance, garage } = HOUSE;

  return (
    <div className={styles.layer}>
      {floors.map((target) => {
        const geometry = HOUSE.floors.find((floor) => floor.floor === target.floor);
        if (geometry === undefined) return null;

        return (
          <button
            key={target.floor}
            type="button"
            className={styles.object}
            aria-label={target.label}
            onClick={() => requestLevel(target.level)}
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
        style={{
          left: left(entrance.hitArea.x),
          top: top(entrance.hitArea.y),
          width: size(entrance.hitArea.width),
          height: size(entrance.hitArea.height),
        }}
      />

      <button
        type="button"
        className={styles.object}
        aria-label={garageLabel}
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
