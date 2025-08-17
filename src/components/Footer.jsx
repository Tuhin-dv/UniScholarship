import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react"
import { FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-950 via-slate-900 to-sky-950 text-white pt-20">
      <div className="max-w-[1780px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & About */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-sky-600 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110">
                <FaGraduationCap className="text-white text-xl" />
              </div>
              <div className="text-2xl font-bold">UniScholar</div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your global scholarship companion. Find, apply, and succeed in your educational journey.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-sky-600 transition-all duration-300 hover:scale-110 shadow-inner"
                >
                  <Icon className="w-5 h-5 text-slate-300 hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-5 relative inline-block">
              Quick Links
              <span className="block w-10 h-0.5 mt-1 bg-gradient-to-r from-sky-400 to-pink-400 rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/all-scholarships", label: "All Scholarships" },
                { href: "/login", label: "Login" },
                { href: "/register", label: "Register" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="text-slate-400 hover:text-white relative inline-block transition-colors group"
                  >
                    {label}
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-sky-400 to-sky-500 transition-all group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-semibold mb-5 relative inline-block">
              Resources
              <span className="block w-10 h-0.5 mt-1 bg-gradient-to-r from-sky-400 to-pink-400 rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: "#", label: "Scholarship Guide" },
                { href: "#", label: "FAQ" },
                { href: "#", label: "Support" },
                { href: "#", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-slate-400 hover:text-white relative inline-block transition-colors group"
                  >
                    {label}
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-500 transition-all group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-5 relative inline-block">
              Contact Us
              <span className="block w-10 h-0.5 mt-1 bg-gradient-to-r from-sky-400 to-pink-400 rounded-full"></span>
            </h3>
            <ul className="space-y-5 text-sm text-slate-300">
              {[
                { icon: Mail, text: "info@unischolar.com" },
                { icon: Phone, text: "+880-1234-567890" },
                { icon: MapPin, text: "Dhaka, Bangladesh" },
              ].map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <span className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center shadow-sm hover:bg-sky-600 transition">
                    <Icon className="w-4 h-4" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} UniScholar. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition">
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
