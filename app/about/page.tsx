import AboutPageView from './AboutPageView'
import client from '../../tina/__generated__/client'
import { AboutDocument } from '../../tina/__generated__/types'
import fallbackPage from '../../content/pages/about.json'

async function getData() {
  return client.queries
    .about({ relativePath: 'about.json' })
    .catch(() => ({
      data: { about: fallbackPage as any },
      query: AboutDocument,
      variables: { relativePath: 'about.json' },
    }))
}

export default async function AboutPage() {
  const page = await getData()
  return (
    <AboutPageView
      pageData={page.data}
      pageQuery={page.query}
      pageVars={page.variables}
    />
  )
}
