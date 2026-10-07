import type { Content } from './types';

export const en: Content = {
  locale: 'en',

  person: {
    name: 'Mihail Danilovich',
    role: 'Senior Frontend Developer',
  },

  intro: {
    status: 'Open to new projects',
    title: 'Portfolio house',
    lead: '5+ years of commercial frontend development experience.',
  },

  basement: {
    kicker: 'Where it began',
    institution: 'Minsk Radio Engineering College (BSUIR branch)',
    faculty: 'Faculty of Computer Science',
    period: '09.2018 — 02.2022',
  },

  floors: [
    {
      floor: 2,
      slug: 'mosgosexpertiza',
      period: '05.2021 — 05.2022',
      title: 'Mosgosexpertiza',
      role: 'Junior Frontend Developer',
      description:
        'Public services portal of the Moscow State Expert Review for submitting design documentation for review.',
      note: 'Built application forms with Formik and Yup and registry tables with sorting, filtering, and pagination, integrated with a REST API.',
      stack: ['React', 'TypeScript', 'Redux', 'Formik', 'Yup', 'REST API'],
      achievements: [],
      responsibilities: [],
    },
    {
      floor: 3,
      slug: 'flowhealth',
      period: '05.2022 — 06.2023',
      title: 'FlowHealth',
      role: 'Middle Frontend Developer',
      description:
        'Healthcare platform connecting doctors, healthcare providers, and patients, with vaccination program management. Corporate clients, including Netflix, used the portal to vaccinate their employees.',
      stack: [
        'React',
        'TypeScript',
        'Redux',
        'Redux-Saga',
        'RTK Query',
        'styled-components',
        'React Hook Form',
        'Storybook',
        'Jest',
        'React Testing Library',
      ],
      achievements: [
        {
          title: 'Internal UI kit',
          text: 'Created an internal UI kit with separate entry points for tree-shaking, a public API, Storybook, and tests. Used across several domain projects, it eliminated component duplication and sped up the development of new interfaces.',
        },
        {
          title: 'Styling migration',
          text: 'Carried out most of the migration from react-jss to styled-components: moved components to the new styling system and fixed issues with inconsistent style application.',
        },
      ],
      responsibilities: [
        'Developed vaccination management interfaces: booking, registration, and tracking flows for doctors, healthcare providers, and patients.',
        'Implemented asynchronous multi-step flows and side-effect handling with Redux-Saga.',
        'Built reusable, accessible UI components (React, TypeScript, styled-components) with unit tests (Jest, RTL) and Storybook documentation.',
        'Designed features together with the backend team before development: data flows, API contracts, requirements, blockers.',
      ],
    },
    {
      floor: 4,
      slug: 'breedshow',
      period: '06.2023 — 11.2023',
      title: 'BreedShow',
      role: 'Middle+ Frontend Developer',
      description:
        'Platform for choosing purebred animals with verified pedigrees (breed.show). Combines a CRM for dog and cat breeders, a marketplace for pet products and services, and a social network for breeders and animal lovers.',
      stack: [
        'React',
        'TypeScript',
        'Redux Toolkit',
        'RTK Query',
        'React Router',
        'WebSocket',
        'MUI',
        'React Hook Form',
        'Yup',
        'Jest',
      ],
      achievements: [
        {
          title: 'MVP architecture',
          text: 'Made key technical decisions: designed a Feature-Sliced Design architecture split into CRM, marketplace, and social network modules, and chose the stack for the MVP that became the foundation of the product running today.',
        },
        {
          title: 'Team process',
          text: 'Set up the project from scratch and established the frontend team process: code standards (ESLint, Prettier, Stylelint, Husky), a Kanban workflow with task breakdown and assignment, and regular code review.',
        },
      ],
      responsibilities: [
        'Developed CRM modules for breeders: tracking of animals, litters, and sales.',
        'Implemented real-time chats between users over WebSocket.',
        'Built a publications feed with infinite scroll and a marketplace catalog with filtering by breed, color, sex, and other parameters.',
        'Ran regular frontend team syncs to align decisions and supported junior developers.',
      ],
    },
    {
      floor: 5,
      slug: 'azerbaijan-tax-system',
      period: '11.2023 — 08.2025',
      title: 'Azerbaijan Tax System',
      role: 'Senior Frontend Developer',
      description:
        'Platform of the Azerbaijan tax service for automating tax administration. Tax service employees run internal processes in it, while taxpayers submit applications and prepare documents online.',
      stack: [
        'React',
        'TypeScript',
        'React Router',
        'Redux Toolkit',
        'RTK Query',
        'Tailwind CSS',
        'Sass',
        'React Hook Form',
        'Yup',
        'react-window',
        'ahooks',
        'i18next',
        'Storybook',
        'Vitest',
        'React Testing Library',
        'Playwright',
        'GitLab',
      ],
      achievements: [
        {
          title: '10,000+ records',
          text: 'Optimized a documents table with 10,000+ records by introducing virtualization and cursor-based pagination. Time to first content dropped from 2.4 s to 0.4 s, the number of DOM nodes decreased 40x, and the initial payload shrank from 3 MB to 20 KB.',
        },
        {
          title: '5 services to TypeScript',
          text: 'Migrated 5 services from JavaScript to TypeScript in strict mode. Found and fixed several hidden bugs, including missing null/undefined checks and incorrect API response handling, and removed dead code.',
        },
        {
          title: 'Complex forms',
          text: 'Optimized the performance of complex forms with deep nesting and inter-field dependencies by splitting them into isolated subforms and lazy-loading sections. Input latency dropped by about 40%, and re-renders per change decreased 1.5x.',
        },
      ],
      responsibilities: [
        'Covered core utilities and components with unit tests (Vitest, RTL).',
        'Evolved Storybook: new stories, interactive scenarios with play functions, component documentation.',
        'Conducted peer code reviews: architectural decisions, code style, potential bugs, performance issues.',
        'Took part in the full task lifecycle, from requirements discussion and estimation (planning poker) to release.',
      ],
    },
    {
      floor: 6,
      slug: 'vk-hr-tek',
      period: '09.2025 — 04.2026',
      title: 'VK HR Tek',
      role: 'Senior Frontend Developer',
      description:
        'VK’s corporate platform for HR electronic document management. Enables large organizations to create, approve, sign, and store legally binding HR documents electronically.',
      stack: [
        'React',
        'TypeScript',
        'Redux Toolkit',
        'RTK Query',
        'OpenAPI',
        'CSS Modules',
        'Tailwind CSS',
        'WebSocket',
        'Web Workers',
        'react-window',
        'InversifyJS',
        'CASL',
        'React Final Form',
        'class-validator',
        'class-transformer',
        'i18next',
        'dnd-kit',
        'Storybook',
        'Jest',
        'React Testing Library',
      ],
      achievements: [
        {
          title: 'Approval route tree',
          text: 'Built an interactive visualization of multi-stage approval routes as a node tree with panning and zooming: wrote a custom recursive layout algorithm, moved the computation to a Web Worker, and added render memoization. The UI stays responsive even on large, deeply nested routes.',
        },
        {
          title: 'Infinite loading',
          text: 'Designed a reusable infinite-loading mechanism with virtualization and unified all document and notification lists on top of it.',
        },
        {
          title: 'AI code review',
          text: 'Introduced AI-assisted code review in the team: guidelines, prompts, and reusable rules, which sped up reviews and aligned code standards.',
        },
        {
          title: '75% → 83%',
          text: 'Increased unit and integration test coverage from 75% to 83%.',
        },
      ],
      responsibilities: [
        'Designed and implemented real-time notifications over WebSocket.',
        'Integrated modules with the backend using a contract-first approach via services and DTOs generated from OpenAPI.',
        'Developed complex multi-step forms with client-side validation and typed data mapping (React Final Form, class-validator, class-transformer).',
        'Built features on top of a CASL access model (RBAC and ABAC).',
        'Developed UI components with DI via InversifyJS, evolved the shared component library in Storybook, implemented i18next localization.',
        'Created an internship program for the company’s frontend interns (3 interns).',
      ],
    },
  ],

  petProjects: [
    {
      slug: 'fridgemind',
      title: 'FridgeMind',
      description: 'PWA for family meal and grocery planning.',
      stack: ['Next.js', 'Prisma', 'PostgreSQL', 'Supabase', 'Claude API', 'Serwist', 'IndexedDB'],
      achievements: [
        { text: 'Data access control via Row-Level Security.' },
        { text: 'Real-time sync across devices.' },
        { text: 'Offline mode with Serwist and IndexedDB.' },
        { text: 'Grocery recognition from photos via Claude Vision.' },
      ],
      href: 'https://github.com/mishadanilovich/fridgemind',
      hrefLabel: 'github.com/mishadanilovich/fridgemind',
    },
    {
      slug: 'coffee-shop',
      title: 'Coffee Shop',
      description: 'Coffee shop website with a cart, blog, and online payments.',
      stack: ['Next.js', 'NestJS', 'TypeORM', 'Stripe', 'GitHub Actions'],
      achievements: [
        { text: 'Custom JWT authentication in NestJS.' },
        { text: 'Stripe payments for the cart.' },
        { text: 'CI on GitHub Actions with unit tests.' },
      ],
      href: 'https://github.com/mishadanilovich/coffee-shop',
      hrefLabel: 'github.com/mishadanilovich/coffee-shop',
    },
  ],

  roof: {
    kicker: 'Roof · status',
    status: 'Open to new projects',
    facts: [
      { label: 'Location', value: 'Belarus (Minsk), open to relocation' },
      { label: 'Format', value: 'Office, remote, hybrid' },
      { label: 'Experience', value: '5+ years' },
      { label: 'Languages', value: 'English — B2, Russian — native' },
    ],
  },

  contacts: [
    { kind: 'telegram', label: '@f0pp1', href: 'https://t.me/f0pp1' },
    { kind: 'github', label: 'GitHub', href: 'https://github.com/mishadanilovich' },
    { kind: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/dmisha/' },
    {
      kind: 'cv',
      label: 'Resume, PDF',
      href: '/cv/Mihail-Danilovich-Senior-Frontend-Developer-EN.pdf',
    },
    {
      kind: 'email',
      label: 'danilovich36misha@gmail.com',
      href: 'mailto:danilovich36misha@gmail.com',
      copyable: true,
    },
  ],

  cv: {
    href: '/cv/Mihail-Danilovich-Senior-Frontend-Developer-EN.pdf',
    downloadName: 'Mihail-Danilovich-Senior-Frontend-Developer-EN.pdf',
  },

  ui: {
    header: {
      nav: 'Main navigation',
      language: 'Language',
      garage: 'Garage',
      cv: 'Resume',
      call: 'Call',
      help: 'How the site works',
    },
    intro: {
      callCta: 'Ring the intercom',
      cvCta: 'Download resume',
      scrollHint: 'Scroll up — the camera climbs the floors',
    },
    firstVisit: {
      title: 'First time here?',
      text: 'The house is a career: every floor is a project. Press “?” to see what’s where.',
      legend: 'Show legend',
      dismiss: 'Got it',
    },
    scene: {
      floorPlaque: 'Floor {floor} · {period}',
      floorAria: 'Floor {floor} — {title}, {period}',
      enterApartment: 'Enter →',
      basementPlaque: 'Basement · {period}',
      doorTooltipTitle: 'Intercom',
      doorTooltipAction: 'Leave a job opening →',
      doorAria: 'Door and intercom — leave a job opening',
      garageTooltip: 'Garage · 2 pet projects',
      garageAria: 'Garage — pet projects',
    },
    miniMap: {
      label: 'Floor mini-map',
      roof: 'Roof — contacts',
      floor: 'Floor {floor}',
      entrance: 'Entrance and intercom',
      entranceCurrent: 'Entrance and intercom, you are here',
      basement: 'Basement — where it began',
      garage: 'Garage — pet projects',
    },
  },
};
