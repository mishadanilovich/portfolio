import type { ReactNode } from 'react';
import type { Contact, ContactKind, Cv, Roof, Ui } from '@/content';
import { CallButton } from '@/intercom/CallButton';
import { CallIcon } from '@/intercom/CallIcon';
import { control } from '@/styles/controls';
import { CopyContact } from './CopyContact';
import styles from './roof.module.css';

const STATUS_ID = 'roof-status';

const ICONS: Record<ContactKind, ReactNode> = {
  telegram: (
    <>
      <path d="M16 2.5L1.8 8.2L7 10L9 15.5L11.6 11.6L15 14Z" strokeLinejoin="round" />
      <path d="M7 10L13 5.5" />
    </>
  ),
  github: <path d="M6 5L2 9L6 13M12 5L16 9L12 13" />,
  linkedin: (
    <>
      <rect x="2" y="2" width="14" height="14" rx="2" />
      <path d="M5.5 8V13M5.5 5.2V5.4M8.5 13V8M8.5 10Q8.5 8 10.5 8Q12.5 8 12.5 10V13" />
    </>
  ),
  cv: <path d="M9 2V11M5 7.5L9 11.5L13 7.5M3 15H15" />,
  email: (
    <>
      <rect x="2" y="3.5" width="14" height="11" rx="1.5" />
      <path d="M2.5 4.5L9 10L15.5 4.5" />
    </>
  ),
};

function Icon({ kind }: { kind: ContactKind }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <g stroke="var(--icon)" strokeWidth="1.6">
        {ICONS[kind]}
      </g>
    </svg>
  );
}

function ContactLink({
  contact,
  download,
  newTab,
}: {
  contact: Contact;
  download?: string;
  newTab: string;
}) {
  const external = download === undefined && contact.href.startsWith('http');

  return (
    <a
      className={`${styles.contact} ${control('tile', 'tile-line', 'ring-paper')}`}
      href={contact.href}
      download={download}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      <Icon kind={contact.kind} />
      {contact.label}
      {external && <span className={styles.announce}>{newTab}</span>}
    </a>
  );
}

export function RoofPanel({
  roof,
  contacts,
  cv,
  ui,
  newTab,
}: {
  roof: Roof;
  contacts: Contact[];
  cv: Cv;
  ui: Ui['roof'];
  newTab: string;
}) {
  const email = contacts.find((contact) => contact.kind === 'email');
  const rest = contacts.filter((contact) => contact.kind !== 'email');

  return (
    <section className={styles.card} aria-labelledby={STATUS_ID}>
      <div className={styles.head}>
        <p className={styles.kicker}>
          <span className={styles.dot} />
          {roof.kicker}
        </p>
        <h1 id={STATUS_ID} className={styles.status}>
          {roof.status}
        </h1>
      </div>

      <dl className={styles.facts}>
        {roof.facts.map((fact) => (
          <div key={fact.label} className={styles.fact}>
            <dt className={styles.label}>{fact.label}</dt>
            <dd className={styles.value}>{fact.value}</dd>
          </div>
        ))}
      </dl>

      <ul className={styles.contacts} aria-label={ui.contacts}>
        {rest.map((contact) => (
          <li
            key={contact.kind}
            className={contact.kind === 'telegram' ? styles['copy-row'] : undefined}
          >
            <ContactLink
              contact={contact}
              download={contact.kind === 'cv' ? cv.downloadName : undefined}
              newTab={newTab}
            />
            {contact.kind === 'telegram' && (
              <CopyContact
                value={contact.label}
                copy={ui.copyTelegram}
                copied={ui.copiedTelegram}
              />
            )}
          </li>
        ))}

        {email !== undefined && (
          <li className={`${styles['copy-row']} ${styles['email-row']}`}>
            <ContactLink contact={email} newTab={newTab} />
            <CopyContact value={email.label} copy={ui.copyEmail} copied={ui.copiedEmail} />
          </li>
        )}
      </ul>

      <CallButton className={control('primary', 'primary-l', 'ring-paper')}>
        <CallIcon />
        {ui.call}
      </CallButton>
    </section>
  );
}
