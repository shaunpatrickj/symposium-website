export default function Footer() {
  return (
    <footer className="bg-black border-t border-gold-500/20 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-display font-bold text-gold-400 mb-4">
              Tech Symposium 2024
            </h3>
            <p className="text-gray-400">
              A platform for innovation, learning, and technical excellence.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-gold-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/events" className="hover:text-gold-400 transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="/register" className="hover:text-gold-400 transition-colors">
                  Register
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <p className="text-gray-400">
              For inquiries, please contact the organizing committee.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gold-500/20 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Technical Symposium. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
