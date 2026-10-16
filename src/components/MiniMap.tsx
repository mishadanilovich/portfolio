import { locale } from 'next/root-params';
import { defaultLocale, fill, getContent, isLocale, type Ui } from '@/content';
import { garagePath } from '@/garage/projects';
import { LEVELS, type LevelId } from '@/scene/layout';
import { MiniMapNav, type MiniMapItem } from './MiniMapNav';

function placeLabel(id: LevelId, miniMap: Ui['miniMap']): string | null {
  if (id === 'roof') return miniMap.roof;
  if (id === 'entrance') return miniMap.entrance;
  if (id === 'basement') return miniMap.basement;

  return null;
}

export async function MiniMap() {
  const current = await locale();
  const active = isLocale(current) ? current : defaultLocale;
  const content = getContent(active);
  const { miniMap } = content.ui;

  const items = LEVELS.reduce<MiniMapItem[]>((list, level) => {
    if (level.floor !== null) {
      list.push({
        id: level.id,
        label: fill(miniMap.floor, { floor: level.floor }),
        text: String(level.floor),
      });

      return list;
    }

    const label = placeLabel(level.id, miniMap);
    if (label !== null) list.push({ id: level.id, label });

    return list;
  }, []);

  return (
    <MiniMapNav
      label={miniMap.label}
      items={items}
      garageLabel={miniMap.garage}
      garageHref={garagePath(active)}
    />
  );
}
