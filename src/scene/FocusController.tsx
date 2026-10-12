'use client';

import { useEffect, useState } from 'react';
import { onLevelChange } from './camera-events';
import { LANDING_LEVEL, type LevelId } from './layout';

export type FocusTarget = LevelId | 'door' | 'garage';

function floorOf(target: FocusTarget): number | null {
  const match = /^floor-(\d+)$/.exec(target);

  return match === null ? null : Number(match[1]);
}

export function useFocusTarget(hovered: FocusTarget | null): FocusTarget {
  const [level, setLevel] = useState<LevelId>(LANDING_LEVEL);

  useEffect(() => onLevelChange(setLevel), []);

  const target = hovered ?? level;

  useEffect(() => {
    document.body.dataset.focus = target;

    const floor = floorOf(target);

    for (const element of document.querySelectorAll<HTMLElement>('[data-floor]')) {
      const own = Number(element.dataset.floor);

      if (floor === null) element.dataset.state = 'idle';
      else element.dataset.state = own === floor ? 'focused' : 'dimmed';
    }
  }, [target]);

  return target;
}
