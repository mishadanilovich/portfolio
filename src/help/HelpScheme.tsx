import styles from './help.module.css';

const WINDOW_COLUMNS = [134, 168, 202, 236];

const WINDOW_ROWS = [
  { y: 82, lit: 236 },
  { y: 127, lit: 134 },
  { y: 172, lit: 202 },
  { y: 217, lit: 168 },
  { y: 262, lit: 236 },
];

const MINIMAP_DOTS = [124, 146, 168, 190, 212, 234, 256, 278, 302];

const PINS = [
  { n: '1', x: 195, y: 46 },
  { n: '2', x: 100, y: 182 },
  { n: '3', x: 100, y: 364 },
  { n: '4', x: 292, y: 318 },
  { n: '5', x: 70, y: 274 },
  { n: '6', x: 326, y: 92 },
];

export function HelpScheme({ label }: { label: string }) {
  return (
    <svg
      className={styles.scheme}
      width="350"
      height="420"
      viewBox="0 0 350 420"
      role="img"
      aria-label={label}
    >
      <rect width="350" height="420" rx="6" fill="#e6e0d4" />
      <rect x="0" y="340" width="350" height="80" fill="#d3ccbe" />
      <line x1="0" y1="340" x2="350" y2="340" stroke="var(--color-dark)" strokeWidth="1.2" />

      <rect x="112" y="62" width="166" height="8" fill="var(--color-slab)" />
      <rect x="232" y="38" width="10" height="24" fill="var(--color-slab)" />
      <rect
        x="120"
        y="70"
        width="150"
        height="270"
        fill="var(--color-paper)"
        stroke="var(--color-dark)"
        strokeWidth="1"
      />
      <rect
        x="120"
        y="160"
        width="150"
        height="45"
        fill="var(--color-lamp-text)"
        fillOpacity="0.3"
        stroke="var(--color-hover-outline)"
        strokeWidth="1.5"
      />
      <path
        d="M120 115H270M120 160H270M120 205H270M120 250H270M120 295H270"
        stroke="var(--color-dark)"
        strokeWidth="0.8"
      />

      {WINDOW_ROWS.map((row) =>
        WINDOW_COLUMNS.map((x) => (
          <rect
            key={`${row.y}-${x}`}
            x={x}
            y={row.y}
            width="16"
            height="20"
            fill={x === row.lit ? 'var(--color-lamp)' : '#c9c3b6'}
          />
        )),
      )}

      <rect x="120.5" y="295.5" width="149" height="44" fill="#cfc6b6" />
      <rect x="128" y="304" width="34" height="26" fill="#8a97a3" />
      <rect x="228" y="304" width="34" height="26" fill="#8a97a3" />
      <rect x="182" y="300" width="26" height="4" fill="var(--color-dusk)" />
      <rect x="186" y="306" width="18" height="34" fill="#5a4636" />
      <line x1="195" y1="306" x2="195" y2="340" stroke="#3e3024" />
      <rect x="210" y="314" width="5" height="8" fill="var(--color-dark)" />
      <path d="M215 318H280" stroke="var(--color-dark)" strokeWidth="1" />

      <rect
        x="120"
        y="340"
        width="150"
        height="48"
        fill="#c9c1b3"
        stroke="var(--color-dark)"
        strokeWidth="1"
      />

      <rect
        x="30"
        y="292"
        width="80"
        height="48"
        fill="var(--color-paper)"
        stroke="var(--color-dark)"
        strokeWidth="1"
      />
      <rect x="42" y="306" width="56" height="34" fill="#8a8fa0" />
      <rect x="42" y="332" width="56" height="8" fill="var(--color-lamp)" />

      <rect x="316" y="110" width="20" height="210" rx="10" fill="var(--color-dusk)" />
      <g fill="var(--color-text-on-dark-muted)">
        {MINIMAP_DOTS.map((cy) => (
          <circle key={cy} cx="326" cy={cy} r="2.5" />
        ))}
      </g>
      <circle cx="326" cy="190" r="4.5" fill="var(--color-lamp)" />

      <g className={styles.pins} textAnchor="middle">
        {PINS.map((pin) => (
          <g key={pin.n}>
            <circle cx={pin.x} cy={pin.y} r="12" fill="var(--color-dark)" />
            <text x={pin.x} y={pin.y + 4.5} fill="var(--color-paper)">
              {pin.n}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
