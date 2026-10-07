import { notFound } from 'next/navigation';
import { fill, getContent, isLocale, shortPeriod } from '@/content';

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = getContent(locale);
  const other = locale === 'ru' ? 'en' : 'ru';

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-12">
      <header className="flex flex-col gap-2">
        <p className="text-overline tracking-overline text-text-on-dark-muted font-medium uppercase">
          {content.intro.status}
        </p>
        <h1 className="text-h1 leading-h1 font-display font-medium">{content.intro.title}</h1>
        <p className="text-lead leading-lead text-text-on-dark-soft">{content.intro.lead}</p>
        <a className="text-lamp-text text-body w-fit underline" href={`/${other}`}>
          {other.toUpperCase()}
        </a>
      </header>

      <section className="flex flex-col gap-2">
        <h2 className="text-h3 leading-h3 font-display font-medium">{content.basement.kicker}</h2>
        <p className="text-body leading-body">
          {content.basement.institution} · {content.basement.faculty} ·{' '}
          {shortPeriod(content.basement.period)}
        </p>
      </section>

      <section className="flex flex-col gap-6">
        {content.floors.map((floor) => (
          <article
            key={floor.slug}
            className="border-border-on-dark flex flex-col gap-2 border-t pt-4"
          >
            <p className="text-overline tracking-overline text-text-on-dark-muted font-medium uppercase">
              {fill(content.ui.scene.floorPlaque, {
                floor: floor.floor,
                period: shortPeriod(floor.period),
              })}
            </p>
            <h3 className="text-h3 leading-h3 font-display font-medium">{floor.title}</h3>
            <p className="text-caption leading-caption text-text-on-dark-muted">
              {floor.role} · {floor.period}
            </p>
            <p className="text-body leading-body">{floor.description}</p>
            {floor.note !== undefined && (
              <p className="text-body leading-body text-text-on-dark-soft">{floor.note}</p>
            )}
            <ul className="flex flex-wrap gap-2">
              {floor.stack.map((item) => (
                <li
                  key={item}
                  className="rounded-sticker bg-dusk text-caption border-border-on-dark border px-2 py-1"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-caption text-text-on-dark-muted">
              {floor.achievements.length} / {floor.responsibilities.length}
            </p>
          </article>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-h3 leading-h3 font-display font-medium">{content.ui.header.garage}</h2>
        {content.petProjects.map((project) => (
          <article key={project.slug} className="flex flex-col gap-1">
            <h3 className="text-body font-medium">{project.title}</h3>
            <p className="text-body leading-body">{project.description}</p>
            <a className="text-lamp-text text-caption w-fit underline" href={project.href}>
              {project.hrefLabel}
            </a>
          </article>
        ))}
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-h3 leading-h3 font-display font-medium">{content.roof.kicker}</h2>
        <p className="text-body font-medium">{content.roof.status}</p>
        <dl className="text-body leading-body flex flex-col gap-1">
          {content.roof.facts.map((fact) => (
            <div key={fact.label} className="flex gap-2">
              <dt className="text-text-on-dark-muted">{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
        <ul className="flex flex-wrap gap-4">
          {content.contacts.map((contact) => (
            <li key={contact.kind}>
              <a className="text-lamp-text text-body underline" href={contact.href}>
                {contact.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
