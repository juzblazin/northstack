'use client'

import { useEffect } from 'react'
import type { Lang } from '../i18n'

export default function SetHtmlLang({ lang }: { lang: Lang }) {
  useEffect(() => {
    document.documentElement.lang = lang === 'fr' ? 'fr-CA' : 'en-CA'
  }, [lang])
  return null
}
