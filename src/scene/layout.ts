export interface Point {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Circle {
  center: Point;
  radius: number;
}

export interface Bracket {
  x1: number;
  x2: number;
  y: number;
}

export interface Plaque {
  anchor: Point;
  width: number;
  bracket: Bracket;
}

export type WindowKind = 'cold' | 'blinds' | 'project';

export interface WindowSlot {
  column: number;
  kind: WindowKind;
  rect: Rect;
  glow: Rect;
  center: Point;
}

export interface FloorGeometry {
  floor: number;
  rect: Rect;
  slab: Rect | null;
  midline: number;
  windows: WindowSlot[];
  projectWindow: WindowSlot;
  plaque: Plaque;
}

export interface EntranceGeometry {
  rect: Rect;
  slab: Rect;
  door: Rect;
  canopy: Rect;
  porch: Rect;
  houseNumber: Circle;
  lamps: Circle[];
  intercom: {
    panel: Rect;
    button: Circle;
  };
  windows: Rect[];
  hitArea: Rect;
}

export interface BasementGeometry {
  rect: Rect;
  plaque: Plaque;
}

export interface GarageGeometry {
  rect: Rect;
  lintel: Rect;
  body: Rect;
  gate: Rect;
  lightStrip: Rect;
  hitArea: Rect;
}

export interface RoofGeometry {
  parapet: Rect;
  stairHut: Rect;
  stairHutCap: Rect;
  stairHutDoor: Rect;
  stairHutWindow: Rect;
  masts: Rect[];
  sign: Rect;
}

export type LevelId =
  'roof' | 'floor-6' | 'floor-5' | 'floor-4' | 'floor-3' | 'floor-2' | 'entrance' | 'basement';

export interface Level {
  id: LevelId;
  band: Rect;
  anchor: number;
  floor: number | null;
}

export interface HouseGeometry {
  facade: Rect;
  shade: Rect;
  floors: FloorGeometry[];
  entrance: EntranceGeometry;
  basement: BasementGeometry;
  garage: GarageGeometry;
  roof: RoofGeometry;
}

export interface Viewport {
  width: number;
  height: number;
}

export interface SceneBounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export interface SceneLayout {
  viewport: Viewport;
  scale: number;
  offsetX: number;
  document: {
    width: number;
    height: number;
  };
  bounds: SceneBounds;
  ground: Rect;
  house: HouseGeometry;
  toPx: (units: number) => number;
  documentX: (units: number) => number;
  documentY: (units: number) => number;
}

export const DESIGN = {
  viewportWidth: 1440,
  viewportHeight: 900,
  scale: 1.5,
  offsetX: 260,
} as const;

export const VIEWPORT_UNITS = DESIGN.viewportWidth / DESIGN.scale;
export const MIN_COMPOSITION_WIDTH = 1280;
export const MAX_COMPOSITION_WIDTH = DESIGN.viewportWidth;

export const SCENE_LEFT = -DESIGN.offsetX / DESIGN.scale;
export const SCENE_TOP = -260;
export const SCENE_BOTTOM = 880;
export const SCENE_WIDTH = VIEWPORT_UNITS;
export const SCENE_HEIGHT = SCENE_BOTTOM - SCENE_TOP;
export const SCENE_VIEW_BOX = `${SCENE_LEFT} ${SCENE_TOP} ${SCENE_WIDTH} ${SCENE_HEIGHT}`;
export const FOCUS_ZOOM = 1.6;
export const GROUND_BLEED = 40;

export const GROUND_Y = 760;
export const TOP_FLOOR = 6;
export const PROJECT_FLOORS = [2, 3, 4, 5, 6] as const;

const FLOOR_HEIGHT = 100;
const SLAB_THICKNESS = 5;
const SLAB_RISE = 3;

const FACADE_X = 200;
const FACADE_WIDTH = 360;
const FACADE_SHADE_WIDTH = 20;

const WINDOW_WIDTH = 48;
const WINDOW_HEIGHT = 56;
const WINDOW_INSET = 36;
const WINDOW_PITCH = 80;
const WINDOW_TOP = 24;
const WINDOW_GLOW_SPREAD = 20;

const PLAQUE_GAP = 12;
const PLAQUE_WIDTH = 136;

export const CARD_WIDTH = 148;

export const PLAQUE = {
  width: PLAQUE_WIDTH,
  bracketX: FACADE_X + FACADE_WIDTH,
  anchorX: FACADE_X + FACADE_WIDTH + PLAQUE_GAP,
} as const;

const GROUND_DEPTH = SCENE_BOTTOM - GROUND_Y;

interface FloorPlan {
  floor: number;
  windows: readonly WindowKind[];
}

const FLOOR_PLANS: readonly FloorPlan[] = [
  { floor: 2, windows: ['blinds', 'cold', 'blinds', 'project'] },
  { floor: 3, windows: ['project', 'cold', 'cold', 'blinds'] },
  { floor: 4, windows: ['blinds', 'cold', 'project', 'cold'] },
  { floor: 5, windows: ['cold', 'project', 'blinds', 'cold'] },
  { floor: 6, windows: ['cold', 'blinds', 'cold', 'project'] },
];

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function floorTop(floor: number): number {
  return GROUND_Y - floor * FLOOR_HEIGHT;
}

function slabOf(floor: number): Rect {
  return {
    x: FACADE_X,
    y: floorTop(floor) - SLAB_RISE,
    width: FACADE_WIDTH,
    height: SLAB_THICKNESS,
  };
}

function plaqueAt(midline: number): Plaque {
  return {
    anchor: { x: PLAQUE.anchorX, y: midline },
    width: PLAQUE.width,
    bracket: { x1: PLAQUE.bracketX, x2: PLAQUE.anchorX, y: midline },
  };
}

function windowSlot(floor: number, column: number, kind: WindowKind): WindowSlot {
  const rect: Rect = {
    x: FACADE_X + WINDOW_INSET + column * WINDOW_PITCH,
    y: floorTop(floor) + WINDOW_TOP,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  };

  return {
    column,
    kind,
    rect,
    glow: {
      x: rect.x - WINDOW_GLOW_SPREAD,
      y: rect.y - WINDOW_GLOW_SPREAD,
      width: rect.width + WINDOW_GLOW_SPREAD * 2,
      height: rect.height + WINDOW_GLOW_SPREAD * 2,
    },
    center: { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 },
  };
}

function buildFloor(plan: FloorPlan): FloorGeometry {
  const slab = plan.floor === TOP_FLOOR ? null : slabOf(plan.floor);
  const top = slab === null ? floorTop(plan.floor) : slab.y + slab.height;
  const bottom = slabOf(plan.floor - 1).y;
  const rect: Rect = { x: FACADE_X, y: top, width: FACADE_WIDTH, height: bottom - top };
  const midline = rect.y + rect.height / 2;

  const windows: WindowSlot[] = [];
  const projects: WindowSlot[] = [];

  plan.windows.forEach((kind, column) => {
    const slot = windowSlot(plan.floor, column, kind);
    windows.push(slot);
    if (kind === 'project') projects.push(slot);
  });

  const [projectWindow, ...rest] = projects;

  if (projectWindow === undefined || rest.length > 0) {
    throw new Error(`Этаж ${plan.floor}: проектных окон ${projects.length}, нужно ровно одно`);
  }

  return {
    floor: plan.floor,
    rect,
    slab,
    midline,
    windows,
    projectWindow,
    plaque: plaqueAt(midline),
  };
}

function buildEntrance(): EntranceGeometry {
  const slab = slabOf(1);
  const top = slab.y + slab.height;
  const hitTop = 664;

  return {
    rect: { x: FACADE_X, y: top, width: FACADE_WIDTH, height: GROUND_Y - top },
    slab,
    door: { x: 340, y: 684, width: 80, height: GROUND_Y - 684 },
    canopy: { x: 328, y: 677, width: 104, height: 5 },
    porch: { x: 336, y: 757, width: 88, height: 3 },
    houseNumber: { center: { x: 380, y: 670 }, radius: 6 },
    lamps: [
      { center: { x: 333, y: 706 }, radius: 10 },
      { center: { x: 427, y: 706 }, radius: 10 },
    ],
    intercom: {
      panel: { x: 434, y: 716, width: 10, height: 16 },
      button: { center: { x: 439, y: 722 }, radius: 3 },
    },
    windows: [
      { x: 228, y: 682, width: 84, height: 60 },
      { x: 448, y: 682, width: 84, height: 60 },
    ],
    hitArea: { x: 328, y: hitTop, width: 116, height: GROUND_Y - hitTop },
  };
}

function buildBasement(): BasementGeometry {
  const rect: Rect = { x: FACADE_X, y: GROUND_Y, width: FACADE_WIDTH, height: 86 };

  return { rect, plaque: plaqueAt(rect.y + rect.height / 2) };
}

function buildGarage(): GarageGeometry {
  const rect: Rect = { x: 54, y: 676, width: 136, height: GROUND_Y - 676 };

  return {
    rect,
    lintel: { x: rect.x, y: rect.y, width: rect.width, height: 8 },
    body: { x: 60, y: 684, width: 124, height: GROUND_Y - 684 },
    gate: { x: 76, y: 702, width: 92, height: GROUND_Y - 702 },
    lightStrip: { x: 76, y: 748, width: 92, height: 12 },
    hitArea: rect,
  };
}

function buildRoof(top: number): RoofGeometry {
  return {
    parapet: { x: 192, y: top - 12, width: 376, height: 12 },
    stairHut: { x: 210, y: 96, width: 80, height: 52 },
    stairHutCap: { x: 204, y: 90, width: 92, height: 7 },
    stairHutDoor: { x: 226, y: 110, width: 22, height: 38 },
    stairHutWindow: { x: 262, y: 112, width: 16, height: 14 },
    masts: [
      { x: 358, y: 70, width: 4, height: 78 },
      { x: 498, y: 70, width: 4, height: 78 },
    ],
    sign: { x: 340, y: 16, width: 180, height: 56 },
  };
}

function buildHouse(): HouseGeometry {
  const top = floorTop(TOP_FLOOR);
  const facade: Rect = { x: FACADE_X, y: top, width: FACADE_WIDTH, height: GROUND_Y - top };

  return {
    facade,
    shade: {
      x: FACADE_X + FACADE_WIDTH - FACADE_SHADE_WIDTH,
      y: facade.y,
      width: FACADE_SHADE_WIDTH,
      height: facade.height,
    },
    floors: FLOOR_PLANS.map(buildFloor),
    entrance: buildEntrance(),
    basement: buildBasement(),
    garage: buildGarage(),
    roof: buildRoof(top),
  };
}

export const HOUSE: HouseGeometry = buildHouse();

function band(id: LevelId, y: number, height: number, floor: number | null): Level {
  return {
    id,
    band: { x: FACADE_X, y, width: FACADE_WIDTH, height },
    anchor: y + height / 2,
    floor,
  };
}

function buildLevels(): Level[] {
  const roofTop = HOUSE.roof.sign.y;

  return [
    band('roof', roofTop, floorTop(TOP_FLOOR) - roofTop, null),
    band('floor-6', floorTop(6), FLOOR_HEIGHT, 6),
    band('floor-5', floorTop(5), FLOOR_HEIGHT, 5),
    band('floor-4', floorTop(4), FLOOR_HEIGHT, 4),
    band('floor-3', floorTop(3), FLOOR_HEIGHT, 3),
    band('floor-2', floorTop(2), FLOOR_HEIGHT, 2),
    band('entrance', floorTop(1), FLOOR_HEIGHT, null),
    band('basement', HOUSE.basement.rect.y, HOUSE.basement.rect.height, null),
  ];
}

export const LEVELS: Level[] = buildLevels();

export const LANDING_LEVEL: LevelId = 'entrance';

export const DAY_LEVEL: LevelId = 'roof';

export const DUSK_LEVEL: LevelId = 'floor-3';

export const BOTTOM_ANCHOR: number = LEVELS[LEVELS.length - 1]?.anchor ?? SCENE_BOTTOM;

export const HOUSE_CENTER: number = HOUSE.facade.x + HOUSE.facade.width / 2;

export const FOCUS_CENTER: number = (HOUSE.facade.x + PLAQUE.anchorX + PLAQUE.width) / 2;

export function findLevel(id: LevelId): Level | undefined {
  return LEVELS.find((level) => level.id === id);
}

export function createSceneLayout(viewport: Viewport): SceneLayout {
  const compositionWidth = clamp(viewport.width, MIN_COMPOSITION_WIDTH, MAX_COMPOSITION_WIDTH);
  const scale = compositionWidth / VIEWPORT_UNITS;
  const offsetX = (viewport.width - compositionWidth) / 2 - SCENE_LEFT * scale;

  const toPx = (units: number): number => units * scale;
  const documentX = (units: number): number => offsetX + toPx(units);
  const documentY = (units: number): number => toPx(units - SCENE_TOP);

  const left = -offsetX / scale;
  const right = (viewport.width - offsetX) / scale;

  return {
    viewport,
    scale,
    offsetX,
    document: {
      width: viewport.width,
      height: Math.max(viewport.height, toPx(SCENE_BOTTOM - SCENE_TOP)),
    },
    bounds: { left, right, top: SCENE_TOP, bottom: SCENE_BOTTOM },
    ground: {
      x: left - GROUND_BLEED,
      y: GROUND_Y,
      width: right - left + GROUND_BLEED * 2,
      height: GROUND_DEPTH,
    },
    house: HOUSE,
    toPx,
    documentX,
    documentY,
  };
}

export function findFloor(floor: number): FloorGeometry | undefined {
  return HOUSE.floors.find((candidate) => candidate.floor === floor);
}
