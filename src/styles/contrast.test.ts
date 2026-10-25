import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const TOKENS = readFileSync(new URL('./tokens.css', import.meta.url), 'utf8');

const PAIRS = [
  { fg: 'text-muted', bg: 'paper', ratio: 7.1, min: 4.5 },
  { fg: 'input-border', bg: 'white', ratio: 3.7, min: 3 },
  { fg: 'text-on-dark', bg: 'dark', ratio: 11.9, min: 4.5 },
  { fg: 'text-on-dark-muted', bg: 'dark', ratio: 7.4, min: 4.5 },
  { fg: 'lamp-text', bg: 'dark', ratio: 9.3, min: 4.5 },
  { fg: 'on-lamp', bg: 'lamp', ratio: 8.6, min: 4.5 },
  { fg: 'copper-text', bg: 'matte', ratio: 7.7, min: 4.5 },
  { fg: 'error', bg: 'paper', ratio: 5.3, min: 4.5 },
  { fg: 'text-on-dark', bg: 'sky-bottom-top', ratio: 5, min: 4.5 },
] as const;

function hexOf(name: string): string {
  const match = new RegExp(`--color-${name}:\\s*(#[0-9a-f]{6});`).exec(TOKENS);
  if (match?.[1] === undefined) throw new Error(`нет токена --color-${name}`);

  return match[1];
}

function channel(value: number): number {
  const part = value / 255;

  return part <= 0.04045 ? part / 12.92 : ((part + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((at) => channel(Number.parseInt(hex.slice(at, at + 2), 16)));

  return 0.2126 * (r ?? 0) + 0.7152 * (g ?? 0) + 0.0722 * (b ?? 0);
}

function contrast(fg: string, bg: string): number {
  const [light, dark] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);

  return ((light ?? 0) + 0.05) / ((dark ?? 0) + 0.05);
}

describe('контраст пар из 00-design-system.html', () => {
  for (const { fg, bg, ratio, min } of PAIRS) {
    it(`${fg} на ${bg} — ${ratio}:1`, () => {
      const actual = contrast(hexOf(fg), hexOf(bg));

      expect(actual).toBeGreaterThanOrEqual(min);
      expect(Number(actual.toFixed(1))).toBe(ratio);
    });
  }
});
