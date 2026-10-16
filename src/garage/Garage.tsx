import type { CSSProperties } from 'react';
import { SceneBar } from '@/components/SceneBar';
import { SceneCover } from '@/components/SceneCover';
import type { Locale, PetProject, Ui } from '@/content';
import { GARAGE_TITLE_ID } from './projects';
import { GaragePanel } from './GaragePanel';
import { GarageScene } from './GarageScene';
import styles from './garage.module.css';

const TAGS: Record<string, { x: number; y: number }> = {
  fridgemind: { x: 150, y: 196 },
  'coffee-shop': { x: 600, y: 266 },
};

export function Garage({
  locale,
  projects,
  garage,
  scene,
  github,
}: {
  locale: Locale;
  projects: PetProject[];
  garage: Ui['garage'];
  scene: Ui['scene'];
  github: string;
}) {
  return (
    <SceneCover id="garage" className={styles.garage} labelledBy={GARAGE_TITLE_ID}>
      <SceneBar
        locale={locale}
        target="garage"
        exit={scene.exitHouse}
        kicker={garage.bar}
        title={garage.barList}
      />

      <div className={styles.body}>
        <div className={styles.stage}>
          <GarageScene label={garage.sceneAria} />

          {projects.map((project) => {
            const spot = TAGS[project.slug];
            if (spot === undefined) return null;

            return (
              <p
                key={project.slug}
                className={styles.tag}
                data-project={project.slug}
                style={{ '--x': spot.x, '--y': spot.y } as CSSProperties}
              >
                {project.title}
              </p>
            );
          })}
        </div>

        <GaragePanel locale={locale} projects={projects} garage={garage} github={github} />
      </div>
    </SceneCover>
  );
}
