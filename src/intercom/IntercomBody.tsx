'use client';

import type { Contact, Ui } from '@/content';
import { IntercomForm } from './IntercomForm';
import { IntercomPanel } from './IntercomPanel';

export interface IntercomBodyProps {
  ui: Ui['intercom'];
  contacts: Contact[];
  newTab: string;
  titleId: string;
  onClose: () => void;
}

export default function IntercomBody({
  ui,
  contacts,
  newTab,
  titleId,
  onClose,
}: IntercomBodyProps) {
  return (
    <>
      <IntercomPanel
        ui={ui}
        telegram={contacts.find((contact) => contact.kind === 'telegram')}
        email={contacts.find((contact) => contact.kind === 'email')}
        newTab={newTab}
        titleId={titleId}
      />
      <IntercomForm ui={ui} onClose={onClose} />
    </>
  );
}
