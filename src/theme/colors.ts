export const colors = {
  background: '#000000',
  surface: '#101012',
  surfaceRaised: '#17171a',
  surfaceInput: '#1b1b1f',
  border: '#2a2a2e',
  borderSoft: '#1f1f23',

  text: '#ffffff',
  textMuted: '#9b9ba1',
  textFaint: '#6b6b72',

  gold: '#f5b800',
  goldSoft: 'rgba(245,184,0,0.14)',
  goldGlow: '#241a00',

  accent: '#8ab4ff',
  accentSoft: 'rgba(138,180,255,0.16)',
  accentBorder: 'rgba(138,180,255,0.3)',

  blue: '#3b82f6',
  blueSoft: 'rgba(59,130,246,0.14)',
  blueCard: '#16202f',
  green: '#22c55e',
  greenSoft: 'rgba(34,197,94,0.14)',
  red: '#ef4444',
  redText: '#ff4d4f',
  redSoft: '#2a0f12',
  orange: '#f59e0b',
  orangeSoft: 'rgba(245,158,11,0.16)',
  purple: '#8b5cf6',
  purpleSoft: 'rgba(139,92,246,0.18)',
  cyan: '#06b6d4',
  yellow: '#eab308',

  buttonLight: '#ededed',
  buttonLightText: '#111111',
  bubble: '#222226',
} as const;

export type ColorName = keyof typeof colors;
