import { fill, type Contact, type Ui } from '@/content';
import { control } from '@/styles/controls';
import { OpenEntrance } from './OpenEntrance';
import styles from './intercom.module.css';

export type IntercomStatus = 'idle' | 'error' | 'sending' | 'success';

const KEYS_X = [100, 112, 124, 136];
const KEYS_Y = [72, 82, 92];

function boardOf(ui: Ui['intercom'], status: IntercomStatus): string {
  if (status === 'error') return ui.boardError;
  if (status === 'sending') return ui.boardSending;

  return ui.boardIdle;
}

function Device({ ui, status }: { ui: Ui['intercom']; status: IntercomStatus }) {
  return (
    <svg
      className={styles.device}
      data-state={status}
      width="236"
      height="200"
      viewBox="0 0 236 200"
      aria-hidden="true"
    >
      <circle className={styles.halo} cx="118" cy="100" r="96" fill="var(--color-lamp-text)" />

      <g className={styles.waves} stroke="var(--color-lamp-text)" strokeWidth="2" fill="none">
        <path d="M182 112Q192 138 182 164M196 104Q210 138 196 172" strokeLinecap="round" />
        <path d="M54 112Q44 138 54 164M40 104Q26 138 40 172" strokeLinecap="round" />
      </g>

      <rect x="72" y="16" width="92" height="168" rx="10" fill="#1f2430" />
      <rect className={styles.screen} x="84" y="30" width="68" height="24" rx="3" />
      <text className={styles.board} x="118" y="47" textAnchor="middle">
        {boardOf(ui, status)}
      </text>

      <g fill="#5a6075">
        {KEYS_Y.map((y) => KEYS_X.map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2" />))}
      </g>

      <circle className={styles.ring} cx="118" cy="138" r="26" />
      <circle className={styles.rim} cx="118" cy="138" r="22" fill="var(--color-dusk)" />
      <circle className={styles.knob} cx="118" cy="138" r="13" />
    </svg>
  );
}

export function IntercomPanel({
  ui,
  status,
  telegram,
  email,
  newTab,
  titleId,
}: {
  ui: Ui['intercom'];
  status: IntercomStatus;
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

      {status !== 'success' && (
        <p className={styles.lead}>{status === 'sending' ? ui.leadSending : ui.lead}</p>
      )}

      {status === 'success' ? (
        <OpenEntrance label={ui.successDoor} />
      ) : (
        <Device ui={ui} status={status} />
      )}

      <div className={styles.direct}>
        <p className={styles.overline}>{ui.direct}</p>

        {telegram !== undefined && (
          <a
            className={control('link-lamp', 'ring-dark')}
            href={telegram.href}
            target="_blank"
            rel="noreferrer"
          >
            {fill(ui.telegram, { handle: telegram.label })}
            <span className={styles.announce}>{newTab}</span>
          </a>
        )}

        {email !== undefined && (
          <a className={`${control('link-lamp', 'ring-dark')} ${styles.mail}`} href={email.href}>
            {email.label}
          </a>
        )}
      </div>
    </div>
  );
}
