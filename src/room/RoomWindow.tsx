import styles from './room.module.css';

export function RoomWindow({ label }: { label: string }) {
  return (
    <svg
      className={styles.window}
      width="260"
      height="580"
      viewBox="0 0 260 580"
      role="img"
      aria-label={label}
    >
      <defs>
        <linearGradient id="room-window-day" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9d6dd" />
          <stop offset="1" stopColor="var(--color-sky-top-end)" />
        </linearGradient>
      </defs>

      <rect x="10" y="20" width="240" height="500" fill="var(--color-facade)" />
      <rect x="24" y="34" width="212" height="472" fill="url(#room-window-day)" />

      <g fill="var(--color-white)" fillOpacity="0.85">
        <ellipse cx="90" cy="110" rx="44" ry="10" />
        <ellipse cx="108" cy="101" rx="22" ry="9" />
        <ellipse cx="190" cy="200" rx="34" ry="8" />
      </g>

      <g fill="#9aa5b4">
        <rect x="24" y="430" width="40" height="76" />
        <rect x="60" y="446" width="52" height="60" />
        <rect x="150" y="420" width="44" height="86" />
        <rect x="190" y="452" width="46" height="54" />
      </g>

      <path d="M130 34V506M24 270H236" stroke="var(--color-facade)" strokeWidth="6" />
      <rect x="0" y="12" width="260" height="10" rx="2" fill="var(--color-frame-wood)" />
      <path d="M6 22H62Q50 220 70 300Q46 320 40 520H6Z" fill="var(--color-curtain)" />
      <path d="M254 22H198Q210 220 190 300Q214 320 220 520H254Z" fill="var(--color-curtain)" />
      <path d="M6 22H24Q20 220 36 300Q24 320 22 520H6Z" fill="#000000" fillOpacity="0.1" />
      <rect x="0" y="520" width="260" height="14" fill="var(--color-slab)" />
      <rect x="150" y="490" width="34" height="30" fill="var(--color-shelf)" />
      <path
        d="M167 490C160 470 150 466 144 464C154 462 162 470 166 478C167 466 174 458 186 456C178 464 172 474 167 490Z"
        fill="#4e6b4e"
      />
    </svg>
  );
}
