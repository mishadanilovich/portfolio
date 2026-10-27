'use client';

import { Fragment } from 'react';
import { handleOf, type Ui } from '@/content';
import { control } from '@/styles/controls';
import styles from './intercom.module.css';
import type { IntercomValues } from './schema';

export function IntercomSuccess({
  ui,
  sent,
  onClose,
  onAgain,
}: {
  ui: Ui['intercom'];
  sent: IntercomValues;
  onClose: () => void;
  onAgain: () => void;
}) {
  const vacancy = sent.link === '' ? sent.description : handleOf(sent.link);

  const rows = [
    { label: ui.sentVacancy, value: vacancy },
    { label: ui.sentCompany, value: sent.company },
    { label: ui.sentContact, value: sent.contact },
  ].filter((row) => row.value !== '');

  return (
    <>
      <button
        type="button"
        className={`${styles.close} ${control('close', 'ring-paper')}`}
        aria-label={ui.close}
        onClick={onClose}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3 3L13 13M13 3L3 13" stroke="var(--color-text)" strokeWidth="1.8" />
        </svg>
      </button>

      <div className={styles.received} role="status">
        <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
          <circle cx="28" cy="28" r="27" fill="var(--color-success)" />
          <path
            d="M17 29L25 37L40 20"
            fill="none"
            stroke="var(--color-white)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <h3 className={styles['received-title']}>{ui.successTitle}</h3>
        <p className={styles['received-text']}>{ui.successText}</p>
      </div>

      <dl className={styles.sent}>
        {rows.map((row) => (
          <Fragment key={row.label}>
            <dt className={styles['sent-label']}>{row.label}</dt>
            <dd className={styles['sent-value']}>{row.value}</dd>
          </Fragment>
        ))}
      </dl>

      <div className={styles.actions}>
        <button type="button" className={control('dark', 'ring-paper')} onClick={onClose}>
          {ui.successHome}
        </button>
        <button
          type="button"
          className={control('text', 'text-box', 'ring-paper')}
          onClick={onAgain}
        >
          {ui.successAgain}
        </button>
      </div>
    </>
  );
}
