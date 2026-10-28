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
      <g className={styles.leaf}>
        <rect x="346" y="702" width="68" height="53" fill="url(#scene-lobby)" />
        <rect x="346" y="735.52" width="68" height="4.98" fill="#e3a85a" />
        <rect x="346" y="735.07" width="68" height="0.68" fill="#f6cf8c" />
        <rect x="346" y="740.5" width="68" height="14.5" fill="#c98a45" />
        <path
          d="M346 743.22H414M346 746.85H414M346 750.92H414M362.06 740.5L355.44 755M375.28 740.5L372.44 755M388.5 740.5L390.39 755M401.72 740.5L408.33 755"
          stroke="#b57a3a"
          strokeWidth="0.5"
        />
        <path d="M369.61 740.5H390.39L396.06 755H363.94Z" fill="#8c4a2e" fillOpacity="0.85" />
        <path
          d="M371.5 740.5H388.5L393.69 755H366.31Z"
          fill="none"
          stroke="var(--color-curtain)"
          strokeWidth="0.5"
        />
        <path d="M346 740.5H414" stroke="#a86f35" strokeWidth="0.7" />
        <g fill="#d69b52">
          <rect x="365.83" y="736.43" width="48.17" height="4.08" />
          <rect x="370.56" y="732.35" width="43.44" height="4.08" />
          <rect x="375.28" y="728.27" width="38.72" height="4.08" />
          <rect x="380.0" y="724.2" width="34.0" height="4.08" />
          <rect x="384.72" y="720.12" width="29.28" height="4.08" />
          <rect x="389.44" y="716.04" width="24.56" height="4.08" />
          <rect x="394.17" y="711.97" width="19.83" height="4.08" />
        </g>
        <g fill="#f6cf8c">
          <rect x="365.83" y="736.43" width="48.17" height="0.91" />
          <rect x="370.56" y="732.35" width="43.44" height="0.91" />
          <rect x="375.28" y="728.27" width="38.72" height="0.91" />
          <rect x="380.0" y="724.2" width="34.0" height="0.91" />
          <rect x="384.72" y="720.12" width="29.28" height="0.91" />
          <rect x="389.44" y="716.04" width="24.56" height="0.91" />
          <rect x="394.17" y="711.97" width="19.83" height="0.91" />
        </g>
        <path
          d="M365.83 740.5V736.43H370.56V732.35H375.28V728.27H380.0V724.2H384.72V720.12H389.44V716.04H394.17V711.97H398.89"
          fill="none"
          stroke="#b57a3a"
          strokeWidth="0.5"
        />
        <path
          d="M367.72 736.43V727.82M372.44 732.35V723.74M377.17 728.27V719.67M381.89 724.2V715.59M386.61 720.12V711.51M391.33 716.04V707.44"
          stroke="var(--color-frame-wood)"
          strokeWidth="0.4"
        />
        <path
          d="M363.0 731.44L397.94 701.55"
          stroke="var(--color-frame-wood)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <rect x="362.06" y="731.44" width="2.36" height="9.06" fill="var(--color-frame-wood)" />
        <path d="M380 702V707.89" stroke="var(--color-silhouette)" strokeWidth="0.5" />
        <path
          d="M374.33 710.61L376.22 707.89H383.78L385.67 710.61Z"
          fill="var(--color-silhouette)"
        />
        <ellipse cx="380" cy="710.83" rx="3.78" ry="1.1" fill="#fff4d6" />
        <ellipse cx="380" cy="747.75" rx="17.0" ry="1.5" fill="#fff4d6" fillOpacity="0.35" />
        <path d="M346.0 702.0 L362.06 704.72 L362.06 752.29 L346.0 755.0Z" fill="#6b5440" />
        <path
          d="M346.0 702.0 L362.06 704.72 L362.06 752.29 L346.0 755.0Z"
          fill="#000000"
          fillOpacity="0.12"
        />
        <path
          d="M348.13 704.63 L359.93 706.46 L359.93 726.32 L348.13 726.13Z"
          fill="var(--color-lamp)"
          fillOpacity="0.55"
        />
        <path
          d="M348.13 704.63 L359.93 706.46 L359.93 726.32 L348.13 726.13Z"
          fill="none"
          stroke="var(--color-frame-wood)"
          strokeWidth="1"
        />
        <path
          d="M354.03 705.54 L354.03 726.23M348.13 715.38 L359.93 716.39"
          stroke="var(--color-frame-wood)"
          strokeWidth="1"
        />
        <path
          d="M348.13 729.59 L359.93 729.51 L359.93 749.37 L348.13 751.09Z"
          fill="none"
          stroke="var(--color-frame-wood)"
          strokeWidth="1"
        />
        <path
          d="M349.5 732.41 L358.56 732.18 L358.56 746.9 L349.5 748.06Z"
          fill="none"
          stroke="#6b5440"
          strokeWidth="0.6"
        />
        <path d="M362.06 704.72 L363.94 704.94 L363.94 752.06 L362.06 752.29Z" fill="#3e3024" />
        <path d="M360.64 724.61 L361.59 724.63 L361.59 736.07 L360.64 736.12Z" fill="#c9a060" />
        <path d="M414.0 702.0 L397.94 704.72 L397.94 752.29 L414.0 755.0Z" fill="#6b5440" />
        <path
          d="M414.0 702.0 L397.94 704.72 L397.94 752.29 L414.0 755.0Z"
          fill="#000000"
          fillOpacity="0.12"
        />
        <path
          d="M411.87 704.63 L400.07 706.46 L400.07 726.32 L411.87 726.13Z"
          fill="var(--color-lamp)"
          fillOpacity="0.55"
        />
        <path
          d="M411.87 704.63 L400.07 706.46 L400.07 726.32 L411.87 726.13Z"
          fill="none"
          stroke="var(--color-frame-wood)"
          strokeWidth="1"
        />
        <path
          d="M405.97 705.54 L405.97 726.23M411.87 715.38 L400.07 716.39"
          stroke="var(--color-frame-wood)"
          strokeWidth="1"
        />
        <path
          d="M411.87 729.59 L400.07 729.51 L400.07 749.37 L411.87 751.09Z"
          fill="none"
          stroke="var(--color-frame-wood)"
          strokeWidth="1"
        />
        <path
          d="M410.5 732.41 L401.44 732.18 L401.44 746.9 L410.5 748.06Z"
          fill="none"
          stroke="#6b5440"
          strokeWidth="0.6"
        />
        <path d="M397.94 704.72 L396.06 704.94 L396.06 752.06 L397.94 752.29Z" fill="#3e3024" />
        <path d="M399.36 724.61 L398.41 724.63 L398.41 736.07 L399.36 736.12Z" fill="#c9a060" />
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
