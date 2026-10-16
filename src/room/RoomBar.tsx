import Link from 'next/link';
import { fill, type Floor, type Locale, type Ui } from '@/content';
import { SceneBar } from '@/components/SceneBar';
import { apartmentPath } from './apartment';
import styles from './room.module.css';

function Arrow({ up = false }: { up?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d={up ? 'M9 15V3M4 8L9 3L14 8' : 'M9 3V15M14 10L9 15L4 10'}
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function RoomBar({
  locale,
  floor,
  below,
  above,
  room,
  scene,
}: {
  locale: Locale;
  floor: Floor;
  below: Floor | null;
  above: Floor | null;
  room: Ui['room'];
  scene: Ui['scene'];
}) {
  return (
    <SceneBar
      locale={locale}
      target={floor.floor}
      exit={scene.exitHouse}
      kicker={fill(room.floor, { floor: floor.floor })}
      title={floor.title}
      sticky
    >
      <div className={styles['bar-moves']}>
        {below !== null && (
          <Link className={styles['bar-move']} href={apartmentPath(locale, below.floor)}>
            <Arrow />
            {fill(room.floor, { floor: below.floor })}
          </Link>
        )}

        {above !== null && (
          <Link className={styles['bar-move']} href={apartmentPath(locale, above.floor)}>
            {fill(room.floor, { floor: above.floor })}
            <Arrow up />
          </Link>
        )}
      </div>
    </SceneBar>
  );
}
