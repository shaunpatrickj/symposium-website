'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-black/80 backdrop-blur-md border-b border-gold-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-display font-bold text-gold-400">
            Tech Symposium
          </Link>
          
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className={`transition-colors ${
                pathname === '/' ? 'text-gold-400' : 'text-gray-300 hover:text-gold-400'
              }`}
            >
              Home
            </Link>
            <Link
              href="/events"
              className={`transition-colors ${
                pathname?.startsWith('/events') ? 'text-gold-400' : 'text-gray-300 hover:text-gold-400'
              }`}
            >
              Events
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-gold-500 text-black font-semibold rounded-lg hover:bg-gold-400 transition-all"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
