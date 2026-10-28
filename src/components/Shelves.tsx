import type { Achievement } from '@/content';
import styles from './shelves.module.css';

const CAPACITY = 2;

const METRIC = /^[^\p{L}]+$/u;

export function isMetric(title: string): boolean {
  return METRIC.test(title);
}

export function shelves(achievements: Achievement[]): Achievement[][] {
  const rows: Achievement[][] = [];

  for (let i = 0; i < achievements.length; i += CAPACITY) {
    rows.push(achievements.slice(i, i + CAPACITY));
  }

  return rows;
}

export function Shelves({
  title,
  titleId,
  items,
  size = 'large',
}: {
  title: string;
  titleId: string;
  items: Achievement[];
  size?: 'large' | 'small';
}) {
  return (
    <section className={styles.shelves} data-size={size} aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>

      {shelves(items).map((row) => (
        <div key={row[0]?.text} className={styles.shelf}>
          <div className={styles.frames}>
            {row.map((item) => (
              <div key={item.text} className={styles.frame}>
                {item.title !== undefined && (
                  <h3
                    className={styles['frame-title']}
                    data-metric={isMetric(item.title) ? '' : undefined}
                  >
                    {item.title}
                  </h3>
                )}
                <p className={styles['frame-text']}>{item.text}</p>
              </div>
            ))}
          </div>

          <div className={styles.board} />
        </div>
      ))}
    </section>
  );
}
