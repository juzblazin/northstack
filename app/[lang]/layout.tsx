import { notFound } from 'next/navigation'
import { isLang, langs } from '../../src/i18n'
import Nav from '../../src/sections/Nav'
import { Footer } from '../../src/sections/Footer'
import SetHtmlLang from '../../src/components/SetHtmlLang'

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }))
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  return (
    <>
      <SetHtmlLang lang={lang} />
      <Nav lang={lang} />
      {children}
      <Footer lang={lang} />
    </>
  )
}
