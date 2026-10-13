import type { Achievement } from '@/content';
import { shelves } from './apartment';
import styles from './room.module.css';

const TITLE_ID = 'apartment-achievements';

export function Achievements({ title, items }: { title: string; items: Achievement[] }) {
  return (
    <section className={styles.achievements} aria-labelledby={TITLE_ID}>
      <h2 id={TITLE_ID} className={styles['achievements-title']}>
        {title}
      </h2>

      {shelves(items).map((row) => (
        <div key={row[0]?.text} className={styles.shelf}>
          <div className={styles['shelf-frames']}>
            {row.map((item) => (
              <div key={item.text} className={styles.frame}>
                {item.title !== undefined && (
                  <h3 className={styles['frame-title']}>{item.title}</h3>
                )}
                <p className={styles['frame-text']}>{item.text}</p>
              </div>
            ))}
          </div>

          <div className={styles['shelf-board']} />
        </div>
      ))}
    </section>
  );
}
