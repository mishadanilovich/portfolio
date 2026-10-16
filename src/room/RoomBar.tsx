import Link from 'next/link';
import { fill, type Floor, type Locale, type Ui } from '@/content';
import { apartmentPath } from './apartment';
import { HouseLink } from './HouseLink';
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
}: {
  locale: Locale;
  floor: Floor;
  below: Floor | null;
  above: Floor | null;
  room: Ui['room'];
}) {
  return (
    <div className={styles.bar}>
      <HouseLink locale={locale} floor={floor.floor} className={styles['bar-exit']}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M11 3L5 9L11 15" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        {room.exit}
      </HouseLink>

      <p className={styles['bar-current']}>
        <span className={styles['bar-floor']}>
          {`${fill(room.floor, { floor: floor.floor })} · `}
        </span>
        {floor.title}
      </p>

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
    </div>
  );
}
