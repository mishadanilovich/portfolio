export function SceneDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <radialGradient id="scene-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="var(--color-lamp-text)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--color-lamp-text)" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="scene-room" cx="0.5" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#fbda96" />
          <stop offset="1" stopColor="#efa94e" />
        </radialGradient>

        <symbol id="scene-window-cold" viewBox="0 0 48 56">
          <rect width="48" height="56" fill="var(--color-window-glass)" />
          <path d="M4 40L30 4H40L10 48Z" fill="var(--color-white)" fillOpacity="0.07" />
          <path d="M24 0V56M0 22H48" stroke="var(--color-facade)" strokeWidth="2" />
        </symbol>

        <symbol id="scene-window-blinds" viewBox="0 0 48 56">
          <rect width="48" height="56" fill="var(--color-window-life)" />
          <path d="M0 4H48M0 8H48M0 12H48M0 16H48" stroke="#6b6252" strokeWidth="1.5" />
          <path d="M31 56V48H41V56Z" fill="#3b3730" />
          <path
            d="M36 48C33 41 30 40 27 39C31 38 34 42 36 45C37 40 40 38 45 38C41 41 38 44 36 48Z"
            fill="#3b3730"
          />
          <path d="M24 0V56M0 22H48" stroke="var(--color-facade)" strokeWidth="2" />
        </symbol>

        <symbol id="scene-window-project" viewBox="0 0 48 56">
          <rect width="48" height="56" fill="url(#scene-room)" />
          <path d="M0 0H15Q10 26 17 56H0Z" fill="var(--color-curtain)" fillOpacity="0.75" />
          <path d="M48 0H33Q38 26 31 56H48Z" fill="var(--color-curtain)" fillOpacity="0.75" />
          <circle cx="24" cy="31" r="5" fill="var(--color-silhouette)" />
          <path d="M14 56Q15 41 24 40Q33 41 34 56Z" fill="var(--color-silhouette)" />
          <rect
            x="1"
            y="1"
            width="46"
            height="54"
            fill="none"
            stroke="var(--color-facade)"
            strokeWidth="2"
          />
        </symbol>
      </defs>
    </svg>
  );
}
