import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { defaultLocale, getContent, isLocale } from '@/content';
import { Project } from '@/garage/Project';
import { findProject } from '@/garage/projects';

export const instant = false;

export function generateStaticParams() {
  return getContent(defaultLocale).petProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/garage/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const content = getContent(locale);
  const project = findProject(content.petProjects, slug);
  if (project === undefined) notFound();

  return {
    title: `${project.title} — ${content.person.name}`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps<'/[locale]/garage/[slug]'>) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const content = getContent(locale);
  const project = findProject(content.petProjects, slug);
  if (project === undefined) notFound();

  return (
    <Project
      locale={locale}
      projects={content.petProjects}
      project={project}
      ui={content.ui.project}
      garage={content.ui.garage}
      scene={content.ui.scene}
    />
  );
}
