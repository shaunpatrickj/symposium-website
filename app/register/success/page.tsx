import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-gray-900/50 border-2 border-gold-500 rounded-xl p-12">
          <div className="text-8xl mb-6 text-gold-400">✓</div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gold-400 mb-4">
            Registration Successful!
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Thank you for registering for the Technical Symposium 2024.
          </p>
          <p className="text-lg text-gray-400 mb-8">
            A confirmation email has been sent to your registered email address with all the details.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/"
              className="px-8 py-3 bg-gold-500 text-black font-semibold rounded-lg hover:bg-gold-400 transition-all"
            >
              Return to Home
            </Link>
            <Link
              href="/events"
              className="px-8 py-3 border-2 border-gold-500 text-gold-500 font-semibold rounded-lg hover:bg-gold-500 hover:text-black transition-all"
            >
              Explore More Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
