import ContactPageView from './ContactPageView'
import { ContactDocument } from '../../tina/__generated__/types'
import fallbackPage from '../../content/pages/contact.json'

export default async function ContactPage() {
  return (
    <ContactPageView
      pageData={{ contact: fallbackPage as any }}
      pageQuery={ContactDocument}
      pageVars={{ relativePath: 'contact.json' }}
    />
  )
}
