import type { Metadata } from 'next'
import './globals.css'
import TransformerNavbar from '@/components/TransformerNavbar'
import Footer from '@/components/Footer'
import GlobalBackground from '@/components/GlobalBackground'
import MobileDock from '@/components/MobileDock'

export const metadata: Metadata = {
  title: 'BLITZKRIEG 2K26 | Technical Symposium',
  description: 'Unleash your technical prowess at the ultimate symposium of R.M.K. Engineering College.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="scanlines" />
        <GlobalBackground />
        <TransformerNavbar />
        <main className="min-h-screen relative z-10 pb-28 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileDock />
      </body>
    </html>
  )
}
