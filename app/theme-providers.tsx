'use client'

import { ThemeProvider } from 'next-themes'

interface Props {
  children: React.ReactNode
  colorScheme?: string // 'light' | 'dark' | 'system'
}

export function ThemeProviders({ children, colorScheme = 'light' }: Props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={colorScheme}
      enableSystem={colorScheme === 'system'}
      forcedTheme={colorScheme === 'system' ? undefined : colorScheme}
    >
      {children}
    </ThemeProvider>
  )
}
