import { AtmosphereLayer } from './AtmosphereLayer';
import { BackdropLayer } from './BackdropLayer';
import { Camera } from './Camera';

import { HouseLayer } from './HouseLayer';
import { ObjectsLayer } from './ObjectsLayer';
import { Plaques } from './Plaques';
import { RoofSign } from './RoofSign';
import { SceneDefs } from './SceneDefs';
import { SkyLayer } from './SkyLayer';
import { StateOverlay } from './StateOverlay';

export function Scene() {
  return (
    <>
      <SceneDefs />
      <Camera>
        <SkyLayer />
        <BackdropLayer />
        <HouseLayer />
        <StateOverlay />
        <AtmosphereLayer />
        <ObjectsLayer />
        <Plaques />
        <RoofSign />
      </Camera>
    </>
  );
}
