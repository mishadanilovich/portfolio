import {
  BOTTOM_ANCHOR,
  DAY_LEVEL,
  DUSK_LEVEL,
  findLevel,
  type LevelId,
  FOCUS_ZOOM,
  FOCUS_CENTER,
  MAX_COMPOSITION_WIDTH,
  MIN_COMPOSITION_WIDTH,
  SCENE_BOTTOM,
  SCENE_HEIGHT,
  SCENE_LEFT,
  SCENE_TOP,
  SCENE_WIDTH,
  VIEWPORT_UNITS,
} from './layout';

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}

export function size(units: number): string {
  return `calc(${round(units)} * var(--u-focus))`;
}

export function left(units: number): string {
  return size(units - SCENE_LEFT);
}

export function top(units: number): string {
  return size(units - SCENE_TOP);
}

export const OVERVIEW_SCALE = 1 / FOCUS_ZOOM;

export function cameraVars(): Record<string, string> {
  return {
    '--u': `calc(clamp(${MIN_COMPOSITION_WIDTH}px, 100cqw, ${MAX_COMPOSITION_WIDTH}px) / ${VIEWPORT_UNITS})`,
    '--zoom': String(FOCUS_ZOOM),
    '--scene-w': size(SCENE_WIDTH),
    '--scene-h': size(SCENE_HEIGHT),
    '--camera-x': `calc(50cqw - ${left(FOCUS_CENTER)})`,
    '--overview-x': `max(0px, calc((100cqw - ${MAX_COMPOSITION_WIDTH}px) / 2))`,
    '--overview-y': `calc(${size(SCENE_HEIGHT)} * ${round(1 - OVERVIEW_SCALE)})`,
    '--overview-scale': String(round(OVERVIEW_SCALE)),
    '--below-h': `max(0px, calc(50dvh - ${size(SCENE_BOTTOM - BOTTOM_ANCHOR)}))`,
    '--sky-start': levelScroll(DAY_LEVEL),
    '--sky-end': levelScroll(DUSK_LEVEL),
  };
}

function levelScroll(id: LevelId): string {
  const anchor = findLevel(id)?.anchor ?? 0;

  return `max(0px, calc(${size(anchor - SCENE_TOP)} - 50dvh))`;
}
