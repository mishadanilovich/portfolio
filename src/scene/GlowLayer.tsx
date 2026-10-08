import { HOUSE } from './layout';
import styles from './scene.module.css';
import { left, size, top } from './units';

export function GlowLayer() {
  return (
    <div className={styles.layer}>
      {HOUSE.floors
        .map((floor) => floor.projectWindow.glow)
        .map((glow) => (
          <div
            key={`${glow.x}-${glow.y}`}
            className={styles.glow}
            style={{
              left: left(glow.x),
              top: top(glow.y),
              width: size(glow.width),
              height: size(glow.height),
            }}
          />
        ))}
    </div>
  );
}
