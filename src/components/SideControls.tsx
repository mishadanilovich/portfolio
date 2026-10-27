import { locale } from 'next/root-params';
import { defaultLocale, getContent, isLocale } from '@/content';
import styles from './side-controls.module.css';
import { MiniMap } from './MiniMap';
import { OverviewButton } from './OverviewButton';

export async function SideControls() {
  const current = await locale();
  const active = isLocale(current) ? current : defaultLocale;
  const content = getContent(active);

  return (
    <div className={styles.column}>
      <OverviewButton label={content.ui.scene.overview} />
      <MiniMap />
    </div>
  );
}
