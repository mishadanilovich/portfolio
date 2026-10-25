'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Contact, Locale, Ui } from '@/content';
import { onIntercomRequest } from './events';
import { IntercomFields } from './IntercomForm';
import { IntercomPanel, type IntercomStatus } from './IntercomPanel';
import { IntercomSuccess } from './IntercomSuccess';
import { intercomSchema, type IntercomInput, type IntercomValues } from './schema';
import { sendIntercom } from './send';
import styles from './intercom.module.css';

export interface IntercomBodyProps {
  ui: Ui['intercom'];
  locale: Locale;
  contacts: Contact[];
  newTab: string;
  titleId: string;
  onClose: () => void;
}

export default function IntercomBody({
  ui,
  locale,
  contacts,
  newTab,
  titleId,
  onClose,
}: IntercomBodyProps) {
  const [sending, setSending] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const [sent, setSent] = useState<IntercomValues | null>(null);

  const form = useForm<IntercomInput, unknown, IntercomValues>({
    resolver: zodResolver(intercomSchema(ui.errors)),
    defaultValues: { locale, link: '', description: '', company: '', contact: '', comment: '' },
  });

  const submit = form.handleSubmit(async (values, event) => {
    const element = event?.target;
    const website =
      element instanceof HTMLFormElement ? String(new FormData(element).get('website') ?? '') : '';

    setFailure(null);
    setSending(true);

    const reply = await sendIntercom({ ...values, website });

    setSending(false);

    if (reply.ok) {
      setSent(values);
      return;
    }

    for (const [field, message] of Object.entries(reply.fields ?? {})) {
      form.setError(field as keyof IntercomInput, { type: 'server', message });
    }

    setFailure(reply.fields === undefined ? (reply.message ?? ui.errors.send) : null);
  });

  const again = () => {
    form.reset();
    setSent(null);
  };

  useEffect(
    () =>
      onIntercomRequest(() => {
        setFailure(null);
        form.reset();
        setSent(null);
      }),
    [form],
  );

  const invalid = Object.keys(form.formState.errors).length > 0 || failure !== null;

  const status: IntercomStatus =
    sent !== null ? 'success' : sending ? 'sending' : invalid ? 'error' : 'idle';

  return (
    <>
      <IntercomPanel
        ui={ui}
        status={status}
        telegram={contacts.find((contact) => contact.kind === 'telegram')}
        email={contacts.find((contact) => contact.kind === 'email')}
        newTab={newTab}
        titleId={titleId}
      />

      {sent === null ? (
        <form
          className={styles.form}
          data-sending={sending ? '' : undefined}
          aria-busy={sending}
          onSubmit={submit}
        >
          <IntercomFields
            ui={ui}
            locale={locale}
            form={form}
            sending={sending}
            failure={failure}
            onClose={onClose}
          />
        </form>
      ) : (
        <div className={styles.form}>
          <IntercomSuccess ui={ui} sent={sent} onClose={onClose} onAgain={again} />
        </div>
      )}
    </>
  );
}
