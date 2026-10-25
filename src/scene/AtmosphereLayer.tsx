import { HOUSE } from './layout';
import styles from './scene.module.css';
import { spot } from './units';

const RING_STROKE = 1.2;

export function AtmosphereLayer() {
  const { center, radius } = HOUSE.entrance.intercom.button;
  const ring = spot(center.x, center.y, radius + RING_STROKE / 2);

  return (
    <div className={styles.layer}>
      <div className={styles.pulse} style={ring} />
      <div className={`${styles.pulse} ${styles['pulse-delayed']}`} style={ring} />
      <div className={styles.led} style={spot(center.x, center.y, 2)} />
    </div>
  );
}
