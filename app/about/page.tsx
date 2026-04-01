import AboutPageView from './AboutPageView'
import { AboutDocument } from '../../tina/__generated__/types'
import fallbackPage from '../../content/pages/about.json'

export default async function AboutPage() {
  return (
    <AboutPageView
      pageData={{ about: fallbackPage as any }}
      pageQuery={AboutDocument}
      pageVars={{ relativePath: 'about.json' }}
    />
  )
}
