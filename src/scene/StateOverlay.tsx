import { HOUSE, SCENE_VIEW_BOX } from './layout';
import styles from './scene.module.css';

function Floors() {
  return HOUSE.floors.map((floor) => (
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
  ));
}

function Door() {
  const { button } = HOUSE.entrance.intercom;

  return (
    <g data-object="door">
      <circle className={styles.spill} cx="397" cy="728" r="48" fill="url(#scene-halo)" />
      <rect
        className={styles.spill}
        x="346"
        y="690"
        width="68"
        height="10"
        fill="var(--color-lamp-bright)"
      />
      <rect className={styles.spill} x="336" y="757" width="88" height="3" fill="#e8cc90" />

      <g className={styles.leaf}>
        <rect x="381" y="702" width="33" height="58" fill="#fbda96" />
        <path d="M386 760V750H396V740H406V730H414" fill="none" stroke="#e0b368" strokeWidth="1.5" />
        <path d="M414 702L403 706V756L414 760Z" fill="#4a3a2c" />
      </g>
      <circle
        className={styles.ring}
        cx={button.center.x}
        cy={button.center.y}
        r="4.5"
        fill="none"
        stroke="var(--color-lamp-text)"
        strokeWidth="1"
      />
    </g>
  );
}

function Basement() {
  return (
    <g>
      <circle
        className={styles['basement-lamp']}
        cx="380"
        cy="806"
        r="46"
        fill="url(#scene-halo)"
      />

      <g className={styles['basement-diploma']}>
        <rect x="360" y="794" width="40" height="22" rx="1" fill="#2e4a6e" />
        <rect x="362" y="796" width="17" height="18" fill="var(--color-matte)" />
        <rect x="381" y="796" width="17" height="18" fill="#f6f0e2" />
        <path d="M380 794V816" stroke="#24395a" strokeWidth="1" />
        <path d="M365 800H375M365 804H375M365 808H373" stroke="#9aa0ac" strokeWidth="0.8" />
        <circle cx="389" cy="805" r="2.5" fill="none" stroke="#9c8458" strokeWidth="0.8" />
      </g>
    </g>
  );
}

export function StateOverlay() {
  return (
    <div className={styles.layer}>
      <svg className={styles.layer} viewBox={SCENE_VIEW_BOX} aria-hidden="true">
        <Floors />
        <Door />
        <Basement />
      </svg>
    </div>
  );
}
