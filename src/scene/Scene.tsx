import { AtmosphereLayer } from './AtmosphereLayer';
import { BackdropLayer } from './BackdropLayer';
import { Camera } from './Camera';
import { FloorOverlay } from './FloorOverlay';
import { HouseLayer } from './HouseLayer';
import { ObjectsLayer } from './ObjectsLayer';
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
        <FloorOverlay />
        <AtmosphereLayer />
        <ObjectsLayer />
        <Plaques />
      </Camera>
    </>
  );
}
