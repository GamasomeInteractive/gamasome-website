import { assertDevOnly, internalToolMetadata } from '@/lib/internalTool'

export const metadata = internalToolMetadata

export default function InternalToolLayout({ children }: { children: React.ReactNode }) {
  assertDevOnly()
  return <>{children}</>
}
