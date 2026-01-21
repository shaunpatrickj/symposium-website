import Link from 'next/link'
import { getEvents } from '@/lib/events'
import EventCard from '@/components/EventCard'

export default function EventsPage() {
  const events = getEvents()

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-gold-400 mb-6">
            All Events
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore all the exciting technical competitions and events at our symposium
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/register"
            className="inline-block px-8 py-4 bg-gold-500 text-black font-bold text-xl rounded-lg hover:bg-gold-400 transition-all transform hover:scale-105 glow-gold"
          >
            Register for Events
          </Link>
        </div>
      </div>
    </div>
  )
}
