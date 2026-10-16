import { SceneBar } from '@/components/SceneBar';
import { SceneCover } from '@/components/SceneCover';
import { fill, type Locale, type PetProject, type Ui } from '@/content';
import { GarageScene } from './GarageScene';
import { ProjectPanel } from './ProjectPanel';
import { StageObjects } from './StageObjects';
import { PROJECT_TITLE_ID } from './projects';
import styles from './garage.module.css';

export function Project({
  locale,
  projects,
  project,
  ui,
  garage,
  scene,
}: {
  locale: Locale;
  projects: PetProject[];
  project: PetProject;
  ui: Ui['project'];
  garage: Ui['garage'];
  scene: Ui['scene'];
}) {
  return (
    <SceneCover
      id="garage"
      className={`${styles.garage} ${styles.tall}`}
      labelledBy={PROJECT_TITLE_ID}
    >
      <SceneBar
        locale={locale}
        target="garage"
        exit={scene.exitHouse}
        kicker={garage.bar}
        title={project.title}
        sticky
      />

      <div className={styles.body} data-focus={project.slug}>
        <div className={styles.stage}>
          <GarageScene label={fill(ui.sceneAria, { title: project.title })} />
          <StageObjects locale={locale} projects={projects} current={project.slug} />
        </div>

        <ProjectPanel locale={locale} projects={projects} project={project} ui={ui} />
      </div>
    </SceneCover>
  );
}
