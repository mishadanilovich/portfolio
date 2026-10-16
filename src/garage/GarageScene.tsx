import styles from './garage.module.css';

function Fridge() {
  return (
    <g data-object="fridgemind">
      <rect x="120" y="270" width="180" height="330" rx="10" fill="var(--color-border)" />
      <path d="M120 380H300" stroke="#a9a194" strokeWidth="2" />
      <rect x="278" y="298" width="6" height="50" rx="2" fill="#6b6252" />
      <rect x="278" y="400" width="6" height="90" rx="2" fill="#6b6252" />
      <rect x="150" y="300" width="18" height="13" fill="var(--color-curtain)" />
      <circle cx="204" cy="312" r="8" fill="var(--color-marker)" />

      <g transform="rotate(-4 186 450)">
        <rect x="156" y="414" width="58" height="68" fill="var(--color-matte)" />
        <rect x="162" y="420" width="46" height="44" fill="#8fb0b8" />
        <rect x="170" y="440" width="12" height="20" fill="#e9b25e" />
        <rect x="186" y="448" width="14" height="12" fill="var(--color-border)" />
      </g>

      <rect x="228" y="430" width="40" height="56" fill="var(--color-matte)" />
      <path
        d="M234 444H262M234 454H262M234 464H256M234 474H260"
        stroke="var(--color-window-life)"
      />
    </g>
  );
}

function Workbench() {
  return (
    <g data-object="coffee-shop">
      <rect x="500" y="470" width="380" height="20" fill="#6b5440" />
      <rect x="500" y="470" width="380" height="4" fill="#85694f" />
      <rect x="520" y="490" width="12" height="110" fill="#5c4632" />
      <rect x="848" y="490" width="12" height="110" fill="#5c4632" />
      <rect x="640" y="490" width="160" height="56" fill="#5c4632" />
      <rect x="704" y="512" width="32" height="5" rx="2" fill="#2e2620" />

      <rect x="575" y="330" width="80" height="24" rx="3" fill="#3e342c" />
      <rect x="560" y="350" width="110" height="120" rx="6" fill="#2e2620" />
      <rect
        x="580"
        y="368"
        width="40"
        height="14"
        rx="2"
        fill="var(--color-lamp)"
        fillOpacity="0.85"
      />
      <rect x="603" y="404" width="24" height="12" fill="#1f1a16" />
      <rect x="602" y="436" width="26" height="24" rx="2" fill="var(--color-text-on-dark)" />
      <rect x="580" y="460" width="70" height="8" fill="#1f1a16" />

      <rect x="700" y="390" width="56" height="80" rx="3" fill="var(--color-shelf)" />
      <rect x="708" y="414" width="40" height="30" fill="var(--color-text-on-dark)" />
      <ellipse cx="728" cy="429" rx="8" ry="11" fill="var(--color-frame-wood)" />
      <path d="M780 440H814V462Q797 474 780 462Z" fill="var(--color-text-on-dark)" />
      <path
        d="M814 446Q824 448 822 456Q820 462 812 460"
        fill="none"
        stroke="var(--color-text-on-dark)"
        strokeWidth="3"
      />
      <path
        d="M790 432Q786 424 790 416Q794 408 790 400M802 432Q798 424 802 416"
        fill="none"
        stroke="var(--color-text-on-dark)"
        strokeOpacity="0.55"
        strokeWidth="2"
      />
    </g>
  );
}

export function GarageScene({ label }: { label: string }) {
  return (
    <svg
      className={styles.scene}
      width="960"
      height="768"
      viewBox="0 0 960 768"
      preserveAspectRatio="xMidYMax slice"
      role="img"
      aria-label={label}
    >
      <defs>
        <radialGradient id="garage-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="var(--color-lamp-text)" stopOpacity="0.45" />
          <stop offset="1" stopColor="var(--color-lamp-text)" stopOpacity="0" />
        </radialGradient>
        <pattern id="garage-peg" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="8" r="1.6" fill="#6b6252" />
        </pattern>
      </defs>

      <rect width="960" height="768" fill="#4a4950" />
      <path
        d="M160 64V600M320 64V600M480 64V600M640 64V600M800 64V600"
        stroke="#54535a"
        strokeWidth="2"
      />
      <circle cx="480" cy="300" r="440" fill="url(#garage-glow)" />

      <rect x="0" y="0" width="960" height="64" fill="#6e7385" />
      <path d="M0 16H960M0 32H960M0 48H960" stroke="#5a5f70" strokeWidth="2" />
      <rect x="0" y="58" width="960" height="8" fill="#3e4354" />

      <line x1="480" y1="66" x2="480" y2="128" stroke="#2e2620" strokeWidth="2" />
      <path d="M456 150L466 128H494L504 150Z" fill="#2e2620" />
      <ellipse cx="480" cy="151" rx="12" ry="4" fill="var(--color-lamp-bright)" />

      <rect x="560" y="140" width="320" height="180" fill="var(--color-window-life)" />
      <rect x="560" y="140" width="320" height="180" fill="url(#garage-peg)" />
      <g fill="#3b3730">
        <rect x="600" y="170" width="10" height="90" rx="3" />
        <rect x="588" y="166" width="34" height="16" rx="3" />
        <path d="M660 170H672V230L680 250H652L660 230Z" />
        <rect x="720" y="168" width="8" height="110" rx="3" />
        <circle cx="724" cy="168" r="10" />
        <path d="M780 170L840 170L840 200L790 200Z" />
        <rect x="776" y="166" width="12" height="40" rx="3" />
      </g>

      <rect x="0" y="600" width="960" height="168" fill="#34343a" />
      <rect x="0" y="600" width="960" height="4" fill="#2a2a30" />
      <ellipse cx="210" cy="601" rx="104" ry="5" fill="#000000" fillOpacity="0.3" />
      <ellipse cx="690" cy="601" rx="190" ry="4" fill="#000000" fillOpacity="0.22" />

      <Fridge />
      <Workbench />
    </svg>
  );
}
