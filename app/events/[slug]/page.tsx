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
    <div className="relative min-h-screen bg-[#050505] overflow-hidden text-white font-sans selection:bg-gold-500/30">
      {/* Background Animations */}
      <div className="absolute inset-0 bg-grid-tech opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* "Transformer" Tech Animation Element */}
      <div className="absolute top-20 right-10 md:right-20 opacity-20 pointer-events-none">
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 border-4 border-gold-500/30 rounded-full tech-spin border-t-transparent" />
          <div className="absolute inset-4 border-4 border-gold-500/20 rounded-full tech-spin-reverse border-b-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-gold-500 rounded-full glow-gold animate-pulse" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10 max-w-7xl">
        {/* Header content */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-200 mb-6 drop-shadow-lg">
            {event.name}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">

            {/* About Section */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:border-gold-500/30 transition-colors">
              <h2 className="text-3xl font-display font-bold text-gold-400 mb-6 flex items-center">
                <span className="w-2 h-8 bg-gold-500 mr-4 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.5)]"></span>
                About
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {event.longDescription}
              </p>
            </section>

            {/* Event Timeline Section */}
            {event.timeline && (
              <section className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <h2 className="text-3xl font-display font-bold text-gold-400 mb-8 flex items-center">
                  <span className="w-2 h-8 bg-gold-500 mr-4 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.5)]"></span>
                  Event Timeline
                </h2>
                <div className="space-y-6">
                  {event.timeline.map((item, index) => (
                    <div key={index} className="flex flex-col md:flex-row md:items-center group border-l-2 border-white/10 pl-6 md:pl-0 md:border-none">
                      <div className="md:w-32 flex-shrink-0 mb-2 md:mb-0">
                        <span className="px-4 py-1 bg-gold-500/10 text-gold-400 rounded-full text-sm font-bold border border-gold-500/20 group-hover:bg-gold-500 group-hover:text-black transition-all">
                          {item.time}
                        </span>
                      </div>
                      <div className="text-gray-300 text-lg group-hover:text-white transition-colors pl-2">
                        {item.activity}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Rules Section */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-3xl font-display font-bold text-gold-400 mb-6 flex items-center">
                <span className="w-2 h-8 bg-gold-500 mr-4 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.5)]"></span>
                Rules & Guidelines
              </h2>
              <ul className="grid gap-4">
                {event.rules.map((rule, index) => (
                  <li key={index} className="flex items-start bg-black/20 p-4 rounded-lg">
                    <span className="text-gold-500 mr-3 mt-1">❖</span>
                    <span className="text-gray-300">{rule}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-10 space-y-6">

              {/* Event Details Card */}
              <div className="bg-gray-900 border border-gold-500/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <h3 className="text-2xl font-display font-bold text-white mb-6 border-b border-gray-800 pb-4">
                  Event Details
                </h3>

                <div className="space-y-6">
                  {event.date && (
                    <div className="flex items-center text-gray-300">
                      <svg className="w-6 h-6 text-gold-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-semibold">{event.date}</p>
                      </div>
                    </div>
                  )}

                  {event.startTime && (
                    <div className="flex items-center text-gray-300">
                      <svg className="w-6 h-6 text-gold-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-semibold">{event.startTime}</p>
                      </div>
                    </div>
                  )}

                  {event.venue && (
                    <div className="flex items-center text-gray-300">
                      <svg className="w-6 h-6 text-gold-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      <div>
                        <p className="text-sm text-gray-500">Venue</p>
                        <p className="font-semibold">{event.venue}</p>
                      </div>
                    </div>
                  )}

                  {event.teamSize && (
                    <div className="flex items-center text-gray-300">
                      <svg className="w-6 h-6 text-gold-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                      <div>
                        <p className="text-sm text-gray-500">Team Size</p>
                        <p className="font-semibold">{event.teamSize}</p>
                      </div>
                    </div>
                  )}

                  {/* Prize Section in Sidebar */}
                  <div className="flex items-center text-gray-300 pt-4 border-t border-gray-800">
                    <svg className="w-6 h-6 text-gold-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <div>
                      <p className="font-bold text-gold-400 text-lg">{event.prize}</p>
                    </div>
                  </div>

                </div>

                <div className="mt-8">
                  <Link
                    href={`/register?event=${event.id}`}
                    className="block w-full text-center py-4 bg-gradient-to-r from-gold-500 to-amber-500 text-black font-bold text-xl rounded-xl hover:from-white hover:to-white transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                  >
                    Register Now
                  </Link>
                </div>
              </div>

              {/* Back Link */}
              <div className="text-center">
                <Link
                  href="/events"
                  className="text-gray-500 hover:text-gold-400 transition-colors text-sm"
                >
                  ← View All Events
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
