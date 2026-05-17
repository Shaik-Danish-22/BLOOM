/**
 * @fileOverview Registry-driven Design Systems and Tokens.
 * These systems act as the primary orchestration engine for Bloom.
 * Updated with elite specifications for Starbucks, Stripe, Pantry, and Altina.
 */

export type DesignSystemId = 'apple' | 'stripe' | 'starbucks' | 'baker' | 'wellness' | 'linear' | 'binance';

export interface DesignSystemTokens {
  id: DesignSystemId;
  name: string;
  description: string;
  inspiration: string;
  tokens: {
    bg: string;
    surface: string;
    fg: string;
    fgSecondary: string;
    muted: string;
    accent: string;
    accentOn: string;
    accentHover: string;
    border: string;
    borderSoft: string;
    radiusSm: string;
    radiusMd: string;
    radiusLg: string;
    radiusPill: string;
    fontDisplay: string;
    fontBody: string;
    motionIntensity: 'subtle' | 'standard' | 'high';
    trackingDisplay: string;
    leadingTight: string;
    shadowAmbient: string;
    shadowStandard: string;
  };
  principles: string[];
}

export const DESIGN_SYSTEMS: Record<DesignSystemId, DesignSystemTokens> = {
  apple: {
    id: 'apple',
    name: 'Cupertino Classic',
    description: 'Precision editorial system with gallery-like calm and hardware-first aesthetics.',
    inspiration: 'Apple, Vercel',
    tokens: {
      bg: '#000000',
      surface: '#111111',
      fg: '#ffffff',
      fgSecondary: '#a1a1a6',
      muted: '#86868b',
      accent: '#ffffff',
      accentOn: '#000000',
      accentHover: '#f5f5f7',
      border: '#333333',
      borderSoft: '#222222',
      radiusSm: '8px',
      radiusMd: '14px',
      radiusLg: '24px',
      radiusPill: '980px',
      fontDisplay: 'var(--font-display)',
      fontBody: 'var(--font-display)',
      motionIntensity: 'subtle',
      trackingDisplay: '-0.02em',
      leadingTight: '1.05',
      shadowAmbient: '0 4px 12px rgba(0,0,0,0.1)',
      shadowStandard: '0 8px 24px rgba(0,0,0,0.2)'
    },
    principles: ['Quiet chrome', 'Loud product', 'Whitespace first']
  },
  stripe: {
    id: 'stripe',
    name: 'Fintech Precision',
    description: 'Weight-300 elegance with signature blue-tinted shadows and geometric depth.',
    inspiration: 'Stripe, Mercury',
    tokens: {
      bg: '#ffffff',
      surface: '#f6f9fc',
      fg: '#061b31',
      fgSecondary: '#273951',
      muted: '#64748d',
      accent: '#533afd',
      accentOn: '#ffffff',
      accentHover: '#4434d4',
      border: '#e5edf5',
      borderSoft: '#f1f4f9',
      radiusSm: '4px',
      radiusMd: '6px',
      radiusLg: '8px',
      radiusPill: '999px',
      fontDisplay: 'var(--font-display)',
      fontBody: 'var(--font-display)',
      motionIntensity: 'subtle',
      trackingDisplay: '-0.03em',
      leadingTight: '1.1',
      shadowAmbient: 'rgba(50,50,93,0.1) 0px 15px 35px 0px',
      shadowStandard: 'rgba(50,50,93,0.25) 0px 30px 45px -30px, rgba(0,0,0,0.1) 0px 18px 36px -18px'
    },
    principles: ['Weight-300 displays', 'Blue-tinted shadows', 'Geometric precision']
  },
  starbucks: {
    id: 'starbucks',
    name: 'Brewers Retail',
    description: 'Warm retail flagship aesthetic with Starbucks-Green anchors and cream canvases.',
    inspiration: 'Starbucks',
    tokens: {
      bg: '#f2f0eb',
      surface: '#ffffff',
      fg: 'rgba(0, 0, 0, 0.87)',
      fgSecondary: 'rgba(0, 0, 0, 0.58)',
      muted: '#33433d',
      accent: '#006241',
      accentOn: '#ffffff',
      accentHover: '#00754A',
      border: '#d6dbde',
      borderSoft: '#ebebeb',
      radiusSm: '4px',
      radiusMd: '12px',
      radiusLg: '24px',
      radiusPill: '50px',
      fontDisplay: 'var(--font-headline)',
      fontBody: 'var(--font-display)',
      motionIntensity: 'standard',
      trackingDisplay: '-0.01em',
      leadingTight: '1.2',
      shadowAmbient: '0 0 0.5px rgba(0,0,0,0.14)',
      shadowStandard: '0 1px 1px rgba(0,0,0,0.24)'
    },
    principles: ['Warm cream canvas', 'Pill-button discipline', 'Four-tier green hierarchy']
  },
  baker: {
    id: 'baker',
    name: 'Pantry Heritage',
    description: 'Warm flour-white canvases, deep charcoal typography, and artisanal sensory logic.',
    inspiration: 'Pantry by Baker',
    tokens: {
      bg: '#FBFBF9',
      surface: '#F5F5F1',
      fg: '#1A1A1A',
      fgSecondary: '#4A4A4A',
      muted: '#7C7C77',
      accent: '#1A1A1A',
      accentOn: '#FFFFFF',
      accentHover: '#333333',
      border: '#E8E8E1',
      borderSoft: '#F1F1EB',
      radiusSm: '0px',
      radiusMd: '0px',
      radiusLg: '4px',
      radiusPill: '100px',
      fontDisplay: 'var(--font-headline)',
      fontBody: 'var(--font-display)',
      motionIntensity: 'subtle',
      trackingDisplay: '-0.04em',
      leadingTight: '0.9',
      shadowAmbient: 'none',
      shadowStandard: '0 4px 12px rgba(0,0,0,0.05)'
    },
    principles: ['Typographic scale as depth', 'Heritage whitespace', 'Artisanal precision']
  },
  wellness: {
    id: 'wellness',
    name: 'Botanical Edit',
    description: 'Ethereal high-contrast system with botanical deep greens and sophisticated serifs.',
    inspiration: 'Altina',
    tokens: {
      bg: '#0F1713',
      surface: '#1A241F',
      fg: '#F4F7F2',
      fgSecondary: '#D1D9D3',
      muted: '#8C9A93',
      accent: '#D4E9E2',
      accentOn: '#0F1713',
      accentHover: '#E8F5F0',
      border: '#24302A',
      borderSoft: '#1A241F',
      radiusSm: '4px',
      radiusMd: '8px',
      radiusLg: '16px',
      radiusPill: '100px',
      fontDisplay: 'var(--font-headline)',
      fontBody: 'var(--font-display)',
      motionIntensity: 'standard',
      trackingDisplay: '-0.02em',
      leadingTight: '1.0',
      shadowAmbient: '0 8px 16px rgba(0,0,0,0.1)',
      shadowStandard: '0 16px 32px rgba(0,0,0,0.2)'
    },
    principles: ['Botanical rhythm', 'Sophisticated ritual', 'High-contrast immersion']
  },
  linear: {
    id: 'linear',
    name: 'Linear AI',
    description: 'Precision engineering aesthetic with monochromatic depth and glassmorphism.',
    inspiration: 'Linear, Cursor',
    tokens: {
      bg: '#000000',
      surface: '#0A0A0A',
      fg: '#ffffff',
      fgSecondary: '#888888',
      muted: '#444444',
      accent: '#5E6AD2',
      accentOn: '#ffffff',
      accentHover: '#707DFF',
      border: '#222222',
      borderSoft: '#1a1a1a',
      radiusSm: '6px',
      radiusMd: '14px',
      radiusLg: '32px',
      radiusPill: '999px',
      fontDisplay: 'var(--font-display)',
      fontBody: 'var(--font-display)',
      motionIntensity: 'standard',
      trackingDisplay: '-0.02em',
      leadingTight: '1.1',
      shadowAmbient: '0 2px 4px rgba(0,0,0,0.5)',
      shadowStandard: '0 20px 40px rgba(0,0,0,0.5)'
    },
    principles: ['Precision', 'Density', 'Glassmorphism']
  },
  binance: {
    id: 'binance',
    name: 'Trading Precision',
    description: 'High-density fintech aesthetic with bold yellow accents and monochrome depth.',
    inspiration: 'Binance',
    tokens: {
      bg: '#ffffff',
      surface: '#F5F5F5',
      fg: '#1E2026',
      fgSecondary: '#32313A',
      muted: '#848E9C',
      accent: '#F0B90B',
      accentOn: '#1E2026',
      accentHover: '#FFD000',
      border: '#E6E8EA',
      borderSoft: '#F5F5F5',
      radiusSm: '6px',
      radiusMd: '12px',
      radiusLg: '24px',
      radiusPill: '50px',
      fontDisplay: 'var(--font-display)',
      fontBody: 'var(--font-display)',
      motionIntensity: 'high',
      trackingDisplay: '0',
      leadingTight: '1.0',
      shadowAmbient: '0 1px 2px rgba(0,0,0,0.02)',
      shadowStandard: '0 2px 8px rgba(0,0,0,0.05)'
    },
    principles: ['Operational clarity', 'Data-first', 'Urgency']
  }
};
