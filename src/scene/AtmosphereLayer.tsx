import { HOUSE, SCENE_VIEW_BOX } from './layout';
import styles from './scene.module.css';

export function AtmosphereLayer() {
  const { center, radius } = HOUSE.entrance.intercom.button;

  return (
    <div className={styles.layer}>
      <svg className={styles.layer} viewBox={SCENE_VIEW_BOX} aria-hidden="true">
        <circle
          className={styles.pulse}
          cx={center.x}
          cy={center.y}
          r={radius}
          fill="none"
          stroke="var(--color-lamp-text)"
          strokeWidth="1.2"
        />
        <circle
          className={`${styles.pulse} ${styles['pulse-delayed']}`}
          cx={center.x}
          cy={center.y}
          r={radius}
          fill="none"
          stroke="var(--color-lamp-text)"
          strokeWidth="1.2"
        />
        <circle
          className={styles.led}
          cx={center.x}
          cy={center.y}
          r="2"
          fill="var(--color-lamp-bright)"
        />
      </svg>
    </div>
  );
}
