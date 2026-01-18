import Link from 'next/link'
import { getEvents } from '@/lib/events'
import EventCard from '@/components/EventCard'

export default function Home() {
  const events = getEvents()

  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_70%)]"></div>
        <div className="container mx-auto px-4 py-20 text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 text-gold-400">
            Technical
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-4">
            2024
          </p>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Join us for an electrifying journey through innovation, competition, and technical excellence
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/register"
              className="px-8 py-4 bg-gold-500 text-black font-semibold rounded-lg hover:bg-gold-400 transition-all transform hover:scale-105 glow-gold"
            >
              Register Now
            </Link>
            <Link
              href="#events"
              className="px-8 py-4 border-2 border-gold-500 text-gold-500 font-semibold rounded-lg hover:bg-gold-500 hover:text-black transition-all"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="container mx-auto px-4 py-20">
        <h2 className="text-5xl font-display font-bold text-center text-gold-400 mb-4">
          Our Events
        </h2>
        <p className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Discover exciting technical competitions designed to challenge and inspire
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-20 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-display font-bold text-gold-400 mb-6">
            About the Symposium
          </h2>
          <p className="text-lg text-gray-300 mb-4">
            Our annual Technical Symposium brings together students, innovators, and industry professionals 
            for a day of learning, competition, and networking. With diverse events spanning from paper 
            presentations to hands-on circuit challenges, there's something for every technical enthusiast.
          </p>
          <p className="text-lg text-gray-300">
            Join hundreds of participants in showcasing your skills, learning from peers, and competing 
            for exciting prizes and recognition.
          </p>
        </div>
      </section>
    </div>
  )
}
