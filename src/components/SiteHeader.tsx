import Link from 'next/link';
import { locale } from 'next/root-params';
import { defaultLocale, getContent, isLocale } from '@/content';
import { CallButton } from '@/intercom/CallButton';
import { CallIcon } from '@/intercom/CallIcon';
import { control } from '@/styles/controls';
import styles from './header.module.css';
import { LanguageSwitch } from './LanguageSwitch';
import { Logo } from './Logo';

export async function SiteHeader() {
  const current = await locale();
  const active = isLocale(current) ? current : defaultLocale;
  const content = getContent(active);

  return (
    <header className={styles.header}>
      <Link href={`/${active}`} className={`${styles.home} ${control('ring-dark')}`}>
        <Logo />
        <span className={styles.identity}>
          <span className={styles.name}>{content.person.name}</span>
          <span className={styles.role}>{content.person.role}</span>
        </span>
      </Link>

      <nav className={styles.nav} aria-label={content.ui.header.nav}>
        <LanguageSwitch label={content.ui.header.language} active={active} />

        <a
          className={control('nav', 'ring-dark')}
          href={content.cv.href}
          download={content.cv.downloadName}
        >
          {content.ui.header.cv}
        </a>

        <CallButton className={control('primary', 'primary-s', 'ring-dark')}>
          <CallIcon />
          {content.ui.header.call}
        </CallButton>
      </nav>
    </header>
  );
}
