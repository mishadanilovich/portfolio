import { control } from '@/styles/controls';
import styles from './room.module.css';

const TITLE_ID = 'apartment-duties';

export function Whiteboard({ title, items }: { title: string; items: string[] }) {
  return (
    <section className={styles.board} aria-labelledby={TITLE_ID}>
      <span className={`${styles.magnet} ${styles['magnet-copper']}`} />
      <span className={`${styles.magnet} ${styles['magnet-blue']}`} />

      <h2 id={TITLE_ID} className={styles['board-title']}>
        {title}
      </h2>

      <div
        className={`${styles['duties-scroll']} ${control('ring-paper')}`}
        role="group"
        tabIndex={0}
      >
        <ul className={styles.duties}>
          {items.map((item) => (
            <li key={item} className={styles.duty}>
              <svg
                className={styles.tick}
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 10.5L8 15L17 4"
                  stroke="var(--color-marker)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
