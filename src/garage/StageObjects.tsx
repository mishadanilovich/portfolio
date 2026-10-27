import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { Locale, PetProject } from '@/content';
import { control } from '@/styles/controls';
import { projectPath } from './projects';
import styles from './garage.module.css';

const TAGS: Record<string, { x: number; y: number }> = {
  fridgemind: { x: 150, y: 196 },
  'coffee-shop': { x: 600, y: 266 },
};

const SPOTS: Record<string, { x: number; y: number; w: number; h: number }> = {
  fridgemind: { x: 120, y: 270, w: 180, h: 330 },
  'coffee-shop': { x: 500, y: 330, w: 380, h: 270 },
};

export function StageObjects({
  locale,
  projects,
  current,
}: {
  locale: Locale;
  projects: PetProject[];
  current?: string;
}) {
  return projects.map((project) => {
    const tag = TAGS[project.slug];
    const spot = SPOTS[project.slug];
    if (tag === undefined || spot === undefined) return null;

    return (
      <div key={project.slug} className={styles.object}>
        <p
          className={styles.tag}
          data-project={project.slug}
          style={{ '--x': tag.x, '--y': tag.y } as CSSProperties}
        >
          {project.title}
        </p>

        {project.slug !== current && (
          <Link
            className={`${styles.hotspot} ${control('ring-dark')}`}
            href={projectPath(locale, project.slug)}
            aria-label={project.title}
            data-project={project.slug}
            style={{ '--x': spot.x, '--y': spot.y, '--w': spot.w, '--h': spot.h } as CSSProperties}
          />
        )}
      </div>
    );
  });
}
