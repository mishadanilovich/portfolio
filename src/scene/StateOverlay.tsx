import { HOUSE, SCENE_VIEW_BOX } from './layout';
import styles from './scene.module.css';
import { left, size, top } from './units';

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
      <rect
        className={styles.spill}
        x="346"
        y="690"
        width="68"
        height="10"
        fill="var(--color-lamp-bright)"
      />
      <g className={styles.leaf}>
        <rect x="346" y="702" width="68" height="55" fill="url(#scene-lobby)" />
        <rect x="346" y="736.79" width="68" height="5.17" fill="#e3a85a" />
        <rect x="346" y="736.32" width="68" height="0.71" fill="#f6cf8c" />
        <rect x="346" y="741.96" width="68" height="15.04" fill="#c98a45" />
        <path
          d="M346 744.78H414M346 748.54H414M346 752.77H414M362.06 741.96L355.44 757M375.28 741.96L372.44 757M388.5 741.96L390.39 757M401.72 741.96L408.33 757"
          stroke="#b57a3a"
          strokeWidth="0.5"
        />
        <path d="M369.61 741.96H390.39L396.06 757H363.94Z" fill="#8c4a2e" fillOpacity="0.85" />
        <path
          d="M371.5 741.96H388.5L393.69 757H366.31Z"
          fill="none"
          stroke="var(--color-curtain)"
          strokeWidth="0.5"
        />
        <path d="M346 741.96H414" stroke="#a86f35" strokeWidth="0.7" />
        <g fill="#d69b52">
          <rect x="365.83" y="737.73" width="48.17" height="4.23" />
          <rect x="370.56" y="733.5" width="43.44" height="4.23" />
          <rect x="375.28" y="729.26" width="38.72" height="4.23" />
          <rect x="380.0" y="725.03" width="34.0" height="4.23" />
          <rect x="384.72" y="720.8" width="29.28" height="4.23" />
          <rect x="389.44" y="716.57" width="24.56" height="4.23" />
          <rect x="394.17" y="712.34" width="19.83" height="4.23" />
        </g>
        <g fill="#f6cf8c">
          <rect x="365.83" y="737.73" width="48.17" height="0.94" />
          <rect x="370.56" y="733.5" width="43.44" height="0.94" />
          <rect x="375.28" y="729.26" width="38.72" height="0.94" />
          <rect x="380.0" y="725.03" width="34.0" height="0.94" />
          <rect x="384.72" y="720.8" width="29.28" height="0.94" />
          <rect x="389.44" y="716.57" width="24.56" height="0.94" />
          <rect x="394.17" y="712.34" width="19.83" height="0.94" />
        </g>
        <path
          d="M365.83 741.96V737.73H370.56V733.5H375.28V729.26H380.0V725.03H384.72V720.8H389.44V716.57H394.17V712.34H398.89"
          fill="none"
          stroke="#b57a3a"
          strokeWidth="0.5"
        />
        <path
          d="M367.72 737.73V728.79M372.44 733.5V724.56M377.17 729.26V720.33M381.89 725.03V716.1M386.61 720.8V711.87M391.33 716.57V707.64"
          stroke="var(--color-frame-wood)"
          strokeWidth="0.4"
        />
        <path
          d="M363.0 732.56L397.94 701.53"
          stroke="var(--color-frame-wood)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <rect x="362.06" y="732.56" width="2.36" height="9.4" fill="var(--color-frame-wood)" />
        <path d="M380 702V708.11" stroke="var(--color-silhouette)" strokeWidth="0.5" />
        <path
          d="M374.33 710.93L376.22 708.11H383.78L385.67 710.93Z"
          fill="var(--color-silhouette)"
        />
        <ellipse cx="380" cy="711.17" rx="3.78" ry="1.1" fill="#fff4d6" />
        <ellipse cx="380" cy="749.48" rx="17.0" ry="1.5" fill="#fff4d6" fillOpacity="0.35" />
        <path d="M346.0 702L362.06 704.82V754.18L346.0 757Z" fill="#6b5440" />
        <path d="M346.0 702L362.06 704.82V754.18L346.0 757Z" fill="#000000" fillOpacity="0.12" />
        <path
          d="M348.83 705.29L359.22 707.41V727.85L348.83 729.26Z"
          fill="var(--color-lamp)"
          fillOpacity="0.55"
        />
        <path
          d="M348.83 705.29L359.22 707.41V727.85L348.83 729.26Z"
          fill="none"
          stroke="var(--color-frame-wood)"
          strokeWidth="1.2"
        />
        <path
          d="M354.03 706.35V728.56M348.83 717.28L359.22 717.63"
          stroke="var(--color-frame-wood)"
          strokeWidth="0.9"
        />
        <path
          d="M348.83 733.03L359.22 733.5V751.36L348.83 752.77Z"
          fill="none"
          stroke="var(--color-frame-wood)"
          strokeWidth="1.2"
        />
        <path d="M362.06 704.82L363.94 705.06V753.94L362.06 754.18Z" fill="#3e3024" />
        <rect x="358.04" y="728.32" width="1.42" height="8.46" rx="0.7" fill="#c9a060" />
        <path d="M414.0 702L397.94 704.82V754.18L414.0 757Z" fill="#6b5440" />
        <path d="M414.0 702L397.94 704.82V754.18L414.0 757Z" fill="#000000" fillOpacity="0.12" />
        <path
          d="M411.17 705.29L400.78 707.41V727.85L411.17 729.26Z"
          fill="var(--color-lamp)"
          fillOpacity="0.55"
        />
        <path
          d="M411.17 705.29L400.78 707.41V727.85L411.17 729.26Z"
          fill="none"
          stroke="var(--color-frame-wood)"
          strokeWidth="1.2"
        />
        <path
          d="M405.97 706.35V728.56M411.17 717.28L400.78 717.63"
          stroke="var(--color-frame-wood)"
          strokeWidth="0.9"
        />
        <path
          d="M411.17 733.03L400.78 733.5V751.36L411.17 752.77Z"
          fill="none"
          stroke="var(--color-frame-wood)"
          strokeWidth="1.2"
        />
        <path d="M397.94 704.82L396.06 705.06V753.94L397.94 754.18Z" fill="#3e3024" />
        <rect x="400.54" y="728.32" width="1.42" height="8.46" rx="0.7" fill="#c9a060" />
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
      <div
        className={styles['door-sill']}
        style={{ left: left(336), top: top(757), width: size(88), height: size(3) }}
      />

      <div
        className={styles['door-spill']}
        style={{ left: left(332), top: top(680), width: size(96), height: size(96) }}
      />

      <svg className={styles.layer} viewBox={SCENE_VIEW_BOX} aria-hidden="true">
        <Floors />
        <Door />
        <Basement />
      </svg>
    </div>
  );
}
