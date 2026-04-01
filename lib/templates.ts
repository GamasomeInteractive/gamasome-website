export interface TemplateDefinition {
  id: string
  name: string
  description: string
  emoji: string
  bg: string
  accent: string
}

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'White background with alternating left/right image + text cards. Professional and clean.',
    emoji: '📄',
    bg: '#ffffff',
    accent: '#2D9CDB',
  },
  {
    id: 'grid',
    name: 'Card Grid',
    description: 'Light background with equal-height 3-column cards. Great for showcasing many services.',
    emoji: '⊞',
    bg: '#F8FAFC',
    accent: '#2D9CDB',
  },
  {
    id: 'dark',
    name: 'Dark Tech',
    description: 'Dark background with glowing card borders and neon accents. Tech-forward and bold.',
    emoji: '🌑',
    bg: '#07091B',
    accent: '#00FCE2',
  },
]

/** Format a slug like "ai-solutions" → "AI Solutions" */
export function formatSlug(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
