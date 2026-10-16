import type { LevelId } from './layout';

const OVERVIEW_REQUEST = 'scene:overview';
const LEVEL_REQUEST = 'scene:level-request';
const LEVEL_CHANGE = 'scene:level-change';
const FLY_IN_REQUEST = 'scene:fly-in';
const FLY_OUT_REQUEST = 'scene:fly-out';

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

export function requestFlyIn(floor: number): void {
  window.dispatchEvent(new CustomEvent<number>(FLY_IN_REQUEST, { detail: floor }));
}

export function onFlyInRequest(handler: (floor: number) => void): () => void {
  return listen(FLY_IN_REQUEST, handler);
}

export function requestFlyOut(floor: number): void {
  window.dispatchEvent(new CustomEvent<number>(FLY_OUT_REQUEST, { detail: floor }));
}

export function onFlyOutRequest(handler: (floor: number) => void): () => void {
  return listen(FLY_OUT_REQUEST, handler);
}
