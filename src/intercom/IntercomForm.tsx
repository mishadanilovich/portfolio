'use client';

import { useEffect, useRef } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { fill, type Locale, type Ui } from '@/content';
import { CallIcon } from './CallIcon';
import styles from './intercom.module.css';
import type { IntercomInput, IntercomValues } from './schema';

const VACANCY_ERROR = 'intercom-vacancy-error';
const CONTACT_ERROR = 'intercom-contact-error';

export type IntercomForm = UseFormReturn<IntercomInput, unknown, IntercomValues>;

function Alert({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="var(--color-error)" />
      <path
        d="M10 5V11M10 14V14.5"
        stroke="var(--color-white)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      className={styles.spinner}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="9"
        cy="9"
        r="7"
        stroke="var(--color-on-lamp)"
        strokeOpacity="0.25"
        strokeWidth="2"
      />
      <path
        d="M9 2A7 7 0 0 1 16 9"
        stroke="var(--color-on-lamp)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function capitalized(text: string, locale: Locale): string {
  return text.charAt(0).toLocaleUpperCase(locale) + text.slice(1);
}

function Message({ id, text }: { id: string; text: string }) {
  return (
    <p className={styles.message} id={id}>
      <Alert className={styles['message-icon']} />
      {text}
    </p>
  );
}

export function IntercomFields({
  ui,
  locale,
  form,
  sending,
  failure,
  onClose,
}: {
  ui: Ui['intercom'];
  locale: Locale;
  form: IntercomForm;
  sending: boolean;
  failure: string | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { errors } = form.formState;

  useEffect(() => closeRef.current?.focus(), []);

  const vacancy = errors.link?.message ?? errors.description?.message;
  const contact = errors.contact?.message;

  const listed = [
    vacancy === undefined ? null : { label: ui.summaryVacancy, field: 'link' as const },
    contact === undefined ? null : { label: ui.summaryContact, field: 'contact' as const },
  ].filter((entry) => entry !== null);

  const count = listed.length;
  const plural = new Intl.PluralRules(locale).select(count);
  const summary = fill(ui.summary, { count, fields: ui.fields[plural] ?? ui.fields.other });

  return (
    <>
      {!sending && (
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
      )}

      {count > 0 || failure !== null ? (
        <div className={styles.alert} role="alert">
          <Alert className={styles['alert-icon']} />
          <p className={styles['alert-text']}>
            <b>{failure ?? summary}</b>
            {listed.map((entry, index) => (
              <span key={entry.field}>
                {' '}
                <a
                  className={styles['alert-link']}
                  href={`#intercom-${entry.field}`}
                  onClick={(event) => {
                    event.preventDefault();
                    form.setFocus(entry.field);
                  }}
                >
                  {index === 0 ? capitalized(entry.label, locale) : entry.label}
                </a>
                {index < count - 1 ? ', ' : '.'}
              </span>
            ))}
          </p>
        </div>
      ) : (
        <p className={styles.group}>
          {ui.group} <span className={styles.note}>{ui.groupNote}</span>
        </p>
      )}

      <div className={styles.vacancy} data-invalid={vacancy !== undefined ? '' : undefined}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="intercom-link">
            {ui.link}
          </label>
          <input
            {...form.register('link')}
            className={styles.input}
            id="intercom-link"
            type="url"
            placeholder={ui.linkPlaceholder}
            disabled={sending}
            aria-invalid={vacancy !== undefined || errors.link !== undefined}
            aria-describedby={vacancy === undefined ? undefined : VACANCY_ERROR}
          />
        </div>

        <p className={styles.or}>{ui.or}</p>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="intercom-description">
            {ui.description}
          </label>
          <textarea
            {...form.register('description')}
            className={styles.area}
            id="intercom-description"
            rows={3}
            placeholder={ui.descriptionPlaceholder}
            disabled={sending}
            aria-invalid={vacancy !== undefined}
            aria-describedby={vacancy === undefined ? undefined : VACANCY_ERROR}
          />
        </div>

        {vacancy !== undefined && <Message id={VACANCY_ERROR} text={vacancy} />}
      </div>

      <div className={styles.pair}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="intercom-company">
            {ui.company} <span className={styles.note}>{ui.optional}</span>
          </label>
          <input
            {...form.register('company')}
            className={styles.input}
            id="intercom-company"
            type="text"
            disabled={sending}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="intercom-contact">
            {ui.contact}{' '}
            <span className={styles.star} aria-hidden="true">
              *
            </span>
          </label>
          <input
            {...form.register('contact')}
            className={styles.input}
            id="intercom-contact"
            type="text"
            placeholder={ui.contactPlaceholder}
            disabled={sending}
            aria-invalid={contact !== undefined}
            aria-describedby={contact === undefined ? undefined : CONTACT_ERROR}
          />
          {contact !== undefined && <Message id={CONTACT_ERROR} text={contact} />}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="intercom-comment">
          {ui.comment} <span className={styles.note}>{ui.optional}</span>
        </label>
        <textarea
          {...form.register('comment')}
          className={styles.area}
          id="intercom-comment"
          rows={2}
          disabled={sending}
        />
      </div>

      <input
        className={styles.honeypot}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className={styles.actions}>
        <button type="submit" className={styles.submit} disabled={sending}>
          {sending ? <Spinner /> : <CallIcon />}
          {sending ? ui.sending : ui.submit}
        </button>

        {sending ? (
          <p className={styles.note} role="status">
            {ui.sendingNote}
          </p>
        ) : (
          <>
            <button type="button" className={styles.cancel} onClick={onClose}>
              {ui.cancel}
            </button>
            <p className={styles.required}>
              <span className={styles.star} aria-hidden="true">
                *
              </span>{' '}
              {ui.required}
            </p>
          </>
        )}
      </div>
    </>
  );
}
