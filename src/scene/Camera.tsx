'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import {
  FOCUS_CENTER,
  LANDING_LEVEL,
  LEVELS,
  MAX_COMPOSITION_WIDTH,
  SCENE_LEFT,
  SCENE_TOP,
  SCENE_WIDTH,
  findLevel,
} from './layout';
import { onOverviewRequest } from './camera-events';
import styles from './scene.module.css';
import { cameraVars, OVERVIEW_SCALE, size, top } from './units';

const ZOOM_IN = 900;
const ZOOM_OUT = 700;
const REDUCED_FADE = 150;
const INERTIA_GUARD = 150;

const WAKE_KEYS = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', ' ', 'Spacebar']);

type Mode = 'overview' | 'transition' | 'focus';

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function isTyping(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;

  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
}

export function Camera({ children }: { children: ReactNode }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const camera = cameraRef.current;
    if (viewport === null || camera === null) return;

    let mode: Mode = 'overview';
    let unlockTimer = 0;
    let running: Animation | null = null;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const easing =
      getComputedStyle(document.documentElement).getPropertyValue('--ease-in-out').trim() ||
      'ease-in-out';

    const unit = () => camera.offsetWidth / SCENE_WIDTH;
    const scrollMax = () => viewport.scrollHeight - viewport.clientHeight;

    const setMode = (next: Mode) => {
      mode = next;
      document.body.dataset.camera = next;
      if (next === 'overview') document.body.dataset.level = LANDING_LEVEL;
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

    const unlockSoon = () => {
      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => {
        unlockTimer = 0;
        setMode('focus');
      }, INERTIA_GUARD);
    };

    const zoomIn = () => {
      setMode('transition');
      viewport.scrollTop = scrollTopFor(findLevel(LANDING_LEVEL)?.anchor ?? 0);

      if (reduced.matches) {
        fade(() => setMode('focus'));
        return;
      }

      travel(overviewTransform(), focusTransform(), ZOOM_IN, unlockSoon);
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
      if (mode === 'overview') zoomIn();
      else if (mode === 'transition' && unlockTimer !== 0) unlockSoon();
    };

    const onTouchMove = () => {
      if (mode === 'overview') zoomIn();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (mode !== 'overview' || isTyping(event.target)) return;
      if (!WAKE_KEYS.has(event.key)) return;
      zoomIn();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (mode === 'overview') return;

        for (const entry of entries) {
          const id = entry.target.getAttribute('data-band');
          if (entry.isIntersecting && id !== null) document.body.dataset.level = id;
        }
      },
      { root: viewport, rootMargin: '-50% 0px -50% 0px' },
    );

    for (const element of viewport.querySelectorAll('[data-band]')) observer.observe(element);

    const stopListening = onOverviewRequest(zoomOut);

    viewport.addEventListener('wheel', onWheel, { passive: true });
    viewport.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      stopListening();
      observer.disconnect();
      viewport.removeEventListener('wheel', onWheel);
      viewport.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(unlockTimer);
      running?.cancel();
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

        <div className={styles.below} style={{ top: `var(--scene-h)` }} />
      </div>
    </div>
  );
}
