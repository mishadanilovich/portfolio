import { fill, type Contact, type Ui } from '@/content';
import { control } from '@/styles/controls';
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

function OpenDoor() {
  return (
    <svg
      className={styles.device}
      width="236"
      height="260"
      viewBox="0 0 236 260"
      aria-hidden="true"
    >
      <rect x="40" y="10" width="156" height="210" fill="var(--color-facade)" />
      <rect x="74" y="50" width="88" height="170" fill="#3e3024" />
      <rect x="80" y="56" width="76" height="164" fill="#fbda96" />
      <path d="M116 220V196H132V172H148V148H156" fill="none" stroke="#e0b368" strokeWidth="2.5" />
      <path d="M80 56L108 66V212L80 220Z" fill="var(--color-frame-wood)" />
      <circle cx="104" cy="140" r="2.5" fill="#c9a060" />
      <path d="M80 220H156L210 260H26Z" fill="var(--color-lamp-text)" fillOpacity="0.4" />
      <rect x="170" y="110" width="16" height="28" rx="2" fill="#1f2430" />
      <rect x="172" y="114" width="12" height="6" fill="var(--color-online)" />
      <circle cx="178" cy="130" r="3.5" fill="var(--color-lamp-bright)" />
      <rect x="40" y="2" width="156" height="10" fill="var(--color-slab)" />
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

      {status === 'success' ? <OpenDoor /> : <Device ui={ui} status={status} />}

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
