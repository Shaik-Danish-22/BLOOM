/**
 * @fileOverview Registry-driven Design Systems and Tokens.
 * These systems act as the primary orchestration engine for Bloom.
 */

export type DesignSystemId = 'apple' | 'airbnb' | 'mastercard' | 'binance' | 'cafe' | 'agentic';

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
      bg: '#ffffff',
      surface: '#f5f5f7',
      surfaceWarm: '#fbfbfd',
      fg: '#1d1d1f',
      fgSecondary: '#424245',
      muted: '#6e6e73',
      meta: '#86868b',
      accent: '#0071e3',
      accentOn: '#ffffff',
      accentHover: '#0077ed',
      border: '#d2d2d7',
      borderSoft: '#e8e8ed',
      radiusSm: '8px',
      radiusMd: '12px',
      radiusLg: '18px',
      radiusPill: '980px',
      fontDisplay: 'Inter, sans-serif',
      fontBody: 'Inter, sans-serif',
      motionIntensity: 'subtle',
      trackingDisplay: '-0.015em',
      leadingTight: '1.05',
      elevRaised: '0 12px 32px rgba(0, 0, 0, 0.08)'
    },
    principles: ['Quiet chrome', 'Loud product', 'Whitespace first']
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
      radiusLg: '20px',
      radiusPill: '9999px',
      fontDisplay: 'Inter, sans-serif',
      fontBody: 'Inter, sans-serif',
      motionIntensity: 'standard',
      trackingDisplay: '-0.02em',
      leadingTight: '1.18',
      elevRaised: '0 4px 8px rgba(0, 0, 0, 0.1)'
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
      fontDisplay: 'Instrument Serif, serif',
      fontBody: 'Inter, sans-serif',
      motionIntensity: 'subtle',
      trackingDisplay: '-0.02em',
      leadingTight: '1.0',
      elevRaised: '0 24px 48px rgba(0, 0, 0, 0.08)'
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
      fontDisplay: 'Inter, sans-serif',
      fontBody: 'Inter, sans-serif',
      motionIntensity: 'high',
      trackingDisplay: '0',
      leadingTight: '1.0',
      elevRaised: '0 3px 5px rgba(32, 32, 37, 0.05)'
    },
    principles: ['Operational clarity', 'Data-first', 'Urgency']
  },
  cafe: {
    id: 'cafe',
    name: 'Cozy Parchment',
    description: 'Warm tones, soft typography, and editorial layouts for a relaxed experience.',
    inspiration: 'Editorial, Boutique Cafe',
    tokens: {
      bg: '#F9F7F5',
      surface: '#E9E3DD',
      surfaceWarm: '#F9F7F5',
      fg: '#3E2B1E',
      fgSecondary: '#5D4432',
      muted: '#8B735B',
      meta: '#A69076',
      accent: '#5D4432',
      accentOn: '#F9F7F5',
      accentHover: '#3E2B1E',
      border: '#D9D3CD',
      borderSoft: '#E9E3DD',
      radiusSm: '4px',
      radiusMd: '8px',
      radiusLg: '16px',
      radiusPill: '99px',
      fontDisplay: 'Instrument Serif, serif',
      fontBody: 'Inter, sans-serif',
      motionIntensity: 'subtle',
      trackingDisplay: '0.02em',
      leadingTight: '1.1',
      elevRaised: '0 10px 20px rgba(93, 68, 50, 0.05)'
    },
    principles: ['Soft textures', 'Relaxed hierarchy', 'Human-centered']
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
      radiusLg: '24px',
      radiusPill: '999px',
      fontDisplay: 'Inter, sans-serif',
      fontBody: 'Inter, sans-serif',
      motionIntensity: 'standard',
      trackingDisplay: '-0.02em',
      leadingTight: '1.1',
      elevRaised: '0 0 0 1px #222'
    },
    principles: ['Precision', 'Density', 'Glassmorphism']
  }
};
