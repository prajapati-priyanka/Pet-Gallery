export const theme = {
  colors: {
    primary:        '#D85A30',
    primaryLight:   '#FAECE7',
    primaryMid:     '#F0997B',
    primaryDark:    '#993C1D',
    primaryDeep:    '#712B13',

    white:         '#FFFFFF',
    bg:            '#FAFAF9',
    surface:       '#FFFFFF',
    border:        'rgba(0,0,0,0.08)',
    borderHover:   'rgba(0,0,0,0.16)',

    textPrimary:   '#1A1A1A',
    textSecondary: '#6B6B6B',
    textTertiary:  '#A0A0A0',
  },
  radii: {
    sm:  '6px',
    md:  '10px',
    lg:  '14px',
    xl:  '20px',
    full:'9999px',
  },
  shadows: {
    card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
    cardHover: '0 4px 12px rgba(216,90,48,0.12)',
  },
  fonts: {
    body: "'DM Sans', system-ui, sans-serif",
    display: "'DM Serif Display', Georgia, serif",
  },
  transitions: {
    fast: '150ms ease',
    base: '220ms ease',
  },
};

export type Theme = typeof theme;
