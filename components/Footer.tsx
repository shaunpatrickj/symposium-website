import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gold-500/20 py-12 mt-20 font-sans">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-200 mb-4">
              BlitzKrieg 2K26
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Unleash your technical prowess at the ultimate symposium of R.M.K. Engineering College.
            </p>
            <div className="mt-6">
              <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/blitzkrieg_2k26?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gold-400 transition-colors hover:scale-110 transform duration-300"
                >
                  <div className="w-8 h-8 relative rounded-lg overflow-hidden border border-gray-700 hover:border-gold-400/50">
                    <Image
                      src="/instagram.jpg"
                      alt="Follow us on Instagram"
                      fill
                      className="object-cover"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-lg font-bold text-white mb-6 border-l-4 border-gold-500 pl-3">Quick Links</h4>
            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/events/paper-presentation" className="hover:text-gold-400 transition-colors">Paper Presentation</a></li>
                <li><a href="/events/el-casino" className="hover:text-gold-400 transition-colors">El Casino</a></li>
                <li><a href="/events/electro-quest" className="hover:text-gold-400 transition-colors">Electro Quest</a></li>
              </ul>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/events/circuit-debugging" className="hover:text-gold-400 transition-colors">Circuit Debugging</a></li>
                <li><a href="/events/mind-spark" className="hover:text-gold-400 transition-colors">MIND SPARK</a></li>
                <li><a href="/register" className="hover:text-gold-400 transition-colors">Register</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 border-l-4 border-gold-500 pl-3">Contact Us</h4>
            <div className="space-y-4 text-gray-400 text-sm">
              <p>
                <strong className="text-white block mb-1">R.M.K. Engineering College</strong>
                Kavaraipettai, Gummudipoondi,<br />
                Tamil Nadu, 601206
              </p>
              <p>
                <a href="mailto:blitzkrieg.2k26@gmail.com" className="hover:text-gold-400 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  blitzkrieg.2k26@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gold-500/20 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2026 BLITZKRIEG2K26 — Department of Electrical and Electronics Engineering</p>
        </div>
      </div>
    </footer>
  )
}
