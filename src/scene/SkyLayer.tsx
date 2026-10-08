import { SCENE_VIEW_BOX } from './layout';
import styles from './scene.module.css';

const STARS = [
  { x: 613.333, y: 353.333, r: 1.2 },
  { x: 666.667, y: 406.667, r: 1 },
  { x: -73.333, y: 344, r: 1 },
  { x: 106.667, y: 366.667, r: 1.2 },
  { x: -133.333, y: 433.333, r: 1 },
  { x: 760, y: 360, r: 1 },
];

const DUSK_CLOUDS = [
  { x: 26.667, y: 480, rx: 80, ry: 9.333 },
  { x: 666.667, y: 560, rx: 73.333, ry: 8 },
];

const DAY_CLOUDS = [
  { x: 293.333, y: -158.667, rx: 73.333, ry: 13.333 },
  { x: 320, y: -170.667, rx: 37.333, ry: 14.667 },
  { x: 613.333, y: -38.667, rx: 60, ry: 9.333 },
  { x: 630.667, y: -46.667, rx: 26.667, ry: 9.333 },
  { x: 200, y: -58.667, rx: 46.667, ry: 7.333 },
];

export function SkyLayer() {
  return (
    <div className={styles.layer}>
      <div className={`${styles.layer} ${styles.wide} ${styles.dusk}`} />

      <svg className={styles.layer} viewBox={SCENE_VIEW_BOX} aria-hidden="true">
        <g fill="var(--color-white)">
          {STARS.map((star) => (
            <circle key={`${star.x}-${star.y}`} cx={star.x} cy={star.y} r={star.r} />
          ))}
        </g>
        <path
          d="M712 354.667A14.667 14.667 0 1 0 728 380A11.333 11.333 0 1 1 712 354.667Z"
          fill="#e9e2cf"
        />
        <g fill="var(--color-white)" fillOpacity="0.12">
          {DUSK_CLOUDS.map((cloud) => (
            <ellipse
              key={`${cloud.x}-${cloud.y}`}
              cx={cloud.x}
              cy={cloud.y}
              rx={cloud.rx}
              ry={cloud.ry}
            />
          ))}
        </g>
      </svg>

      <div className={`${styles.layer} ${styles['day-group']}`}>
        <div className={`${styles.layer} ${styles.wide} ${styles.day}`} />

        <svg className={styles.layer} viewBox={SCENE_VIEW_BOX} aria-hidden="true">
          <circle cx="660" cy="-145.333" r="29.333" fill="#f7f1e1" />
          <circle cx="660" cy="-145.333" r="60" fill="var(--color-white)" fillOpacity="0.18" />
          <g fill="var(--color-white)" fillOpacity="0.9">
            {DAY_CLOUDS.map((cloud) => (
              <ellipse
                key={`${cloud.x}-${cloud.y}`}
                cx={cloud.x}
                cy={cloud.y}
                rx={cloud.rx}
                ry={cloud.ry}
              />
            ))}
          </g>
          <g fill="none" stroke="#5a6378" strokeWidth="1.067" strokeLinecap="round">
            <path d="M413.333 -98.667Q417.333 -102.667 421.333 -98.667Q425.333 -102.667 429.333 -98.667" />
            <path d="M438.667 -84Q441.333 -86.667 444 -84Q446.667 -86.667 449.333 -84" />
          </g>
        </svg>
      </div>
    </div>
  );
}
