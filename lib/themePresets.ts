export interface ThemePreset {
  id: string
  name: string
  description: string
  emoji: string
  colors: {
    fontFamily: string
    headingColor: string
    bodyColor: string
    labelColor: string
    primaryColor: string
    accentColor: string
    bgPrimary: string
    bgSecondary: string
    bgStats: string
    bgFooter: string
  }
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'dark-cosmic',
    name: 'Dark Cosmic',
    description: 'Deep space blue with cyan glow — the default',
    emoji: '🌌',
    colors: {
      fontFamily: 'Poppins',
      headingColor: '#ffffff',
      bodyColor: 'rgba(255,255,255,0.55)',
      labelColor: '#00FCE2',
      primaryColor: '#2D9CDB',
      accentColor: '#00FCE2',
      bgPrimary: '#07091B',
      bgSecondary: '#0A0E24',
      bgStats: '#0D1127',
      bgFooter: '#111827',
    },
  },
  {
    id: 'dark-purple',
    name: 'Dark Purple',
    description: 'Deep violet with electric purple accents',
    emoji: '💜',
    colors: {
      fontFamily: 'Poppins',
      headingColor: '#ffffff',
      bodyColor: 'rgba(255,255,255,0.55)',
      labelColor: '#C77DFF',
      primaryColor: '#7B2FBE',
      accentColor: '#C77DFF',
      bgPrimary: '#0D0A1A',
      bgSecondary: '#130E24',
      bgStats: '#18112E',
      bgFooter: '#1F1535',
    },
  },
  {
    id: 'dark-emerald',
    name: 'Dark Emerald',
    description: 'Forest depths with mint-green glow',
    emoji: '💚',
    colors: {
      fontFamily: 'Poppins',
      headingColor: '#ffffff',
      bodyColor: 'rgba(255,255,255,0.55)',
      labelColor: '#4AFFA9',
      primaryColor: '#00875A',
      accentColor: '#4AFFA9',
      bgPrimary: '#060F0A',
      bgSecondary: '#091A10',
      bgStats: '#0C2016',
      bgFooter: '#152A1D',
    },
  },
  {
    id: 'midnight-gold',
    name: 'Midnight Gold',
    description: 'Dark charcoal with warm golden highlights',
    emoji: '✨',
    colors: {
      fontFamily: 'Montserrat',
      headingColor: '#FFD700',
      bodyColor: 'rgba(255,255,255,0.6)',
      labelColor: '#FFC107',
      primaryColor: '#D4A017',
      accentColor: '#FFD700',
      bgPrimary: '#0D0D0D',
      bgSecondary: '#141414',
      bgStats: '#1A1A1A',
      bgFooter: '#252525',
    },
  },
  {
    id: 'ocean-deep',
    name: 'Ocean Deep',
    description: 'Navy depths with electric blue waves',
    emoji: '🌊',
    colors: {
      fontFamily: 'Inter',
      headingColor: '#E8F4FD',
      bodyColor: 'rgba(232,244,253,0.6)',
      labelColor: '#60EFFF',
      primaryColor: '#0066CC',
      accentColor: '#60EFFF',
      bgPrimary: '#020B18',
      bgSecondary: '#041525',
      bgStats: '#061D30',
      bgFooter: '#0A2A40',
    },
  },
  {
    id: 'crimson-night',
    name: 'Crimson Night',
    description: 'Dark intensity with burning red-orange fire',
    emoji: '🔥',
    colors: {
      fontFamily: 'Raleway',
      headingColor: '#ffffff',
      bodyColor: 'rgba(255,255,255,0.55)',
      labelColor: '#FF6B35',
      primaryColor: '#CC2900',
      accentColor: '#FF6B35',
      bgPrimary: '#0F0707',
      bgSecondary: '#180C0C',
      bgStats: '#200F0F',
      bgFooter: '#2D1515',
    },
  },
]

export function getPresetById(id: string): ThemePreset | undefined {
  return THEME_PRESETS.find((p) => p.id === id)
}
