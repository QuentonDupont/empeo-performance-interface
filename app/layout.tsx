import type { Metadata } from 'next'
import { Inter, IBM_Plex_Sans_Thai } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const ibmPlexThai = IBM_Plex_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-thai',
})

export const metadata: Metadata = {
  title: 'Performance Management - Empeo HR',
  description: 'Enhanced performance evaluation interface for comprehensive performance management',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th">
      <body className={`${inter.variable} ${ibmPlexThai.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
