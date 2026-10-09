import { AtmosphereLayer } from './AtmosphereLayer';
import { BackdropLayer } from './BackdropLayer';
import { Camera } from './Camera';
import { HouseLayer } from './HouseLayer';
import { Plaques } from './Plaques';
import { SceneDefs } from './SceneDefs';
import { SkyLayer } from './SkyLayer';

export function Scene() {
  return (
    <>
      <SceneDefs />
      <Camera>
        <SkyLayer />
        <BackdropLayer />
        <HouseLayer />
        <AtmosphereLayer />
        <Plaques />
      </Camera>
    </>
  );
}
