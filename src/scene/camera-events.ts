import type { LevelId } from './layout';

const OVERVIEW_REQUEST = 'scene:overview';
const LEVEL_REQUEST = 'scene:level-request';
const LEVEL_CHANGE = 'scene:level-change';
const FLY_IN_REQUEST = 'scene:fly-in';
const FLY_OUT_REQUEST = 'scene:fly-out';

export type FlyTarget = number | 'garage';

function listen<T>(type: string, handler: (detail: T) => void): () => void {
  const wrapped = (event: Event) => handler((event as CustomEvent<T>).detail);
  window.addEventListener(type, wrapped);

  return () => window.removeEventListener(type, wrapped);
}

export function requestOverview(): void {
  window.dispatchEvent(new Event(OVERVIEW_REQUEST));
}

export function onOverviewRequest(handler: () => void): () => void {
  window.addEventListener(OVERVIEW_REQUEST, handler);

  return () => window.removeEventListener(OVERVIEW_REQUEST, handler);
}

export function requestLevel(id: LevelId): void {
  window.dispatchEvent(new CustomEvent<LevelId>(LEVEL_REQUEST, { detail: id }));
}

export function onLevelRequest(handler: (id: LevelId) => void): () => void {
  return listen(LEVEL_REQUEST, handler);
}

export function emitLevelChange(id: LevelId): void {
  window.dispatchEvent(new CustomEvent<LevelId>(LEVEL_CHANGE, { detail: id }));
}

export function onLevelChange(handler: (id: LevelId) => void): () => void {
  return listen(LEVEL_CHANGE, handler);
}

export function requestFlyIn(target: FlyTarget): void {
  window.dispatchEvent(new CustomEvent<FlyTarget>(FLY_IN_REQUEST, { detail: target }));
}

export function onFlyInRequest(handler: (target: FlyTarget) => void): () => void {
  return listen(FLY_IN_REQUEST, handler);
}

export function requestFlyOut(target: FlyTarget): void {
  window.dispatchEvent(new CustomEvent<FlyTarget>(FLY_OUT_REQUEST, { detail: target }));
}

export function onFlyOutRequest(handler: (target: FlyTarget) => void): () => void {
  return listen(FLY_OUT_REQUEST, handler);
}
