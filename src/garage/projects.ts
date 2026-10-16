import type { Locale, PetProject } from '@/content';

export const GARAGE_TITLE_ID = 'garage-title';

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
