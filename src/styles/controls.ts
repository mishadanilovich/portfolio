import styles from './controls.module.css';

export type Control =
  | 'ring-dark'
  | 'ring-paper'
  | 'primary'
  | 'primary-s'
  | 'primary-m'
  | 'primary-l'
  | 'external'
  | 'outline'
  | 'dark'
  | 'text'
  | 'text-box'
  | 'text-inline'
  | 'quiet'
  | 'nav'
  | 'icon'
  | 'close'
  | 'segment'
  | 'level'
  | 'tip'
  | 'tile'
  | 'tile-line'
  | 'tile-square'
  | 'arrow'
  | 'arrow-back'
  | 'step'
  | 'card'
  | 'card-arrow'
  | 'link'
  | 'link-copper'
  | 'link-light'
  | 'link-ink'
  | 'link-lamp'
  | 'input'
  | 'input-line'
  | 'input-area';

export function control(...names: Control[]): string {
  return names
    .map((name) => styles[name])
    .filter(Boolean)
    .join(' ');
}
