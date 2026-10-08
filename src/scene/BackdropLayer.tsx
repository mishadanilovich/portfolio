import { SCENE_VIEW_BOX } from './layout';
import styles from './scene.module.css';

const BUILDINGS = [
  { x: -10, y: 640, width: 46, height: 120 },
  { x: 30, y: 656, width: 40, height: 104 },
  { x: 600, y: 600, width: 70, height: 160 },
  { x: 664, y: 650, width: 96, height: 110 },
  { x: 752, y: 620, width: 60, height: 140 },
];

const LIT_WINDOWS = [
  { x: 4, y: 660 },
  { x: 44, y: 676 },
  { x: 616, y: 624 },
  { x: 690, y: 672 },
  { x: 770, y: 646 },
];

export function BackdropLayer() {
  return (
    <div className={styles.layer}>
      <svg className={styles.layer} viewBox={SCENE_VIEW_BOX} aria-hidden="true">
        <g fill="var(--color-neighbours)">
          {BUILDINGS.map((building) => (
            <rect key={`${building.x}-${building.y}`} {...building} />
          ))}
        </g>
        <g fill="#e9b25e" fillOpacity="0.55">
          {LIT_WINDOWS.map((window) => (
            <rect key={`${window.x}-${window.y}`} {...window} width="5" height="7" />
          ))}
        </g>
      </svg>
    </div>
  );
}
