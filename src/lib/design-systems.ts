/**
 * @fileOverview Design System Fragments and Tokens for Siteforge AI.
 * Defines the visual identity tokens for requested systems.
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
    name: 'Aubergine Efficiency',
    description: 'The iconic Slack-style sidebar layout with clear typography.',
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
    name: 'Playful Sage',
    description: 'A warm, approachable palette with bold IBM Plex Sans.',
    colors: {
      primary: '#F54E00',
      background: '#FDFDF8',
      accent: '#4D4F46',
      surface: '#EEEFE9',
      text: '#4D4F46'
    },
    typography: {
      display: 'IBM Plex Sans, sans-serif',
      body: 'IBM Plex Sans, sans-serif',
      weight: '800'
    },
    principles: ['Warm parchment', 'Playful bold', 'Olive accents']
  },
  spotify: {
    id: 'spotify',
    name: 'Obsidian Pulse',
    description: 'Deep black surfaces with the signature vibrant green.',
    colors: {
      primary: '#1ED760',
      background: '#121212',
      accent: '#1ED760',
      surface: '#181818',
      text: '#FFFFFF'
    },
    typography: {
      display: 'Circular, system-ui',
      body: 'Circular, system-ui',
      weight: '700'
    },
    principles: ['Ultra-dark', 'High contrast', 'Vibrant accents']
  },
  coinbase: {
    id: 'coinbase',
    name: 'Financial Trust',
    description: 'Modern, clean, and trustworthy fintech aesthetic.',
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
    principles: ['Blue trust', 'Wide spacing', 'Clean grids']
  },
  minimal: {
    id: 'minimal',
    name: 'Studio Pure',
    description: 'Monochrome perfection for luxury and editorial brands.',
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
    principles: ['Serif display', 'Whitespace', 'Minimalism']
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Neural Neon',
    description: 'Future-forward high-density technical interface.',
    colors: {
      primary: '#00F0FF',
      background: '#000000',
      accent: '#FF00FF',
      surface: '#0A0A0A',
      text: '#00F0FF'
    },
    typography: {
      display: 'JetBrains Mono, monospace',
      body: 'Inter, sans-serif',
      weight: '700'
    },
    principles: ['Glow effects', 'Monospace', 'Grid lines']
  }
};
