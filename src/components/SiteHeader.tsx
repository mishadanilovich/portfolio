import Link from 'next/link';
import { locale } from 'next/root-params';
import { defaultLocale, getContent, isLocale } from '@/content';
import { garagePath } from '@/garage/projects';
import styles from './header.module.css';
import { GarageLink } from './GarageLink';
import { LanguageSwitch } from './LanguageSwitch';
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
        <LanguageSwitch label={content.ui.header.language} active={active} />

        <OverviewButton label={content.ui.header.overview} />

        <GarageLink href={garagePath(active)} label={content.ui.header.garage} />

        <a className={styles.link} href={content.cv.href} download={content.cv.downloadName}>
          {content.ui.header.cv}
        </a>
      </nav>
    </header>
  );
}
