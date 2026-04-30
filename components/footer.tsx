"use client"

import Link from "next/link"
import { Scale, Mail, Phone, ArrowRight } from "lucide-react"
const practiceAreas = [
  "Family Law",
  "Criminal Defense",
  "Real Estate",
  "Estate Planning",
  "Immigration",
  "Personal Injury",
]

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

export function Footer() {
  return (
    <footer className="relative bg-[#08080C] border-t border-white/5 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2563EB]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#3B82F6]/5 rounded-full blur-3xl" />
      


      {/* Main Footer Content */}
      <div className="container mx-auto px-4 lg:px-8 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#3B82F6] flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                  <Scale className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight">
                  A.I. <span className="text-[#2563EB]">Esquire</span>
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">Legal</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Revolutionizing legal services with cutting-edge AI technology. 
              Expert representation for the modern world.
            </p>

          </div>

          {/* Practice Areas */}
          <div>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-4 bg-[#2563EB] rounded-full" />
              Practice Areas
            </h3>
            <ul className="space-y-3">
              {practiceAreas.map((area) => (
                <li key={area}>
                  <Link
                    href="/practice-areas"
                    className="text-gray-400 hover:text-[#2563EB] transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#2563EB]" />
                    <span className="group-hover:translate-x-1 transition-transform">{area}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-4 bg-[#2563EB] rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#2563EB] transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#2563EB]" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-4 bg-[#2563EB] rounded-full" />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-[#2563EB]/10 flex items-center justify-center shrink-0 group-hover:bg-[#2563EB]/20 transition-colors">
                  <Phone className="w-4 h-4 text-[#2563EB]" />
                </div>
                <a href="tel:+18452741100" className="text-gray-400 hover:text-[#2563EB] transition-colors text-sm">
                  (845) 274-1100
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-[#2563EB]/10 flex items-center justify-center shrink-0 group-hover:bg-[#2563EB]/20 transition-colors">
                  <Mail className="w-4 h-4 text-[#2563EB]" />
                </div>
                <a href="mailto:eric@aisquire.io" className="text-gray-400 hover:text-[#2563EB] transition-colors text-sm">
                  eric@aisquire.io
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Attorney Advertising Disclaimer */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <p className="text-gray-500 text-xs text-center mb-6 max-w-4xl mx-auto leading-relaxed">
            Attorney Advertising. Prior results do not guarantee a similar outcome. This website is for informational purposes only and does not constitute legal advice or create an attorney-client relationship. A.I. Esquire Legal is led by a Connecticut-licensed attorney and works with a nationwide network of independently licensed attorneys for matters outside Connecticut.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} A.I. Esquire Legal. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {["Privacy Policy", "Terms of Service", "Disclaimer", "Accessibility"].map((link) => (
              <Link 
                key={link} 
                href="#" 
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors animated-underline"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
