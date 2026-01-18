import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getEventBySlug, getEventSlugs } from '@/lib/events'

export async function generateStaticParams() {
  const slugs = getEventSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export default function EventPage({ params }: { params: { slug: string } }) {
  const event = getEventBySlug(params.slug)

  if (!event) {
    notFound()
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900 min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-gold-400 mb-6">
            {event.name}
          </h1>
          <p className="text-xl text-gray-300">
            {event.description}
          </p>
        </div>

        {/* Content */}
        <div className="bg-gray-900/50 border border-gold-500/20 rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-display font-bold text-gold-400 mb-4">
            About
          </h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            {event.longDescription}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Rules & Guidelines
              </h3>
              <ul className="space-y-2 text-gray-300">
                {event.rules.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-gold-400 mr-2">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Prizes
              </h3>
              <p className="text-gray-300 text-lg">
                {event.prize}
              </p>
            </div>
          </div>
        </div>

        {/* Register Button */}
        <div className="text-center">
          <Link
            href={`/register?event=${event.id}`}
            className="inline-block px-12 py-4 bg-gold-500 text-black font-bold text-xl rounded-lg hover:bg-gold-400 transition-all transform hover:scale-105 glow-gold"
          >
            Register Now
          </Link>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-gold-400 hover:text-gold-300 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
