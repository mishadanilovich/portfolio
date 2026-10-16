import type { Floor, Locale, Ui } from '@/content';
import { Achievements } from './Achievements';
import { APARTMENT_TITLE_ID, isSolo, neighbours } from './apartment';
import { Poster } from './Poster';
import { RoomBar } from './RoomBar';
import { SceneCover } from '@/components/SceneCover';
import { RoomWindow } from './RoomWindow';
import { Whiteboard } from './Whiteboard';
import styles from './room.module.css';

function Lamp() {
  return (
    <svg
      className={styles.lamp}
      width="80"
      height="96"
      viewBox="0 0 80 96"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="40" cy="62" r="40" fill="var(--color-lamp-text)" fillOpacity="0.35" />
      <line x1="40" y1="0" x2="40" y2="44" stroke="var(--color-silhouette)" strokeWidth="1.5" />
      <path d="M24 60L30 44H50L56 60Z" fill="var(--color-dusk)" />
      <ellipse cx="40" cy="61" rx="7" ry="3" fill="var(--color-lamp-bright)" />
    </svg>
  );
}

function Plant() {
  return (
    <svg
      className={styles.plant}
      width="120"
      height="150"
      viewBox="0 0 120 150"
      fill="none"
      aria-hidden="true"
    >
      <path d="M34 150L28 96H92L86 150Z" fill="var(--color-slab)" />
      <path
        d="M60 96C50 60 30 50 12 44C34 40 52 56 58 74C58 44 70 18 98 8C80 30 68 56 64 96Z"
        fill="#4e6b4e"
      />
      <path d="M62 96C70 70 86 62 108 60C92 70 76 82 70 96Z" fill="#3f5a40" />
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
        <div className={`${styles.band} ${solo ? styles['band-solo'] : ''}`}>
          <Lamp />

          {solo ? (
            <div className={`${styles.row} ${styles['row-solo']}`}>
              <Poster floor={floor} room={room} />
              <RoomWindow label={room.windowAria} />
            </div>
          ) : (
            <>
              <div className={styles.row}>
                <Poster floor={floor} room={room} />
                <Whiteboard title={room.responsibilities} items={floor.responsibilities} />
              </div>

              <div className={`${styles.row} ${styles['row-bottom']}`}>
                <Achievements title={room.achievements} items={floor.achievements} />
                <RoomWindow label={room.windowAria} />
              </div>
            </>
          )}
        </div>
      </div>

      <div className={styles.parquet}>
        <div className={styles['parquet-band']}>
          <Plant />
        </div>
      </div>
    </SceneCover>
  );
}
