import { fill, type Contact, type Ui } from '@/content';
import styles from './intercom.module.css';

const KEYS_X = [100, 112, 124, 136];
const KEYS_Y = [72, 82, 92];

function Keys() {
  return (
    <g fill="#5a6075">
      {KEYS_Y.map((y) => KEYS_X.map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2" />))}
    </g>
  );
}

export function IntercomPanel({
  ui,
  telegram,
  email,
  newTab,
  titleId,
}: {
  ui: Ui['intercom'];
  telegram: Contact | undefined;
  email: Contact | undefined;
  newTab: string;
  titleId: string;
}) {
  return (
    <div className={styles.panel}>
      <h2 id={titleId} className={styles.title}>
        {ui.title}
      </h2>
      <p className={styles.lead}>{ui.lead}</p>

      <svg
        className={styles.device}
        width="236"
        height="200"
        viewBox="0 0 236 200"
        aria-hidden="true"
      >
        <circle cx="118" cy="100" r="96" fill="var(--color-lamp-text)" fillOpacity="0.08" />
        <rect x="72" y="16" width="92" height="168" rx="10" fill="#1f2430" />
        <rect x="84" y="30" width="68" height="24" rx="3" fill="#3a4258" />
        <text className={styles.board} x="118" y="47" textAnchor="middle">
          {ui.boardIdle}
        </text>
        <Keys />
        <circle
          cx="118"
          cy="138"
          r="22"
          fill="var(--color-dusk)"
          stroke="var(--color-lamp)"
          strokeWidth="2"
        />
        <circle cx="118" cy="138" r="13" fill="var(--color-lamp)" />
      </svg>

      <div className={styles.direct}>
        <p className={styles.overline}>{ui.direct}</p>

        {telegram !== undefined && (
          <a className={styles.contact} href={telegram.href} target="_blank" rel="noreferrer">
            {fill(ui.telegram, { handle: telegram.label })}
            <span className={styles.announce}>{newTab}</span>
          </a>
        )}

        {email !== undefined && (
          <a className={`${styles.contact} ${styles.mail}`} href={email.href}>
            {email.label}
          </a>
        )}
      </div>
    </div>
  );
}
