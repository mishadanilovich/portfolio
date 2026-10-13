import Link from 'next/link';
import type { Floor, Locale, Ui } from '@/content';
import { apartmentPath } from './apartment';
import { HouseLink } from './HouseLink';
import styles from './room.module.css';

function Label({ kicker, title }: { kicker: string; title: string }) {
  return (
    <>
      <span className={styles['nav-kicker']}>{kicker}</span>
      <span className={styles['nav-title']}>{title}</span>
    </>
  );
}

export function RoomNav({
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
    <nav className={styles.nav} aria-label={room.nav}>
      <div className={styles['nav-band']}>
        {below === null ? (
          <span />
        ) : (
          <Link className={styles['nav-link']} href={apartmentPath(locale, below.floor)}>
            <Label kicker={room.below} title={below.title} />
          </Link>
        )}

        <button type="button" className={styles['nav-call']}>
          {room.call}
        </button>

        {above === null ? (
          <HouseLink
            locale={locale}
            floor={floor.floor}
            level="roof"
            className={`${styles['nav-link']} ${styles['nav-link-end']}`}
          >
            <Label kicker={room.above} title={room.roof} />
          </HouseLink>
        ) : (
          <Link
            className={`${styles['nav-link']} ${styles['nav-link-end']}`}
            href={apartmentPath(locale, above.floor)}
          >
            <Label kicker={room.above} title={above.title} />
          </Link>
        )}
      </div>
    </nav>
  );
}
