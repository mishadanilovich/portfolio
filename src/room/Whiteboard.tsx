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

      <ul className={styles.duties}>
        {items.map((item) => (
          <li key={item} className={styles.duty}>
            <svg
              className={styles.tick}
              width="20"
              height="20"
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
            {item}
          </li>
        ))}
      </ul>

      <div className={styles.tray} aria-hidden="true">
        <span className={`${styles.marker} ${styles['marker-blue']}`} />
        <span className={`${styles.marker} ${styles['marker-copper']}`} />
        <span className={`${styles.marker} ${styles['marker-dark']}`} />
      </div>
    </section>
  );
}
