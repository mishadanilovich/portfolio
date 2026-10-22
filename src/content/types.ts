export const locales = ['ru', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ru';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export interface Achievement {
  title?: string;
  text: string;
}

export interface Floor {
  floor: number;
  slug: string;
  period: string;
  title: string;
  role: string;
  description: string;
  note?: string;
  stack: string[];
  achievements: Achievement[];
  responsibilities: string[];
}

export interface PetProject {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  achievements: Achievement[];
  href: string;
  hrefLabel: string;
}

export interface Basement {
  kicker: string;
  institution: string;
  faculty: string;
  period: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface Roof {
  kicker: string;
  status: string;
  facts: Fact[];
}

export type ContactKind = 'telegram' | 'github' | 'linkedin' | 'cv' | 'email';

export interface Contact {
  kind: ContactKind;
  label: string;
  href: string;
  copyable?: boolean;
}

export interface Cv {
  href: string;
  downloadName: string;
}

export interface IntercomErrors {
  vacancy: string;
  link: string;
  contact: string;
  long: string;
  send: string;
  rate: string;
}

export interface Ui {
  newTab: string;
  header: {
    nav: string;
    language: string;
    overview: string;
    garage: string;
    cv: string;
    call: string;
    help: string;
  };
  intro: {
    callCta: string;
    cvCta: string;
    scrollHint: string;
  };
  firstVisit: {
    title: string;
    text: string;
    legend: string;
    dismiss: string;
  };
  scene: {
    exitHouse: string;
    floorPlaque: string;
    floorAria: string;
    enterApartment: string;
    basementPlaque: string;
    doorTooltipTitle: string;
    doorTooltipAction: string;
    doorAria: string;
    garageTooltip: string;
    garageAria: string;
  };
  miniMap: {
    label: string;
    roof: string;
    floor: string;
    entrance: string;
    basement: string;
    garage: string;
  };
  room: {
    floor: string;
    kicker: string;
    stack: string;
    responsibilities: string;
    achievements: string;
    windowAria: string;
  };
  roof: {
    sign: string;
    signNote: string;
    contacts: string;
    copy: string;
    copied: string;
    call: string;
  };
  intercom: {
    title: string;
    lead: string;
    boardIdle: string;
    direct: string;
    telegram: string;
    close: string;
    group: string;
    groupNote: string;
    link: string;
    linkPlaceholder: string;
    or: string;
    description: string;
    descriptionPlaceholder: string;
    company: string;
    optional: string;
    contact: string;
    contactPlaceholder: string;
    comment: string;
    submit: string;
    cancel: string;
    required: string;
    errors: IntercomErrors;
  };
  project: {
    back: string;
    counter: string;
    stack: string;
    achievements: string;
    open: string;
    note: string;
    next: string;
    prev: string;
    sceneAria: string;
  };
  garage: {
    bar: string;
    barList: string;
    kicker: string;
    title: string;
    lead: string;
    sceneAria: string;
    more: string;
    github: string;
  };
}

export interface Content {
  locale: Locale;
  person: {
    name: string;
    role: string;
  };
  intro: {
    status: string;
    title: string;
    lead: string;
  };
  basement: Basement;
  floors: Floor[];
  petProjects: PetProject[];
  roof: Roof;
  contacts: Contact[];
  cv: Cv;
  ui: Ui;
}
