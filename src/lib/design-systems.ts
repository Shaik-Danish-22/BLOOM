/**
 * @fileOverview Registry-driven Design Systems and Tokens.
 * These systems act as the primary orchestration engine for Bloom.
 */

export type DesignSystemId = 'apple' | 'airbnb' | 'mastercard' | 'binance' | 'cafe' | 'agentic' | 'starbucks' | 'stripe' | 'baker' | 'wellness';

export interface DesignSystemTokens {
  id: DesignSystemId;
  name: string;
  description: string;
  inspiration: string;
  tokens: {
    bg: string;
    surface: string;
    surfaceWarm: string;
    fg: string;
    fgSecondary: string;
    muted: string;
    meta: string;
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
    elevRaised: string;
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
      surfaceWarm: '#0a0a0a',
      fg: '#ffffff',
      fgSecondary: '#a1a1a6',
      muted: '#86868b',
      meta: '#6e6e73',
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
      elevRaised: '0 20px 40px rgba(0, 0, 0, 0.4)',
      shadowAmbient: '0 4px 12px rgba(0,0,0,0.1)',
      shadowStandard: '0 8px 24px rgba(0,0,0,0.2)'
    },
    principles: ['Quiet chrome', 'Loud product', 'Whitespace first']
  },
  baker: {
    id: 'baker',
    name: 'Pantry Heritage',
    description: 'Warm flour-white canvases, deep charcoal typography, and artisanal sensory logic.',
    inspiration: 'Pantry by Baker',
    tokens: {
      bg: '#FBFBF9',
      surface: '#F5F5F1',
      surfaceWarm: '#F1EFEA',
      fg: '#1A1A1A',
      fgSecondary: '#4A4A4A',
      muted: '#7C7C77',
      meta: '#A1A19A',
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
      elevRaised: 'none',
      shadowAmbient: 'none',
      shadowStandard: 'none'
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
      surfaceWarm: '#24302A',
      fg: '#F4F7F2',
      fgSecondary: '#D1D9D3',
      muted: '#8C9A93',
      meta: '#66756F',
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
      elevRaised: '0 32px 64px rgba(0,0,0,0.3)',
      shadowAmbient: '0 8px 16px rgba(0,0,0,0.1)',
      shadowStandard: '0 16px 32px rgba(0,0,0,0.2)'
    },
    principles: ['Botanical rhythm', 'Sophisticated ritual', 'High-contrast immersion']
  },
  starbucks: {
    id: 'starbucks',
    name: 'Brewers Retail',
    description: 'Warm retail flagship aesthetic with Starbucks-Green anchors and cream canvases.',
    inspiration: 'Starbucks',
    tokens: {
      bg: '#f2f0eb',
      surface: '#ffffff',
      surfaceWarm: '#1E3932',
      fg: 'rgba(0, 0, 0, 0.87)',
      fgSecondary: 'rgba(0, 0, 0, 0.58)',
      muted: '#33433d',
      meta: '#cba258',
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
      elevRaised: '0px 1px 1px rgba(0,0,0,0.24)',
      shadowAmbient: '0 0 0.5px rgba(0,0,0,0.14)',
      shadowStandard: '0 1px 1px rgba(0,0,0,0.24)'
    },
    principles: ['Warm cream canvas', 'Pill-button discipline', 'Four-tier green hierarchy']
  },
  stripe: {
    id: 'stripe',
    name: 'Fintech Precision',
    description: 'Weight-300 elegance with signature purple gradients and blue-tinted depth.',
    inspiration: 'Stripe',
    tokens: {
      bg: '#ffffff',
      surface: '#f6f9fc',
      surfaceWarm: '#061b31',
      fg: '#061b31',
      fgSecondary: '#273951',
      muted: '#64748d',
      meta: '#533afd',
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
      elevRaised: 'rgba(50,50,93,0.25) 0px 30px 45px -30px',
      shadowAmbient: 'rgba(50,50,93,0.25) 0px 15px 35px 0px',
      shadowStandard: 'rgba(50,50,93,0.25) 0px 30px 45px -30px, rgba(0,0,0,0.1) 0px 18px 36px -18px'
    },
    principles: ['Weight-300 displays', 'Blue-tinted shadows', 'Geometric precision']
  },
  airbnb: {
    id: 'airbnb',
    name: 'Rausch Warmth',
    description: 'Photography-driven marketplace aesthetic with warm coral accents and soft rounded UI.',
    inspiration: 'Airbnb',
    tokens: {
      bg: '#ffffff',
      surface: '#f7f7f7',
      surfaceWarm: '#ffffff',
      fg: '#222222',
      fgSecondary: '#3f3f3f',
      muted: '#6a6a6a',
      meta: '#929292',
      accent: '#ff385c',
      accentOn: '#ffffff',
      accentHover: '#e00b41',
      border: '#dddddd',
      borderSoft: '#ebebeb',
      radiusSm: '8px',
      radiusMd: '14px',
      radiusLg: '24px',
      radiusPill: '9999px',
      fontDisplay: 'var(--font-display)',
      fontBody: 'var(--font-display)',
      motionIntensity: 'standard',
      trackingDisplay: '-0.02em',
      leadingTight: '1.18',
      elevRaised: '0 4px 8px rgba(0, 0, 0, 0.1)',
      shadowAmbient: '0 2px 4px rgba(0,0,0,0.05)',
      shadowStandard: '0 4px 12px rgba(0,0,0,0.08)'
    },
    principles: ['Photography as depth', 'Soft geometry', 'Single-accent discipline']
  },
  mastercard: {
    id: 'mastercard',
    name: 'Orbital Editorial',
    description: 'Institutional warmth with cream canvases and orbital pill-shaped geometries.',
    inspiration: 'Mastercard',
    tokens: {
      bg: '#F3F0EE',
      surface: '#FCFBFA',
      surfaceWarm: '#F3F0EE',
      fg: '#141413',
      fgSecondary: '#262627',
      muted: '#696969',
      meta: '#D1CDC7',
      accent: '#CF4500',
      accentOn: '#ffffff',
      accentHover: '#F37338',
      border: 'rgba(20, 20, 19, 0.1)',
      borderSoft: 'rgba(20, 20, 19, 0.05)',
      radiusSm: '6px',
      radiusMd: '20px',
      radiusLg: '40px',
      radiusPill: '1000px',
      fontDisplay: 'var(--font-headline)',
      fontBody: 'var(--font-display)',
      motionIntensity: 'subtle',
      trackingDisplay: '-0.03em',
      leadingTight: '1.0',
      elevRaised: '0 32px 64px rgba(0, 0, 0, 0.1)',
      shadowAmbient: '0 8px 16px rgba(0,0,0,0.03)',
      shadowStandard: '0 16px 32px rgba(0,0,0,0.06)'
    },
    principles: ['Stadium geometry', 'Cream canvas', 'Orbital trajectory']
  },
  binance: {
    id: 'binance',
    name: 'Trading Precision',
    description: 'High-density fintech aesthetic with bold yellow accents and monochrome depth.',
    inspiration: 'Binance.US',
    tokens: {
      bg: '#ffffff',
      surface: '#F5F5F5',
      surfaceWarm: '#222126',
      fg: '#1E2026',
      fgSecondary: '#32313A',
      muted: '#848E9C',
      meta: '#777E90',
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
      elevRaised: '0 3px 10px rgba(0,0,0,0.05)',
      shadowAmbient: '0 1px 2px rgba(0,0,0,0.02)',
      shadowStandard: '0 2px 8px rgba(0,0,0,0.05)'
    },
    principles: ['Operational clarity', 'Data-first', 'Urgency']
  },
  cafe: {
    id: 'cafe',
    name: 'Brewers Editorial',
    description: 'Deep espresso tones, warm parchment canvases, and sophisticated serif typography.',
    inspiration: 'Specialty Coffee, Editorial Journals',
    tokens: {
      bg: '#F9F7F5',
      surface: '#E9E3DD',
      surfaceWarm: '#3C2A21',
      fg: '#1A120B',
      fgSecondary: '#3C2A21',
      muted: '#8B735B',
      meta: '#A69076',
      accent: '#3C2A21',
      accentOn: '#F9F7F5',
      accentHover: '#1A120B',
      border: '#D9D3CD',
      borderSoft: '#E9E3DD',
      radiusSm: '4px',
      radiusMd: '10px',
      radiusLg: '24px',
      radiusPill: '99px',
      fontDisplay: 'var(--font-headline)',
      fontBody: 'var(--font-display)',
      motionIntensity: 'subtle',
      trackingDisplay: '0.02em',
      leadingTight: '1.05',
      elevRaised: '0 20px 40px rgba(93, 68, 50, 0.1)',
      shadowAmbient: '0 4px 12px rgba(93, 68, 50, 0.05)',
      shadowStandard: '0 8px 24px rgba(93, 68, 50, 0.08)'
    },
    principles: ['Sensory depth', 'Editorial hierarchy', 'Organic textures']
  },
  agentic: {
    id: 'agentic',
    name: 'Linear AI',
    description: 'Precision engineering aesthetic with monochromatic depth and glassmorphism.',
    inspiration: 'Linear, Cursor',
    tokens: {
      bg: '#000000',
      surface: '#0A0A0A',
      surfaceWarm: '#111111',
      fg: '#ffffff',
      fgSecondary: '#888888',
      muted: '#444444',
      meta: '#333333',
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
      elevRaised: '0 0 0 1px #222, 0 20px 40px rgba(0,0,0,0.5)',
      shadowAmbient: '0 2px 4px rgba(0,0,0,0.5)',
      shadowStandard: '0 4px 12px rgba(0,0,0,0.6)'
    },
    principles: ['Precision', 'Density', 'Glassmorphism']
  }
};
