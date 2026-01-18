import Link from 'next/link'
import { Event } from '@/lib/events'

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-gray-900/50 border border-gold-500/20 rounded-xl p-6 hover:border-gold-500/50 transition-all hover:transform hover:scale-105 hover:glow-gold">
      <h3 className="text-2xl font-display font-bold text-gold-400 mb-3">
        {event.name}
      </h3>
      <p className="text-gray-300 mb-6">
        {event.description}
      </p>
      <Link
        href={`/events/${event.slug}`}
        className="inline-block px-6 py-2 bg-gold-500 text-black font-semibold rounded-lg hover:bg-gold-400 transition-all"
      >
        Learn More
      </Link>
    </div>
  )
}
