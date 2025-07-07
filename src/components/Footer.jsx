import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react"
import { Link } from "react-router"


const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1 - Logo and Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🎓</span>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                UniScholar
              </h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xs">
              Find scholarships, apply easily, and take your education global with UniScholar. Your gateway to academic
              excellence.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 group-hover:text-pink-400 transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white relative">
              Quick Links
              <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/all-scholarships", label: "All Scholarships" },
                { href: "/login", label: "Login" },
                { href: "/register", label: "Register" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white relative">
              Resources
              <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {[
                { href: "#", label: "Scholarship Guide" },
                { href: "#", label: "FAQ" },
                { href: "#", label: "Support" },
                { href: "#", label: "Contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white relative">
              Contact Us
              <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full"></div>
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors duration-200 group">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm">info@unischolar.com</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors duration-200 group">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm">+880-1234-567890</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors duration-200 group">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm">Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-slate-400 text-sm">© {new Date().getFullYear()} UniScholar. All rights reserved.</p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
