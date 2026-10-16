import { locale } from 'next/root-params';
import { defaultLocale, fill, getContent, isLocale, shortPeriod } from '@/content';
import { garagePath } from '@/garage/projects';
import { apartmentPath } from '@/room/apartment';
import { LEVELS } from './layout';
import { SceneObjects, type FloorTarget } from './SceneObjects';

export async function ObjectsLayer() {
  const current = await locale();
  const active = isLocale(current) ? current : defaultLocale;
  const content = getContent(active);
  const { scene } = content.ui;

  const floors = LEVELS.reduce<FloorTarget[]>((list, level) => {
    const data = content.floors.find((floor) => floor.floor === level.floor);
    if (level.floor === null || data === undefined) return list;

    list.push({
      floor: level.floor,
      level: level.id,
      href: apartmentPath(active, level.floor),
      label: fill(scene.floorAria, {
        floor: level.floor,
        title: data.title,
        period: shortPeriod(data.period),
      }),
    });

    return list;
  }, []);

  return (
    <SceneObjects
      floors={floors}
      doorLabel={scene.doorAria}
      garageLabel={scene.garageAria}
      garageHref={garagePath(active)}
    />
  );
}
