"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X, Scale, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "glass-strong py-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
            : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#3B82F6] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                  <Scale className="w-5 h-5 text-white" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-[#2563EB] blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight">
                  A.I. <span className="text-[#2563EB]">Esquire</span>
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">Legal</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg group",
                      isActive 
                        ? "text-white" 
                        : "text-gray-400 hover:text-white"
                    )}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-lg bg-white/5 border border-white/10" />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    {!isActive && (
                      <span className="absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#2563EB] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button
                asChild
                className="bg-[#2563EB] hover:bg-[#3B82F6] text-white px-6 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all glow-button"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  Free Consultation
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg glass"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={cn(
                "absolute w-5 h-0.5 bg-white transition-all duration-300",
                isMobileMenuOpen ? "rotate-45" : "-translate-y-1.5"
              )} />
              <span className={cn(
                "absolute w-5 h-0.5 bg-white transition-all duration-300",
                isMobileMenuOpen && "opacity-0"
              )} />
              <span className={cn(
                "absolute w-5 h-0.5 bg-white transition-all duration-300",
                isMobileMenuOpen ? "-rotate-45" : "translate-y-1.5"
              )} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-40 lg:hidden transition-all duration-500",
        isMobileMenuOpen 
          ? "opacity-100 pointer-events-auto" 
          : "opacity-0 pointer-events-none"
      )}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-[#0A0A0F]/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className={cn(
          "absolute top-20 left-4 right-4 glass-premium rounded-2xl p-6 transform transition-all duration-500",
          isMobileMenuOpen 
            ? "translate-y-0 opacity-100" 
            : "-translate-y-4 opacity-0"
        )}>
          <div className="flex flex-col gap-2">
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl transition-all",
                    isActive 
                      ? "bg-[#2563EB]/10 text-[#2563EB]" 
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  )}
                  style={{ 
                    transitionDelay: isMobileMenuOpen ? `${i * 50}ms` : '0ms' 
                  }}
                >
                  <span className="font-medium">{link.label}</span>
                  <ChevronRight className={cn(
                    "w-4 h-4 transition-transform",
                    isActive && "text-[#2563EB]"
                  )} />
                </Link>
              )
            })}
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/10">
            <Button
              asChild
              className="w-full bg-[#2563EB] hover:bg-[#3B82F6] text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"
            >
              <Link href="/contact">
                Get Free Consultation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
