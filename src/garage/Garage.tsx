import Link from 'next/link';
import { Fragment, type CSSProperties } from 'react';
import { SceneBar } from '@/components/SceneBar';
import { SceneCover } from '@/components/SceneCover';
import type { Locale, PetProject, Ui } from '@/content';
import { GARAGE_TITLE_ID, projectPath } from './projects';
import { GaragePanel } from './GaragePanel';
import { GarageScene } from './GarageScene';
import styles from './garage.module.css';

const TAGS: Record<string, { x: number; y: number }> = {
  fridgemind: { x: 150, y: 196 },
  'coffee-shop': { x: 600, y: 266 },
};

const SPOTS: Record<string, { x: number; y: number; w: number; h: number }> = {
  fridgemind: { x: 120, y: 270, w: 180, h: 330 },
  'coffee-shop': { x: 500, y: 330, w: 380, h: 270 },
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
            const tag = TAGS[project.slug];
            const spot = SPOTS[project.slug];
            if (tag === undefined || spot === undefined) return null;

            return (
              <Fragment key={project.slug}>
                <p
                  className={styles.tag}
                  data-project={project.slug}
                  style={{ '--x': tag.x, '--y': tag.y } as CSSProperties}
                >
                  {project.title}
                </p>

                <Link
                  className={styles.hotspot}
                  href={projectPath(locale, project.slug)}
                  aria-label={project.title}
                  data-project={project.slug}
                  style={
                    { '--x': spot.x, '--y': spot.y, '--w': spot.w, '--h': spot.h } as CSSProperties
                  }
                />
              </Fragment>
            );
          })}
        </div>

        <GaragePanel locale={locale} projects={projects} garage={garage} github={github} />
      </div>
    </SceneCover>
  );
}
