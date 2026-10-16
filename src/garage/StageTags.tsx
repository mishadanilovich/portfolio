import type { CSSProperties } from 'react';
import type { PetProject } from '@/content';
import styles from './garage.module.css';

const TAGS: Record<string, { x: number; y: number }> = {
  fridgemind: { x: 150, y: 196 },
  'coffee-shop': { x: 600, y: 266 },
};

export function StageTags({ projects }: { projects: PetProject[] }) {
  return projects.map((project) => {
    const tag = TAGS[project.slug];
    if (tag === undefined) return null;

    return (
      <p
        key={project.slug}
        className={styles.tag}
        data-project={project.slug}
        style={{ '--x': tag.x, '--y': tag.y } as CSSProperties}
      >
        {project.title}
      </p>
    );
  });
}
