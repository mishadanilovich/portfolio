import { SCENE_LEFT, SCENE_TOP } from './layout';

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
