import { locale } from 'next/root-params';
import { defaultLocale, getContent, isLocale } from '@/content';
import { HOUSE } from './layout';
import styles from './scene.module.css';
import { left, size, top } from './units';

export async function RoofSign() {
  const current = await locale();
  const content = getContent(isLocale(current) ? current : defaultLocale);
  const { sign } = HOUSE.roof;

  return (
    <div
      className={styles.sign}
      style={{
        left: left(sign.x),
        top: top(sign.y),
        width: size(sign.width),
        height: size(sign.height),
      }}
    >
      <p className={styles['sign-title']}>
        <span className={styles['sign-dot']} />
        {content.ui.roof.sign}
      </p>
      <p className={styles['sign-note']}>{content.ui.roof.signNote}</p>
    </div>
  );
}
