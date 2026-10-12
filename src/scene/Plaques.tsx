import { locale } from 'next/root-params';
import { defaultLocale, fill, getContent, isLocale, shortPeriod } from '@/content';
import { CARD_WIDTH, HOUSE, PLAQUE } from './layout';
import styles from './scene.module.css';
import { left, size, top } from './units';

interface PlaqueProps {
  midline: number;
  kicker: string;
  title: string;
  ground?: boolean;
  card?: { role: string; action: string };
  floor?: number;
}

function Plaque({ midline, kicker, title, ground = false, card, floor }: PlaqueProps) {
  const anchor = { left: left(PLAQUE.anchorX), top: top(midline) };

  return (
    <div data-floor={floor} data-state="idle">
      <div
        className={`${styles.bracket} ${ground ? styles['bracket-ground'] : ''}`}
        style={{
          left: left(PLAQUE.bracketX),
          top: top(midline),
          width: size(PLAQUE.anchorX - PLAQUE.bracketX),
        }}
      />
      <div
        className={`${styles.plaque} ${ground ? styles['plaque-ground'] : ''}`}
        style={{ ...anchor, width: size(PLAQUE.width) }}
      >
        <span className={styles['plaque-kicker']}>{kicker}</span>
        <span className={styles['plaque-title']}>{title}</span>
      </div>

      {card !== undefined && (
        <div className={styles.card} style={{ ...anchor, width: size(CARD_WIDTH) }}>
          <span className={styles['card-kicker']}>{kicker}</span>
          <span className={styles['card-title']}>{title}</span>
          <span className={styles['card-role']}>{card.role}</span>
          <span className={styles['card-action']}>{card.action}</span>
        </div>
      )}
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
            card={{ role: data.role, action: content.ui.scene.enterApartment }}
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

      <Plaque
        ground
        midline={HOUSE.basement.plaque.anchor.y}
        kicker={fill(content.ui.scene.basementPlaque, {
          period: shortPeriod(content.basement.period),
        })}
        title={content.basement.kicker}
      />
    </div>
  );
}
