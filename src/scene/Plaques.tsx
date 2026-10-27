import { locale } from 'next/root-params';
import { defaultLocale, fill, getContent, isLocale, shortPeriod, type Basement } from '@/content';
import { HOUSE, PLAQUE } from './layout';
import styles from './scene.module.css';
import { left, size, top } from './units';

interface PlaqueProps {
  midline: number;
  kicker: string;
  title: string;
  floor: number;
}

function Bracket({ midline, ground = false }: { midline: number; ground?: boolean }) {
  return (
    <div
      className={`${styles.bracket} ${ground ? styles['bracket-ground'] : ''}`}
      style={{
        left: left(PLAQUE.bracketX),
        top: top(midline),
        width: size(PLAQUE.anchorX - PLAQUE.bracketX),
      }}
    />
  );
}

function Plaque({ midline, kicker, title, floor }: PlaqueProps) {
  return (
    <div data-floor={floor} data-state="idle">
      <Bracket midline={midline} />
      <div
        className={styles.plaque}
        style={{ left: left(PLAQUE.anchorX), top: top(midline), width: size(PLAQUE.width) }}
      >
        <span className={styles['plaque-kicker']}>{kicker}</span>
        <span className={styles['plaque-title']}>{title}</span>
      </div>
    </div>
  );
}

function BasementPlaque({ basement, brief }: { basement: Basement; brief: string }) {
  const { anchor, width } = HOUSE.basement.plaque;
  const place = { left: left(PLAQUE.anchorX), top: top(anchor.y) };

  return (
    <div>
      <Bracket ground midline={anchor.y} />

      <div
        className={`${styles.plaque} ${styles['plaque-ground']} ${styles['plaque-brief']}`}
        style={{ ...place, width: size(PLAQUE.width) }}
        aria-hidden="true"
      >
        <span className={styles['plaque-kicker']}>{brief}</span>
        <span className={styles['plaque-title']}>{basement.kicker}</span>
      </div>

      <div
        className={`${styles.plaque} ${styles['plaque-ground']} ${styles['plaque-study']}`}
        style={{ ...place, width: size(width) }}
      >
        <span className={styles['plaque-kicker']}>{basement.kicker}</span>
        <span className={styles['plaque-title']}>{basement.institution}</span>
        <span className={styles['plaque-line']}>{basement.faculty}</span>
        <span className={styles['plaque-line']}>{basement.period}</span>
      </div>
    </div>
  );
}

export async function Plaques() {
  const current = await locale();
  const content = getContent(isLocale(current) ? current : defaultLocale);

  return (
    <div className={styles.plaques}>
      {HOUSE.floors.map((floor) => {
        const data = content.floors.find((item) => item.floor === floor.floor);
        if (data === undefined) return null;

        return (
          <Plaque
            key={floor.floor}
            midline={floor.midline}
            kicker={fill(content.ui.scene.floorPlaque, {
              floor: floor.floor,
              period: shortPeriod(data.period),
            })}
            title={data.title}
            floor={floor.floor}
          />
        );
      })}

      <div className={styles.tooltip} style={{ left: left(456), top: top(694.67) }} role="tooltip">
        <span className={styles['tooltip-title']}>{content.ui.scene.doorTooltipTitle}</span>
        <span className={styles['tooltip-action']}>{content.ui.scene.doorTooltipAction}</span>
      </div>

      <div
        className={`${styles.tooltip} ${styles['tooltip-garage']}`}
        style={{ left: left(54), top: top(670) }}
        role="tooltip"
      >
        <span className={styles['tooltip-title']}>{content.ui.scene.garageTooltip}</span>
      </div>

      <BasementPlaque
        basement={content.basement}
        brief={fill(content.ui.scene.basementPlaque, {
          period: shortPeriod(content.basement.period),
        })}
      />
    </div>
  );
}
