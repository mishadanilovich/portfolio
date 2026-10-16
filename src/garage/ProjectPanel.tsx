import Link from 'next/link';
import { fill, handleOf, type Locale, type PetProject, type Ui } from '@/content';
import { Shelves } from '@/components/Shelves';
import { garagePath, placeOf, projectPath, PROJECT_TITLE_ID } from './projects';
import styles from './garage.module.css';

const ACHIEVEMENTS_TITLE_ID = 'project-achievements';

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d={back ? 'M15 9H3M8 3L3 9L8 15' : 'M3 9H15M10 3L15 9L10 15'}
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function ProjectPanel({
  locale,
  projects,
  project,
  ui,
}: {
  locale: Locale;
  projects: PetProject[];
  project: PetProject;
  ui: Ui['project'];
}) {
  const place = placeOf(projects, project.slug);

  return (
    <aside
      className={`${styles.panel} ${styles['panel-project']}`}
      aria-labelledby={PROJECT_TITLE_ID}
    >
      <Link className={styles.back} href={garagePath(locale)}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M11 3L5 9L11 15" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        {ui.back}
      </Link>

      <div className={styles.intro}>
        <p className={styles.kicker}>
          {fill(ui.counter, { index: place.index, total: place.total })}
        </p>
        <h1 id={PROJECT_TITLE_ID} className={styles['project-title']}>
          {project.title}
        </h1>
        <p className={styles['project-lead']}>{project.description}</p>
      </div>

      <div className={styles.intro}>
        <p className={styles.kicker}>{ui.stack}</p>
        <ul className={styles.stack}>
          {project.stack.map((item) => (
            <li key={item} className={styles['dark-sticker']}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <Shelves
        size="small"
        title={ui.achievements}
        titleId={ACHIEVEMENTS_TITLE_ID}
        items={project.achievements}
      />

      <div className={styles.cta}>
        <a className={styles.open} href={project.href} target="_blank" rel="noreferrer">
          {ui.open}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M5 3H13V11M13 3L3 13" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </a>
        <p className={styles.note}>{fill(ui.note, { handle: handleOf(project.href) })}</p>
      </div>

      <div className={styles.siblings}>
        {place.prev !== null && (
          <Link className={styles.sibling} href={projectPath(locale, place.prev.slug)}>
            <Arrow back />
            {fill(ui.prev, { title: place.prev.title })}
          </Link>
        )}

        {place.next !== null && (
          <Link
            className={`${styles.sibling} ${styles['sibling-next']}`}
            href={projectPath(locale, place.next.slug)}
          >
            {fill(ui.next, { title: place.next.title })}
            <Arrow />
          </Link>
        )}
      </div>
    </aside>
  );
}
