import { fill, type Floor, type Ui } from '@/content';
import { APARTMENT_TITLE_ID, hasLongWord } from './apartment';
import styles from './room.module.css';

export function Poster({ floor, room }: { floor: Floor; room: Ui['room'] }) {
  return (
    <article className={styles.poster}>
      <p className={styles['poster-label']}>
        {fill(room.kicker, { floor: floor.floor, period: floor.period })}
      </p>

      <h1
        id={APARTMENT_TITLE_ID}
        className={styles['poster-title']}
        data-long={hasLongWord(floor.title) ? '' : undefined}
      >
        {floor.title}
      </h1>

      <p className={styles['poster-role']}>{floor.role}</p>
      <p className={styles['poster-text']}>{floor.description}</p>
      {floor.note !== undefined && <p className={styles['poster-text']}>{floor.note}</p>}

      <div className={styles['poster-divider']} />

      <p className={styles['poster-label']}>{room.stack}</p>
      <ul className={styles.stack}>
        {floor.stack.map((item) => (
          <li key={item} className={styles.sticker}>
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
