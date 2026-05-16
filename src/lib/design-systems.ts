/**
 * @fileOverview Design System Fragments and Tokens for Siteforge AI.
 */

export type DesignSystemId = 'slack' | 'posthog' | 'spotify' | 'coinbase' | 'minimal' | 'cyberpunk';

export interface DesignSystemTokens {
  id: DesignSystemId;
  name: string;
  description: string;
  colors: {
    primary: string;
    background: string;
    accent: string;
    surface: string;
    text: string;
  };
  typography: {
    display: string;
    body: string;
    weight: string;
  };
  principles: string[];
}

export const DESIGN_SYSTEMS: Record<DesignSystemId, DesignSystemTokens> = {
  slack: {
    id: 'slack',
    name: 'Aubergine Cloud',
    description: 'The iconic high-density layout with clear, instructional typography.',
    colors: {
      primary: '#4A154B',
      background: '#FFFFFF',
      accent: '#36C5F0',
      surface: '#F8F8F8',
      text: '#1D1C1D'
    },
    typography: {
      display: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
      weight: '700'
    },
    principles: ['Sidebar-first', 'High density', 'Instructional']
  },
  posthog: {
    id: 'posthog',
    name: 'Neural Parchment',
    description: 'Warm, approachable surfaces with bold IBM Plex Sans and playful olive tones.',
    colors: {
      primary: '#4D4F46',
      background: '#FDFDF8',
      accent: '#F54E00',
      surface: '#EEEFE9',
      text: '#4D4F46'
    },
    typography: {
      display: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
      weight: '800'
    },
    principles: ['Warm tones', 'Bold headings', 'Friendly analytics']
  },
  spotify: {
    id: 'spotify',
    name: 'Obsidian Pulse',
    description: 'Ultra-dark immersive surfaces with vibrant neon green highlights.',
    colors: {
      primary: '#1ED760',
      background: '#121212',
      accent: '#1ED760',
      surface: '#181818',
      text: '#FFFFFF'
    },
    typography: {
      display: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
      weight: '700'
    },
    principles: ['High contrast', 'Vibrant green', 'Deep immersion']
  },
  coinbase: {
    id: 'coinbase',
    name: 'Trust Blue',
    description: 'Clean, spacious, and authoritative fintech aesthetic with modern spacing.',
    colors: {
      primary: '#0052FF',
      background: '#FFFFFF',
      accent: '#0052FF',
      surface: '#F5F8FF',
      text: '#050F19'
    },
    typography: {
      display: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
      weight: '600'
    },
    principles: ['Financial trust', 'Wide margins', 'Clean grids']
  },
  minimal: {
    id: 'minimal',
    name: 'Studio Serif',
    description: 'Monochrome perfection for luxury editorial and high-end fashion brands.',
    colors: {
      primary: '#000000',
      background: '#FFFFFF',
      accent: '#888888',
      surface: '#F5F5F5',
      text: '#000000'
    },
    typography: {
      display: 'Instrument Serif, serif',
      body: 'Inter, sans-serif',
      weight: '400'
    },
    principles: ['Serif display', 'Whitespace', 'Luxury minimal']
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Terminal Glow',
    description: 'Future-forward high-density interface with scanning lines and neon glows.',
    colors: {
      primary: '#00F0FF',
      background: '#000000',
      accent: '#FF00FF',
      surface: '#0A0A0A',
      text: '#00F0FF'
    },
    typography: {
      display: 'monospace',
      body: 'Inter, sans-serif',
      weight: '700'
    },
    principles: ['Holographic', 'Grid lines', 'High intensity']
  }
};
