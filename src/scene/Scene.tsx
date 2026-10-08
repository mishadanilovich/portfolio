import { AtmosphereLayer } from './AtmosphereLayer';
import { BackdropLayer } from './BackdropLayer';
import { HouseLayer } from './HouseLayer';
import { Plaques } from './Plaques';
import { SceneDefs } from './SceneDefs';
import styles from './scene.module.css';
import { SkyLayer } from './SkyLayer';

export function Scene() {
  return (
    <div className={styles.viewport}>
      <SceneDefs />
      <div className={styles.camera}>
        <SkyLayer />
        <BackdropLayer />
        <HouseLayer />
        <AtmosphereLayer />
        <Plaques />
      </div>
    </div>
  );
}
