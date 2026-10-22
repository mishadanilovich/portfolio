'use client';

import { useEffect, useRef } from 'react';
import type { Ui } from '@/content';
import { CallIcon } from './CallIcon';
import styles from './intercom.module.css';

export function IntercomForm({ ui, onClose }: { ui: Ui['intercom']; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => closeRef.current?.focus(), []);

  return (
    <form className={styles.form}>
      <button
        ref={closeRef}
        type="button"
        className={styles.close}
        aria-label={ui.close}
        onClick={onClose}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3 3L13 13M13 3L3 13" stroke="var(--color-text)" strokeWidth="1.8" />
        </svg>
      </button>

      <p className={styles.group}>
        {ui.group} <span className={styles.note}>{ui.groupNote}</span>
      </p>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="intercom-link">
          {ui.link}
        </label>
        <input
          className={styles.input}
          id="intercom-link"
          name="link"
          type="url"
          placeholder={ui.linkPlaceholder}
        />
      </div>

      <p className={styles.or}>{ui.or}</p>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="intercom-description">
          {ui.description}
        </label>
        <textarea
          className={styles.area}
          id="intercom-description"
          name="description"
          rows={3}
          placeholder={ui.descriptionPlaceholder}
        />
      </div>

      <div className={styles.pair}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="intercom-company">
            {ui.company} <span className={styles.note}>{ui.optional}</span>
          </label>
          <input className={styles.input} id="intercom-company" name="company" type="text" />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="intercom-contact">
            {ui.contact}{' '}
            <span className={styles.star} aria-hidden="true">
              *
            </span>
          </label>
          <input
            className={styles.input}
            id="intercom-contact"
            name="contact"
            type="text"
            placeholder={ui.contactPlaceholder}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="intercom-comment">
          {ui.comment} <span className={styles.note}>{ui.optional}</span>
        </label>
        <textarea className={styles.area} id="intercom-comment" name="comment" rows={2} />
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.submit}>
          <CallIcon />
          {ui.submit}
        </button>
        <button type="button" className={styles.cancel} onClick={onClose}>
          {ui.cancel}
        </button>
        <p className={styles.required}>
          <span className={styles.star} aria-hidden="true">
            *
          </span>{' '}
          {ui.required}
        </p>
      </div>
    </form>
  );
}
