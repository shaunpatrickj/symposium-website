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
                <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.48 2h-.165zm-2.923 7.828a4.172 4.172 0 00-.005 8.35c2.305 0 4.17-1.87 4.17-4.175 0-2.304-1.865-4.175-4.165-4.175zm.005 6.467a2.296 2.296 0 110-4.593 2.296 2.296 0 010 4.593zm7.045-7.79a1.071 1.071 0 110 2.142 1.071 1.071 0 010-2.142z" clipRule="evenodd" /></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-lg font-bold text-white mb-6 border-l-4 border-gold-500 pl-3">Quick Links</h4>
            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/about" className="hover:text-gold-400 transition-colors">About Us</a></li>
                <li><a href="/rules" className="hover:text-gold-400 transition-colors">Rules</a></li>
                <li><a href="/events/paper-presentation" className="hover:text-gold-400 transition-colors">Paper Presentation</a></li>
                <li><a href="/events/el-casino" className="hover:text-gold-400 transition-colors">El Casino</a></li>
                <li><a href="/events/electro-quest" className="hover:text-gold-400 transition-colors">Electro Quest</a></li>
              </ul>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/events/circuit-debugging" className="hover:text-gold-400 transition-colors">Circuit Debugging</a></li>
                <li><a href="/events/locked-in" className="hover:text-gold-400 transition-colors">Locked In</a></li>
                <li><a href="/map" className="hover:text-gold-400 transition-colors">Map</a></li>
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
          <p>&copy; 2025 BlitzKrieg. Soru ku naanga guarantee.</p>
        </div>
      </div>
    </footer>
  )
}
