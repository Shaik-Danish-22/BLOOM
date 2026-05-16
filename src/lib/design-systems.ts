/**
 * @fileOverview Registry-driven Design Systems and Tokens.
 */

export type DesignSystemId = 'agentic' | 'posthog' | 'spotify' | 'apple' | 'minimal' | 'cyberpunk';

export interface DesignSystemTokens {
  id: DesignSystemId;
  name: string;
  description: string;
  inspiration: string;
  tokens: {
    primary: string;
    background: string;
    accent: string;
    surface: string;
    radius: string;
    fontDisplay: string;
    fontBody: string;
    motionIntensity: 'subtle' | 'standard' | 'high';
  };
  principles: string[];
}

export const DESIGN_SYSTEMS: Record<DesignSystemId, DesignSystemTokens> = {
  apple: {
    id: 'apple',
    name: 'Cupertino Classic',
    description: 'Pristine whitespace, large typography, and rhythmic layout patterns.',
    inspiration: 'Apple, Vercel',
    tokens: {
      primary: '#000000',
      background: '#FFFFFF',
      accent: '#007AFF',
      surface: '#F5F5F7',
      radius: '20px',
      fontDisplay: 'Inter, sans-serif',
      fontBody: 'Inter, sans-serif',
      motionIntensity: 'subtle'
    },
    principles: ['Whitespace first', 'High hierarchy', 'Trust']
  },
  posthog: {
    id: 'posthog',
    name: 'Neural Parchment',
    description: 'Warm surfaces with bold, playful highlights and editorial flair.',
    inspiration: 'PostHog, Notion',
    tokens: {
      primary: '#4D4F46',
      background: '#FDFDF8',
      accent: '#F54E00',
      surface: '#EEEFE9',
      radius: '12px',
      fontDisplay: 'Inter, sans-serif',
      fontBody: 'Inter, sans-serif',
      motionIntensity: 'standard'
    },
    principles: ['Warm tones', 'Friendly intelligence', 'High density']
  },
  spotify: {
    id: 'spotify',
    name: 'Obsidian Pulse',
    description: 'Ultra-dark immersive surfaces with vibrant neon green highlights.',
    inspiration: 'Spotify, Arc',
    tokens: {
      primary: '#1ED760',
      background: '#121212',
      accent: '#1ED760',
      surface: '#181818',
      radius: '8px',
      fontDisplay: 'Inter, sans-serif',
      fontBody: 'Inter, sans-serif',
      motionIntensity: 'high'
    },
    principles: ['Deep immersion', 'High contrast', 'Modern']
  },
  agentic: {
    id: 'agentic',
    name: 'Linear AI',
    description: 'Precision engineering aesthetic with monochromatic depth and glassmorphism.',
    inspiration: 'Linear, Cursor',
    tokens: {
      primary: '#FFFFFF',
      background: '#000000',
      accent: '#5E6AD2',
      surface: '#0A0A0A',
      radius: '14px',
      fontDisplay: 'Inter, sans-serif',
      fontBody: 'Inter, sans-serif',
      motionIntensity: 'standard'
    },
    principles: ['Precision', 'Density', 'Glassmorphism']
  },
  minimal: {
    id: 'minimal',
    name: 'Studio Serif',
    description: 'Monochrome perfection for luxury editorial and high-end brands.',
    inspiration: 'Kinfolk, Vogue',
    tokens: {
      primary: '#000000',
      background: '#FFFFFF',
      accent: '#888888',
      surface: '#F5F5F5',
      radius: '0px',
      fontDisplay: 'Instrument Serif, serif',
      fontBody: 'Inter, sans-serif',
      motionIntensity: 'subtle'
    },
    principles: ['Editorial', 'Luxury', 'Serif']
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Terminal Glow',
    description: 'Future-forward high-density interface with scanning lines and neon.',
    inspiration: 'Cyberpunk 2077, Ghost in the Shell',
    tokens: {
      primary: '#00F0FF',
      background: '#000000',
      accent: '#FF00FF',
      surface: '#0A0A0A',
      radius: '4px',
      fontDisplay: 'monospace',
      fontBody: 'Inter, sans-serif',
      motionIntensity: 'high'
    },
    principles: ['Holographic', 'Industrial', 'Glowing']
  }
};
