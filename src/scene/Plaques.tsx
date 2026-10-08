import { locale } from 'next/root-params';
import { defaultLocale, fill, getContent, isLocale, shortPeriod } from '@/content';
import { HOUSE, PLAQUE } from './layout';
import styles from './scene.module.css';
import { left, size, top } from './units';

interface PlaqueProps {
  midline: number;
  kicker: string;
  title: string;
  ground?: boolean;
}

function Plaque({ midline, kicker, title, ground = false }: PlaqueProps) {
  return (
    <>
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
        style={{ left: left(PLAQUE.anchorX), top: top(midline), width: size(PLAQUE.width) }}
      >
        <span className={styles['plaque-kicker']}>{kicker}</span>
        <span className={styles['plaque-title']}>{title}</span>
      </div>
    </>
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
          />
        );
      })}

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
