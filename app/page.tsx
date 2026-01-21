import TransformerHero from '@/components/TransformerHero'
import TransformerAbout from '@/components/TransformerAbout'
import EventCard from '@/components/EventCard'
import { getEvents } from '@/lib/events'

export default function Home() {
  const events = getEvents()

  return (
    <main>
      <TransformerHero />
      <TransformerAbout />

      {/* Events Preview Section - Kept as requested but wrapped in consistent section */}
      <section id="events" className="py-20 px-4 bg-bg-dark border-t border-gray-900">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-tech text-white">
              BATTLE <span className="text-primary">ZONES</span>
            </h2>
            <div className="flex-1 h-[1px] bg-gray-800" />
            <div className="text-primary font-mono text-sm">EVENTS_MODULE</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
