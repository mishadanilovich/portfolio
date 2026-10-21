import { SceneBar } from '@/components/SceneBar';
import { SceneCover } from '@/components/SceneCover';
import type { Locale, PetProject, Ui } from '@/content';
import { GARAGE_TITLE_ID } from './projects';
import { GaragePanel } from './GaragePanel';
import { GarageScene } from './GarageScene';
import { StageObjects } from './StageObjects';
import styles from './garage.module.css';

export function Garage({
  locale,
  projects,
  garage,
  scene,
  github,
  newTab,
}: {
  locale: Locale;
  projects: PetProject[];
  garage: Ui['garage'];
  scene: Ui['scene'];
  github: string;
  newTab: string;
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

          <StageObjects locale={locale} projects={projects} />
        </div>

        <GaragePanel
          locale={locale}
          projects={projects}
          garage={garage}
          github={github}
          newTab={newTab}
        />
      </div>
    </SceneCover>
  );
}
