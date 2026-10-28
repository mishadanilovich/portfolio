import type { Floor, Locale, Ui } from '@/content';
import { ACHIEVEMENTS_TITLE_ID, APARTMENT_TITLE_ID, isSolo, neighbours } from './apartment';
import { Poster } from './Poster';
import { RoomBar } from './RoomBar';
import { SceneCover } from '@/components/SceneCover';
import { Shelves } from '@/components/Shelves';
import { Whiteboard } from './Whiteboard';
import styles from './room.module.css';

function Lamp() {
  return (
    <svg
      className={styles.lamp}
      width="120"
      height="80"
      viewBox="0 0 120 80"
      fill="none"
      aria-hidden="true"
    >
      <ellipse cx="60" cy="70" rx="60" ry="14" fill="var(--color-lamp-text)" fillOpacity="0.22" />
      <line x1="60" y1="0" x2="60" y2="22" stroke="var(--color-silhouette)" strokeWidth="1.5" />
      <path d="M44 40Q44 24 60 22Q76 24 76 40Z" fill="var(--color-dusk)" />
      <ellipse cx="60" cy="40" rx="16" ry="3" fill="var(--color-dark)" />
      <ellipse cx="60" cy="41" rx="6" ry="2.5" fill="var(--color-lamp-bright)" />
    </svg>
  );
}

function Plant() {
  return (
    <svg
      className={styles.plant}
      width="70"
      height="110"
      viewBox="0 0 70 110"
      fill="none"
      aria-hidden="true"
    >
      <path d="M20 110L16 76H54L50 110Z" fill="var(--color-slab)" />
      <path
        d="M35 76C29 52 18 46 6 42C20 40 30 50 33 60C33 40 41 24 58 18C46 32 39 50 38 76Z"
        fill="#4e6b4e"
      />
    </svg>
  );
}

export function Room({
  locale,
  floors,
  floor,
  room,
  scene,
}: {
  locale: Locale;
  floors: Floor[];
  floor: Floor;
  room: Ui['room'];
  scene: Ui['scene'];
}) {
  const { below, above } = neighbours(floors, floor.floor);
  const solo = isSolo(floor);

  return (
    <SceneCover id={String(floor.floor)} className={styles.room} labelledBy={APARTMENT_TITLE_ID}>
      <RoomBar
        locale={locale}
        floor={floor}
        below={below}
        above={above}
        room={room}
        scene={scene}
      />

      <div className={styles.wall}>
        <div className={styles.cornice} />

        <div className={styles.stage}>
          <div className={styles.band} data-solo={solo ? '' : undefined}>
            <Lamp />
            <Poster floor={floor} room={room} />

            {!solo && (
              <div className={styles.column}>
                <Shelves
                  title={room.achievements}
                  titleId={ACHIEVEMENTS_TITLE_ID}
                  items={floor.achievements}
                />
                <Whiteboard title={room.responsibilities} items={floor.responsibilities} />
              </div>
            )}
          </div>
        </div>

        <div className={styles.parquet}>
          <Plant />
        </div>
      </div>
    </SceneCover>
  );
}
