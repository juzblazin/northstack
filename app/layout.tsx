import type { Metadata } from 'next'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import '@fontsource-variable/plus-jakarta-sans'
import '@fontsource-variable/noto-sans-khmer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'NorthStack — Guides & Tools for Canadian Small Businesses',
    template: '%s | NorthStack',
  },
  icons: { icon: [{ url: '/assets/northstack-mark.svg', type: 'image/svg+xml' }] },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='light'||(!t&&matchMedia('(prefers-color-scheme: light)').matches))document.documentElement.classList.add('light')}catch(e){}`,
          }}
        />
        {children}
      </body>
    </html>
  )
}
