import Link from 'next/link';
import type { ReactNode } from 'react';
import { fill, handleOf, type Locale, type PetProject, type Ui } from '@/content';
import { GARAGE_TITLE_ID, projectPath, stackPreview } from './projects';
import styles from './garage.module.css';

const ICONS: Record<string, ReactNode> = {
  fridgemind: (
    <svg width="26" height="30" viewBox="0 0 26 30" fill="none" aria-hidden="true">
      <g stroke="var(--color-lamp-text)" strokeWidth="1.8">
        <rect x="3" y="1.5" width="20" height="27" rx="3" />
        <path d="M3 11H23M7 5V8M7 14V19" />
      </g>
    </svg>
  ),
  'coffee-shop': (
    <svg width="30" height="26" viewBox="0 0 30 26" fill="none" aria-hidden="true">
      <g stroke="var(--color-lamp-text)" strokeWidth="1.8">
        <path d="M3 9H21V17Q21 24 12 24Q3 24 3 17Z" />
        <path d="M21 11H24Q27 11 27 14Q27 17 24 17H21M9 1V5M14 1V5" />
      </g>
    </svg>
  ),
};

function ProjectCard({
  locale,
  project,
  more,
}: {
  locale: Locale;
  project: PetProject;
  more: string;
}) {
  const stack = stackPreview(project.stack);

  return (
    <Link
      className={styles.card}
      href={projectPath(locale, project.slug)}
      data-project={project.slug}
    >
      <span className={styles['card-icon']}>{ICONS[project.slug]}</span>

      <span className={styles['card-body']}>
        <span className={styles['card-title']}>{project.title}</span>
        <span className={styles['card-text']}>{project.description}</span>
        <span className={styles['card-stack']}>
          {stack.shown.map((item) => (
            <span key={item} className={styles.sticker}>
              {item}
            </span>
          ))}
          {stack.more > 0 && (
            <span className={styles.more}>{fill(more, { count: stack.more })}</span>
          )}
        </span>
      </span>

      <svg
        className={styles['card-arrow']}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path d="M4 10H16M11 5L16 10L11 15" stroke="var(--color-copper-text)" strokeWidth="1.8" />
      </svg>
    </Link>
  );
}

export function GaragePanel({
  locale,
  projects,
  garage,
  github,
}: {
  locale: Locale;
  projects: PetProject[];
  garage: Ui['garage'];
  github: string;
}) {
  return (
    <aside className={styles.panel} aria-labelledby={GARAGE_TITLE_ID}>
      <div className={styles.intro}>
        <p className={styles.kicker}>{garage.kicker}</p>
        <h1 id={GARAGE_TITLE_ID} className={styles.title}>
          {garage.title}
        </h1>
        <p className={styles.lead}>{garage.lead}</p>
      </div>

      {projects.map((project) => (
        <ProjectCard key={project.slug} locale={locale} project={project} more={garage.more} />
      ))}

      <a className={styles.github} href={github}>
        {fill(garage.github, { handle: handleOf(github) })}
      </a>
    </aside>
  );
}
