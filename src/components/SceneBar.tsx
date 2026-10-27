import type { Locale } from '@/content';
import { HouseLink } from '@/scene/HouseLink';
import type { FlyTarget } from '@/scene/camera-events';
import { control } from '@/styles/controls';
import styles from './scene-bar.module.css';

export function SceneBar({
  locale,
  target,
  exit,
  kicker,
  title,
  sticky = false,
  children,
}: {
  locale: Locale;
  target: FlyTarget;
  exit: string;
  kicker: string;
  title: string;
  sticky?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={styles.bar}
      data-layout={children === undefined ? 'start' : 'between'}
      data-sticky={sticky ? '' : undefined}
    >
      <HouseLink
        locale={locale}
        target={target}
        className={control('link-light', 'arrow', 'arrow-back', 'ring-dark')}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M11 3L5 9L11 15" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        {exit}
      </HouseLink>

      <p className={styles.current}>
        <span className={styles.kicker}>{`${kicker} · `}</span>
        {title}
      </p>

      {children}
    </div>
  );
}
