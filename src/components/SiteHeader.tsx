import Link from 'next/link';
import { locale } from 'next/root-params';
import { defaultLocale, getContent, isLocale, locales } from '@/content';
import styles from './header.module.css';
import { Logo } from './Logo';
import { OverviewButton } from './OverviewButton';

export async function SiteHeader() {
  const current = await locale();
  const active = isLocale(current) ? current : defaultLocale;
  const content = getContent(active);

  return (
    <header className={styles.header}>
      <Link href={`/${active}`} className={styles.home}>
        <Logo />
        <span className={styles.identity}>
          <span className={styles.name}>{content.person.name}</span>
          <span className={styles.role}>{content.person.role}</span>
        </span>
      </Link>

      <nav className={styles.nav} aria-label={content.ui.header.nav}>
        <div className={styles.language} role="group" aria-label={content.ui.header.language}>
          {locales.map((item) => (
            <Link
              key={item}
              href={`/${item}`}
              className={styles.lang}
              aria-current={item === active ? 'true' : undefined}
            >
              {item.toUpperCase()}
            </Link>
          ))}
        </div>

        <OverviewButton label={content.ui.header.overview} />

        <a className={styles.link} href={content.cv.href} download={content.cv.downloadName}>
          {content.ui.header.cv}
        </a>
      </nav>
    </header>
  );
}
