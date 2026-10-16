import type { Locale, PetProject } from '@/content';

export const GARAGE_TITLE_ID = 'garage-title';
export const PROJECT_TITLE_ID = 'project-title';

const STACK_PREVIEW = 3;

export function garagePath(locale: Locale): string {
  return `/${locale}/garage`;
}

export function projectPath(locale: Locale, slug: string): string {
  return `/${locale}/garage/${slug}`;
}

export function stackPreview(stack: string[]): { shown: string[]; more: number } {
  return { shown: stack.slice(0, STACK_PREVIEW), more: Math.max(0, stack.length - STACK_PREVIEW) };
}

export function findProject(projects: PetProject[], slug: string): PetProject | undefined {
  return projects.find((project) => project.slug === slug);
}

export interface ProjectPlace {
  index: number;
  total: number;
  next: PetProject | null;
  prev: PetProject | null;
}

export function placeOf(projects: PetProject[], slug: string): ProjectPlace {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { index: 0, total: projects.length, next: null, prev: null };

  return {
    index: index + 1,
    total: projects.length,
    next: projects[index + 1] ?? null,
    prev: projects[index - 1] ?? null,
  };
}
