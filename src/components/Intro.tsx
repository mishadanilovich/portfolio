import { locale } from 'next/root-params';
import { defaultLocale, getContent, isLocale } from '@/content';
import { CallButton } from '@/intercom/CallButton';
import { control } from '@/styles/controls';
import styles from './intro.module.css';

export async function Intro() {
  const current = await locale();
  const active = isLocale(current) ? current : defaultLocale;
  const content = getContent(active);

  return (
    <>
      <div className={styles.intro} data-hidden-in-focus>
        <p className={styles.status}>
          <span className={styles.dot} />
          {content.intro.status}
        </p>

        <h1 className={styles.title}>{content.intro.title}</h1>
        <p className={styles.lead}>{content.intro.lead}</p>

        <div className={styles.actions}>
          <CallButton className={control('primary', 'primary-m', 'ring-dark')}>
            {content.ui.intro.callCta}
          </CallButton>
          <a
            className={control('outline', 'ring-dark')}
            href={content.cv.href}
            download={content.cv.downloadName}
          >
            {content.ui.intro.cvCta}
          </a>
        </div>
      </div>

      <p className={styles.hint} data-hidden-in-focus>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M9 15V3M4 8L9 3L14 8" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        {content.ui.intro.scrollHint}
      </p>
    </>
  );
}
