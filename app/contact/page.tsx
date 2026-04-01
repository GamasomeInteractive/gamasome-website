import ContactPageView from './ContactPageView'
import client from '../../tina/__generated__/client'
import { normalizeTinaImages } from '../../lib/normalizeTinaImages'
import { ContactDocument } from '../../tina/__generated__/types'
import fallbackPage from '../../content/pages/contact.json'

async function getData() {
  const result = await client.queries
    .contact({ relativePath: 'contact.json' })
    .catch(() => ({
      data: { contact: fallbackPage as any },
      query: ContactDocument,
      variables: { relativePath: 'contact.json' },
    }))
  return { ...result, data: normalizeTinaImages(result.data) }
}

export default async function ContactPage() {
  const page = await getData()
  return (
    <ContactPageView
      pageData={page.data}
      pageQuery={page.query}
      pageVars={page.variables}
    />
  )
}
