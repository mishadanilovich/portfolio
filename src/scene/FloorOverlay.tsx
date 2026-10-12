import { HOUSE, SCENE_VIEW_BOX } from './layout';
import styles from './scene.module.css';

export function FloorOverlay() {
  return (
    <div className={styles.layer}>
      <svg className={styles.layer} viewBox={SCENE_VIEW_BOX} aria-hidden="true">
        {HOUSE.floors.map((floor) => (
          <g key={floor.floor} data-floor={floor.floor}>
            <use
              className={styles.hot}
              href="#scene-window-hot"
              x={floor.projectWindow.rect.x}
              y={floor.projectWindow.rect.y}
              width={floor.projectWindow.rect.width}
              height={floor.projectWindow.rect.height}
            />
            <rect className={styles.fill} {...floor.rect} fill="var(--color-lamp-text)" />
            <rect
              className={styles.outline}
              x={floor.rect.x + 0.75}
              y={floor.rect.y + 0.75}
              width={floor.rect.width - 1.5}
              height={floor.rect.height - 1.5}
              fill="none"
              stroke="var(--color-lamp-text)"
              strokeWidth="1.5"
            />
            <rect className={styles.dim} {...floor.rect} fill="#1f2430" />
          </g>
        ))}
      </svg>
    </div>
  );
}
