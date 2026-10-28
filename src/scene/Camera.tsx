'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import {
  FOCUS_CENTER,
  HOUSE,
  LANDING_LEVEL,
  LEVELS,
  MAX_COMPOSITION_WIDTH,
  SCENE_HEIGHT,
  SCENE_LEFT,
  SCENE_TOP,
  SCENE_WIDTH,
  findFloor,
  findLevel,
  type LevelId,
} from './layout';
import {
  emitLevelChange,
  onFlyInRequest,
  onFlyOutRequest,
  onLevelRequest,
  onOverviewRequest,
  type FlyTarget,
} from './camera-events';
import styles from './scene.module.css';
import { cameraVars, OVERVIEW_SCALE, size, top } from './units';

const ZOOM_IN = 900;
const ZOOM_OUT = 700;
const FLY = 700;
const FLY_SCALE = 2.2;
const REDUCED_FADE = 150;
const INERTIA_GUARD = 150;
const TRAVEL_GUARD = 1200;
const ROOM = '[data-room]';
const MODAL = 'dialog[open]';

const WAKE_KEYS = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', ' ', 'Spacebar']);
const CONTROLS = ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'];

type Mode = 'overview' | 'transition' | 'focus';

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function levelOf(floor: number): LevelId {
  return `floor-${floor}` as LevelId;
}

function inRoom(): boolean {
  return document.querySelector(ROOM) !== null;
}

function inModal(): boolean {
  return document.querySelector(MODAL) !== null;
}

function handlesKey(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;

  return target.isContentEditable || CONTROLS.includes(target.tagName);
}

export function Camera({ children }: { children: ReactNode }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const camera = cameraRef.current;
    if (viewport === null || camera === null) return;

    let mode: Mode = 'overview';
    let travelling = false;
    let travelTimer = 0;
    let unlockTimer = 0;
    let running: Animation | null = null;
    let flying: Animation | null = null;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const easing =
      getComputedStyle(document.documentElement).getPropertyValue('--ease-in-out').trim() ||
      'ease-in-out';

    const unit = () => camera.offsetWidth / SCENE_WIDTH;
    const scrollMax = () => viewport.scrollHeight - viewport.clientHeight;

    const setLevel = (id: LevelId) => {
      if (document.body.dataset.level === id) return;

      document.body.dataset.level = id;
      emitLevelChange(id);
    };

    const setMode = (next: Mode) => {
      mode = next;
      document.body.dataset.camera = next;
      if (next === 'overview') setLevel(LANDING_LEVEL);
    };

    const scrollTopFor = (anchor: number) =>
      clamp((anchor - SCENE_TOP) * unit() - viewport.clientHeight / 2, 0, scrollMax());

    const overviewTransform = () => {
      const x = Math.max(0, (viewport.clientWidth - MAX_COMPOSITION_WIDTH) / 2);
      const y = viewport.clientHeight + viewport.scrollTop - OVERVIEW_SCALE * camera.offsetHeight;

      return `translate(${x}px, ${y}px) scale(${OVERVIEW_SCALE})`;
    };

    const focusTransform = () =>
      `translate(${viewport.clientWidth / 2 - (FOCUS_CENTER - SCENE_LEFT) * unit()}px, 0px) scale(1)`;

    const fade = (settle: () => void) => {
      const animation = camera.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: REDUCED_FADE / 2,
      });
      void animation.finished.then(() => {
        settle();
        camera.animate([{ opacity: 0 }, { opacity: 1 }], { duration: REDUCED_FADE / 2 });
      });
    };

    const travel = (from: string, to: string, duration: number, settle: () => void) => {
      running?.cancel();
      camera.style.transform = from;
      const animation = camera.animate([{ transform: from }, { transform: to }], {
        duration,
        easing,
        fill: 'forwards',
      });
      running = animation;
      void animation.finished.then(() => {
        if (running !== animation) return;
        running = null;
        settle();
        camera.style.transform = '';
        animation.cancel();
      });
    };

    const settleAt = (id: LevelId) => {
      window.clearTimeout(unlockTimer);
      unlockTimer = 0;
      setMode('focus');

      const anchor = findLevel(id)?.anchor;
      if (anchor !== undefined) viewport.scrollTop = scrollTopFor(anchor);

      setLevel(id);
    };

    const originOf = (target: FlyTarget): string | null => {
      const { gate } = HOUSE.garage;
      const center =
        target === 'garage'
          ? { x: gate.x + gate.width / 2, y: gate.y + gate.height / 2 }
          : findFloor(target)?.projectWindow.center;

      if (center === undefined) return null;

      const rect = camera.getBoundingClientRect();
      const x = rect.left + (rect.width * (center.x - SCENE_LEFT)) / SCENE_WIDTH;
      const y = rect.top + (rect.height * (center.y - SCENE_TOP)) / SCENE_HEIGHT;

      return `${x}px ${y}px`;
    };

    const fly = (
      direction: 'in' | 'out',
      zoomed: Keyframe,
      origin: string,
      settle?: () => void,
    ) => {
      flying?.cancel();
      document.body.dataset.fly = direction;
      viewport.style.transformOrigin = origin;

      const grounded: Keyframe = { transform: 'scale(1)', opacity: 1 };
      const frames = direction === 'in' ? [grounded, zoomed] : [zoomed, grounded];
      const animation = viewport.animate(frames, { duration: FLY, easing, fill: 'forwards' });
      flying = animation;

      void animation.finished.then(() => {
        if (flying !== animation) return;
        flying = null;
        settle?.();
        delete document.body.dataset.fly;
        viewport.style.transformOrigin = '';
        animation.cancel();
      });
    };

    const zoomed: Keyframe = { transform: `scale(${FLY_SCALE})`, opacity: 0 };

    const flyIn = (target: FlyTarget) => {
      const origin = originOf(target);
      const settle = target === 'garage' ? undefined : () => settleAt(levelOf(target));

      if (origin === null || reduced.matches || inRoom()) {
        settle?.();
        return;
      }

      fly('in', zoomed, origin, settle);
    };

    const flyOut = (target: FlyTarget) => {
      if (target !== 'garage') settleAt(levelOf(target));
      if (reduced.matches) return;

      const origin = originOf(target);
      if (origin !== null) fly('out', zoomed, origin);
    };

    const unlockSoon = () => {
      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => {
        unlockTimer = 0;
        setMode('focus');
      }, INERTIA_GUARD);
    };

    const keepFocusVisible = () => {
      const active = document.activeElement;
      if (!(active instanceof HTMLElement) || active.closest('[data-hidden-in-focus]') === null) {
        return;
      }

      const fallback = document.querySelector<HTMLElement>('[data-minimap] [aria-current]');
      fallback?.focus();
    };

    const zoomIn = (target: LevelId = LANDING_LEVEL) => {
      keepFocusVisible();
      setMode('transition');
      viewport.scrollTop = scrollTopFor(findLevel(target)?.anchor ?? 0);
      setLevel(target);

      if (reduced.matches) {
        fade(() => setMode('focus'));
        return;
      }

      travel(overviewTransform(), focusTransform(), ZOOM_IN, unlockSoon);
    };

    const endTravel = () => {
      travelling = false;
      window.clearTimeout(travelTimer);
      travelTimer = 0;
    };

    const goToLevel = (id: LevelId) => {
      if (mode === 'overview') {
        zoomIn(id);
        return;
      }

      const anchor = findLevel(id)?.anchor;
      if (anchor === undefined) return;

      setLevel(id);
      travelling = true;
      window.clearTimeout(travelTimer);
      travelTimer = window.setTimeout(endTravel, TRAVEL_GUARD);

      viewport.scrollTo({
        top: scrollTopFor(anchor),
        behavior: reduced.matches ? 'instant' : 'smooth',
      });
    };

    const zoomOut = () => {
      if (mode === 'overview') return;

      window.clearTimeout(unlockTimer);
      unlockTimer = 0;
      setMode('transition');

      if (reduced.matches) {
        fade(() => setMode('overview'));
        return;
      }

      travel(focusTransform(), overviewTransform(), ZOOM_OUT, () => setMode('overview'));
    };

    const onWheel = () => {
      if (inRoom()) return;
      if (mode === 'overview') zoomIn();
      else if (mode === 'transition' && unlockTimer !== 0) unlockSoon();
    };

    const onTouchMove = () => {
      if (mode === 'overview' && !inRoom()) zoomIn();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (mode !== 'overview' || handlesKey(event.target) || inRoom() || inModal()) return;
      if (!WAKE_KEYS.has(event.key)) return;
      zoomIn();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (mode !== 'focus' || travelling) return;

        for (const entry of entries) {
          const id = entry.target.getAttribute('data-band');
          if (entry.isIntersecting && id !== null) setLevel(id as LevelId);
        }
      },
      { root: viewport, rootMargin: '-50% 0px -50% 0px' },
    );

    for (const element of viewport.querySelectorAll('[data-band]')) observer.observe(element);

    const cycles = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!(entry.target instanceof HTMLElement)) continue;
          if (entry.isIntersecting) delete entry.target.dataset.idle;
          else entry.target.dataset.idle = '';
        }
      },
      { root: viewport, rootMargin: '25% 0px 25% 0px' },
    );

    for (const element of viewport.querySelectorAll('[data-cycle]')) cycles.observe(element);

    const stopOverview = onOverviewRequest(zoomOut);
    const stopLevel = onLevelRequest(goToLevel);
    const stopFlyIn = onFlyInRequest(flyIn);
    const stopFlyOut = onFlyOutRequest(flyOut);

    viewport.addEventListener('scrollend', endTravel);
    viewport.addEventListener('wheel', onWheel, { passive: true });
    viewport.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      stopOverview();
      stopLevel();
      stopFlyIn();
      stopFlyOut();
      observer.disconnect();
      cycles.disconnect();
      viewport.removeEventListener('scrollend', endTravel);
      viewport.removeEventListener('wheel', onWheel);
      viewport.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(unlockTimer);
      window.clearTimeout(travelTimer);
      running?.cancel();
      flying?.cancel();
    };
  }, []);

  return (
    <div ref={viewportRef} className={styles.viewport}>
      <div ref={cameraRef} className={styles.camera} style={cameraVars() as CSSProperties}>
        {children}

        {LEVELS.map((level) => (
          <div
            key={level.id}
            data-band={level.id}
            className={styles.band}
            style={{ top: top(level.band.y), height: size(level.band.height) }}
          />
        ))}

        <div className={`${styles.below} ${styles.wide}`} style={{ top: `var(--scene-h)` }} />
      </div>
    </div>
  );
}
