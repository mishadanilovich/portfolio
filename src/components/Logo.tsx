const PANES = [
  { x: 20, y: 16 },
  { x: 35, y: 16 },
  { x: 20, y: 28 },
  { x: 20, y: 40 },
  { x: 35, y: 40 },
];

const STROKE = {
  dark: 'var(--color-text-on-dark)',
  light: 'var(--color-text)',
  mono: 'currentColor',
} as const;

export interface LogoProps {
  variant?: keyof typeof STROKE;
  size?: number;
}

export function Logo({ variant = 'dark', size = 36 }: LogoProps) {
  const color = STROKE[variant];

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect
        x="12"
        y="8"
        width="40"
        height="50"
        rx="2"
        fill="none"
        stroke={color}
        strokeWidth="3.5"
      />
      <g fill={color}>
        {PANES.map((pane) => (
          <rect key={`${pane.x}-${pane.y}`} {...pane} width="9" height="9" />
        ))}
      </g>
      <rect x="35" y="28" width="9" height="9" fill="var(--color-lamp)" />
    </svg>
  );
}
