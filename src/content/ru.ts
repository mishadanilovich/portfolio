import type { Content } from './types';

export const ru: Content = {
  locale: 'ru',

  person: {
    name: 'Михаил Данилович',
    role: 'Senior Frontend Developer',
  },

  intro: {
    status: 'Открыт к новым проектам',
    title: 'Дом-портфолио',
    lead: '5+ лет опыта в коммерческой frontend-разработке.',
  },

  basement: {
    kicker: 'Начало пути',
    institution: 'Филиал БГУИР — МРК',
    faculty: 'Факультет компьютерных наук',
    period: '09.2018 — 02.2022',
  },

  floors: [
    {
      floor: 2,
      slug: 'mosgosexpertiza',
      period: '05.2021 — 05.2022',
      title: 'Мосгосэкспертиза',
      role: 'Junior Frontend Developer',
      description:
        'Портал государственных услуг для подачи заявлений на экспертизу проектной документации.',
      note: 'Разрабатывал формы на Formik и Yup, таблицы реестров с сортировкой, фильтрацией и пагинацией, интегрировал их с REST API.',
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
        'Медицинская платформа, связывающая врачей, поставщиков услуг и пациентов, с управлением программами вакцинации. Корпоративные клиенты, включая Netflix, использовали портал для вакцинации сотрудников.',
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
          title: 'Внутренний UI-kit',
          text: 'Создал внутренний UI-kit: сборка с отдельными точками входа для tree-shaking, публичный API, Storybook и тесты. Используется в нескольких доменных проектах, устранил дублирование компонентов и ускорил разработку новых интерфейсов.',
        },
        {
          title: 'Миграция стилей',
          text: 'Выполнил основную часть миграции с react-jss на styled-components: перевёл компоненты на новую систему стилизации и устранил проблемы с нестабильным применением стилей.',
        },
      ],
      responsibilities: [
        'Разработка интерфейсов управления вакцинацией: сценарии записи, регистрации и отслеживания для врачей, поставщиков медицинских услуг и пациентов.',
        'Реализация асинхронных многоэтапных сценариев и обработка сайд-эффектов на Redux-Saga.',
        'Разработка переиспользуемых доступных UI-компонентов (React, TypeScript, styled-components) с unit-тестами (Jest, RTL) и документацией в Storybook.',
        'Совместное с бэкендом проектирование фич до начала разработки: потоки данных, API-контракты, требования, блокеры.',
      ],
    },
    {
      floor: 4,
      slug: 'breedshow',
      period: '06.2023 — 11.2023',
      title: 'BreedShow',
      role: 'Middle+ Frontend Developer',
      description:
        'Платформа для выбора породистых животных с проверенным происхождением (breed.show). Объединяет CRM для питомников собак и кошек, маркетплейс зоотоваров и услуг и социальную сеть для заводчиков и любителей животных.',
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
          title: 'Архитектура MVP',
          text: 'Принимал ключевые технические решения: спроектировал архитектуру на основе Feature-Sliced Design с разделением на модули CRM, маркетплейса и социальной сети, подобрал стек для MVP, ставшего основой работающего сейчас продукта.',
        },
        {
          title: 'Процесс команды',
          text: 'Настроил проект с нуля и выстроил процесс фронтенд-команды: стандарты кода (ESLint, Prettier, Stylelint, Husky), Kanban с декомпозицией и распределением задач, регулярное код-ревью.',
        },
      ],
      responsibilities: [
        'Разработка модулей CRM для питомников: учёт животных, помётов и продаж.',
        'Реализация чатов между пользователями в реальном времени на WebSocket.',
        'Разработка ленты публикаций с бесконечной подгрузкой и каталога маркетплейса с фильтрацией по породе, окрасу, полу и другим параметрам.',
        'Регулярные встречи фронтенд-команды для синхронизации решений, помощь junior-разработчикам.',
      ],
    },
    {
      floor: 5,
      slug: 'azerbaijan-tax-system',
      period: '11.2023 — 08.2025',
      title: 'Налоговая система Азербайджана',
      role: 'Senior Frontend Developer',
      description:
        'Платформа налоговой службы Азербайджана для автоматизации налогового администрирования. Сотрудники службы ведут в ней внутренние процессы, а налогоплательщики онлайн подают заявки и оформляют документы.',
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
          title: '10 000+ записей',
          text: 'Оптимизировал таблицу документов с 10 000+ записей: внедрил виртуализацию и курсорную пагинацию. Время до первого контента сократилось с 2,4 до 0,4 с, количество DOM-узлов уменьшилось в 40 раз, объём первичной загрузки — с 3 МБ до 20 КБ.',
        },
        {
          title: '5 сервисов на TypeScript',
          text: 'Мигрировал 5 сервисов с JavaScript на TypeScript в strict mode, попутно нашёл и исправил скрытые баги (пропущенные проверки на null/undefined, неверная обработка ответа API), удалил мёртвый код.',
        },
        {
          title: 'Сложные формы',
          text: 'Оптимизировал производительность сложных форм с глубокой вложенностью: разбил их на изолированные подформы и добавил ленивую подгрузку секций. Задержка ввода снизилась примерно на 40%, число ререндеров на изменение — в 1,5 раза.',
        },
      ],
      responsibilities: [
        'Покрытие unit-тестами ключевых утилит и компонентов (Vitest, RTL).',
        'Развитие Storybook: новые stories, интерактивные сценарии на play-функциях, документация компонентов.',
        'Кросс-ревью кода: архитектурные решения, code style, потенциальные баги, производительность.',
        'Участие в полном цикле задач: от обсуждения требований и оценки (planning poker) до релиза.',
      ],
    },
    {
      floor: 6,
      slug: 'vk-hr-tek',
      period: '09.2025 — 04.2026',
      title: 'VK HR Tek',
      role: 'Senior Frontend Developer',
      description:
        'Корпоративная платформа кадрового электронного документооборота (КЭДО) от VK. Позволяет крупным организациям создавать, согласовывать, подписывать и хранить юридически значимые кадровые документы в электронном виде.',
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
          title: 'Дерево согласований',
          text: 'Разработал интерактивную визуализацию многоэтапного маршрута согласования в виде дерева узлов с перемещением и масштабированием: собственный рекурсивный алгоритм раскладки, расчёт в Web Worker, мемоизация рендеринга. Интерфейс не подвисает даже на больших маршрутах с глубокой вложенностью.',
        },
        {
          title: 'Бесконечная подгрузка',
          text: 'Спроектировал переиспользуемый механизм бесконечной подгрузки с виртуализацией и унифицировал на его основе все списки документов и уведомлений.',
        },
        {
          title: 'AI-код-ревью',
          text: 'Внедрил в команде AI-ассистированное код-ревью: гайдлайны, промпты, переиспользуемые правила — ускорило ревью и выровняло стандарты кода.',
        },
        {
          title: '75% → 83%',
          text: 'Увеличил покрытие unit- и интеграционными тестами с 75% до 83%.',
        },
      ],
      responsibilities: [
        'Проектирование и реализация уведомлений в реальном времени через WebSocket.',
        'Интеграция модулей с бэкендом в contract-first подходе через генерируемые из OpenAPI сервисы и DTO.',
        'Разработка сложных многоэтапных форм с клиентской валидацией и типизированным маппингом данных (React Final Form, class-validator, class-transformer).',
        'Разработка функциональности с учётом модели доступа CASL (RBAC и ABAC).',
        'Разработка UI-компонентов с DI через InversifyJS, развитие библиотеки компонентов в Storybook, мультиязычность на i18next.',
        'Разработка плана стажировки для frontend-стажёров компании (3 стажёра).',
      ],
    },
  ],

  petProjects: [
    {
      slug: 'fridgemind',
      title: 'FridgeMind',
      description: 'PWA для планирования питания и покупок всей семьи.',
      stack: ['Next.js', 'Prisma', 'PostgreSQL', 'Supabase', 'Claude API', 'Serwist', 'IndexedDB'],
      achievements: [
        { text: 'Разграничение доступа к данным через Row-Level Security.' },
        { text: 'Синхронизация в реальном времени между устройствами.' },
        { text: 'Офлайн-режим на Serwist и IndexedDB.' },
        { text: 'Распознавание продуктов по фото холодильника через Claude Vision.' },
      ],
      href: 'https://github.com/mishadanilovich/fridgemind',
      hrefLabel: 'github.com/mishadanilovich/fridgemind',
    },
    {
      slug: 'coffee-shop',
      title: 'Coffee Shop',
      description: 'Сайт кофейни с корзиной, блогом и онлайн-оплатой.',
      stack: ['Next.js', 'NestJS', 'TypeORM', 'Stripe', 'GitHub Actions'],
      achievements: [
        { text: 'Собственная JWT-авторизация на NestJS.' },
        { text: 'Оплата корзины через Stripe.' },
        { text: 'CI на GitHub Actions с unit-тестами.' },
      ],
      href: 'https://github.com/mishadanilovich/coffee-shop',
      hrefLabel: 'github.com/mishadanilovich/coffee-shop',
    },
  ],

  roof: {
    kicker: 'Крыша · статус',
    status: 'Открыт к новым проектам',
    facts: [
      { label: 'Локация', value: 'Беларусь (Минск), возможна релокация' },
      { label: 'Формат', value: 'Офис, удалёнка, гибрид' },
      { label: 'Опыт', value: '5+ лет' },
      { label: 'Языки', value: 'Английский — B2, русский — родной' },
    ],
  },

  contacts: [
    { kind: 'telegram', label: '@f0pp1', href: 'https://t.me/f0pp1' },
    { kind: 'github', label: 'GitHub', href: 'https://github.com/mishadanilovich' },
    { kind: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/dmisha/' },
    {
      kind: 'cv',
      label: 'Резюме, PDF',
      href: '/cv/Mihail-Danilovich-Senior-Frontend-Developer-RU.pdf',
    },
    {
      kind: 'email',
      label: 'danilovich36misha@gmail.com',
      href: 'mailto:danilovich36misha@gmail.com',
      copyable: true,
    },
  ],

  cv: {
    href: '/cv/Mihail-Danilovich-Senior-Frontend-Developer-RU.pdf',
    downloadName: 'Mihail-Danilovich-Senior-Frontend-Developer-RU.pdf',
  },

  ui: {
    header: {
      nav: 'Основная навигация',
      language: 'Язык',
      garage: 'Гараж',
      cv: 'Резюме',
      call: 'Позвонить',
      help: 'Как устроен сайт',
    },
    intro: {
      callCta: 'Позвонить в домофон',
      cvCta: 'Скачать резюме',
      scrollHint: 'Листайте вверх — камера поднимется по этажам',
    },
    firstVisit: {
      title: 'Впервые здесь?',
      text: 'Дом — это карьера: каждый этаж — проект. Нажмите «?», чтобы узнать, что где.',
      legend: 'Показать легенду',
      dismiss: 'Понятно',
    },
    scene: {
      floorPlaque: 'Этаж {floor} · {period}',
      floorAria: 'Этаж {floor} — {title}, {period}',
      enterApartment: 'Войти →',
      basementPlaque: 'Подвал · {period}',
      doorTooltipTitle: 'Домофон',
      doorTooltipAction: 'Оставить вакансию →',
      doorAria: 'Дверь и домофон — оставить вакансию',
      garageTooltip: 'Гараж · 2 пет-проекта',
      garageAria: 'Гараж — пет-проекты',
    },
    miniMap: {
      label: 'Мини-карта этажей',
      roof: 'Крыша — контакты',
      floor: 'Этаж {floor}',
      entrance: 'Вход и домофон',
      entranceCurrent: 'Вход и домофон, вы здесь',
      basement: 'Подвал — начало пути',
      garage: 'Гараж — пет-проекты',
    },
  },
};
