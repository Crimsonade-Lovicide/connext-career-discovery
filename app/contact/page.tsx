"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollRevealSection } from "@/components/scroll-reveal-section"
import { Button } from "@/components/ui/button"
import { 
  Mail, 
  Phone, 
  Clock, 
  Send,
  CheckCircle,
  Sparkles,
  MessageSquare,
  Shield,
  Zap,
  ArrowRight
} from "lucide-react"

const practiceAreas = [
  "Family Law",
  "Criminal Defense",
  "Real Estate",
  "Estate Planning",
  "Immigration",
  "Personal Injury",
  "Other",
]

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    content: "(845) 274-1100",
    subtext: "Mon-Fri 8am-8pm, Sat 9am-5pm",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Mail,
    title: "Email Us",
    content: "eric@aisquire.io",
    subtext: "Response within 24 hours",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Clock,
    title: "AI Available",
    content: "24/7 Availability",
    subtext: "Instant AI consultation",
    gradient: "from-amber-500 to-orange-500",
  },
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    practiceArea: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F] overflow-hidden">
      <div className="grain-overlay" />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#2563EB]/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#3B82F6]/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollRevealSection>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 glass-premium px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-[#2563EB]" />
                <span className="text-sm text-gray-300">Contact Us</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                Get Your <span className="gradient-text-animated text-glow">Free Consultation</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl">
                Ready to discuss your case? Reach out today and our AI-powered intake 
                system will connect you with the right legal expert.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <ScrollRevealSection key={info.title} delay={index * 100}>
                <div className="glass-premium rounded-2xl p-6 glow-card h-full group relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${info.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
                  
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                      <info.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">{info.title}</h3>
                    <p className="text-[#2563EB] font-medium mb-1">{info.content}</p>
                    <p className="text-gray-500 text-sm">{info.subtext}</p>
                  </div>
                </div>
              </ScrollRevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <ScrollRevealSection>
              <div className="glass-premium rounded-3xl p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#2563EB]/5 rounded-full blur-3xl" />
                
                {isSubmitted ? (
                  <div className="text-center py-16 relative z-10">
                    <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                      <CheckCircle className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                      Thank you for reaching out. Our team will review your information 
                      and get back to you within 24 hours.
                    </p>
                    <Button
                      onClick={() => {
                        setIsSubmitted(false)
                        setFormState({
                          firstName: "",
                          lastName: "",
                          email: "",
                          phone: "",
                          practiceArea: "",
                          message: "",
                        })
                      }}
                      variant="outline"
                      className="border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <MessageSquare className="w-5 h-5 text-[#2563EB]" />
                      <span className="text-gray-400 text-sm">Get in Touch</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Send Us a Message</h2>
                    <p className="text-gray-400 mb-8">
                      Fill out the form below and we&apos;ll get back to you promptly.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="group">
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formState.firstName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-4 bg-[#1a1a24] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2563EB] focus:shadow-[0_0_20px_rgba(37,99,235,0.15)] transition-all"
                            placeholder="John"
                          />
                        </div>
                        <div className="group">
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formState.lastName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-4 bg-[#1a1a24] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2563EB] focus:shadow-[0_0_20px_rgba(37,99,235,0.15)] transition-all"
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-4 bg-[#1a1a24] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2563EB] focus:shadow-[0_0_20px_rgba(37,99,235,0.15)] transition-all"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-4 bg-[#1a1a24] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2563EB] focus:shadow-[0_0_20px_rgba(37,99,235,0.15)] transition-all"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="practiceArea" className="block text-sm font-medium text-gray-300 mb-2">
                          Practice Area *
                        </label>
                        <select
                          id="practiceArea"
                          name="practiceArea"
                          value={formState.practiceArea}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-4 bg-[#1a1a24] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#2563EB] focus:shadow-[0_0_20px_rgba(37,99,235,0.15)] transition-all appearance-none cursor-pointer"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 1rem center',
                            backgroundSize: '1.5rem',
                          }}
                        >
                          <option value="" className="bg-[#1a1a24]">Select a practice area</option>
                          {practiceAreas.map((area) => (
                            <option key={area} value={area} className="bg-[#1a1a24]">
                              {area}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                          Tell Us About Your Case *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-4 py-4 bg-[#1a1a24] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2563EB] focus:shadow-[0_0_20px_rgba(37,99,235,0.15)] transition-all resize-none"
                          placeholder="Please describe your legal situation and how we can help..."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#2563EB] hover:bg-[#3B82F6] text-white py-6 text-lg shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-all"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-3">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-3">
                            <Send className="w-5 h-5" />
                            Request Free Consultation
                          </span>
                        )}
                      </Button>

                      <p className="text-gray-500 text-sm text-center">
                        By submitting this form, you agree to our Privacy Policy and Terms of Service.
                        Attorney-client privilege applies to all communications.
                      </p>
                    </form>
                  </div>
                )}
              </div>
            </ScrollRevealSection>

            {/* Map & Info Side */}
            <ScrollRevealSection delay={200}>
              <div className="space-y-8">
                {/* Nationwide Coverage Banner */}
                <div className="glass-premium rounded-3xl overflow-hidden aspect-video relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/20 via-[#3B82F6]/10 to-transparent flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.1)_0%,transparent_60%)]" />
                    
                    <div className="text-center relative z-10 px-6">
                      <div className="relative mx-auto mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#3B82F6] flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.5)] group-hover:scale-110 transition-transform mx-auto">
                          <Sparkles className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <p className="text-white font-medium text-lg">Nationwide Coverage</p>
                      <p className="text-gray-400 text-sm mt-2">Connecticut-licensed attorney with a vetted network across all 50 states</p>
                    </div>
                  </div>
                </div>

                {/* Why Contact Us */}
                <div className="glass-premium rounded-3xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563EB]/5 rounded-full blur-2xl" />
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      <Zap className="w-5 h-5 text-[#2563EB]" />
                      Why Contact A.I. Esquire?
                    </h3>
                    <div className="space-y-4">
                      {[
                        "Free initial case evaluation",
                        "AI-powered case analysis within hours",
                        "Experienced attorneys in all practice areas",
                        "Transparent pricing with no hidden fees",
                        "24/7 access to case updates via client portal",
                      ].map((item, i) => (
                        <div key={item} className="flex items-center gap-3 group">
                          <div className="w-6 h-6 rounded-lg bg-[#2563EB] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Urgent Notice */}
                <div className="glass-premium rounded-3xl p-8 border border-[#2563EB]/20 bg-gradient-to-br from-[#2563EB]/5 to-transparent relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#2563EB]/10 rounded-full blur-2xl" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative">
                        <Shield className="w-6 h-6 text-[#2563EB]" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                      </div>
                      <h4 className="text-white font-semibold text-lg">Need Urgent Legal Help?</h4>
                    </div>
                    <p className="text-gray-400 text-sm mb-6">
                      For time-sensitive legal matters, call our emergency line directly.
                    </p>
                    <Link
                      href="tel:+18452741100"
                      className="inline-flex items-center gap-3 px-6 py-3 bg-[#2563EB]/10 hover:bg-[#2563EB]/20 rounded-xl text-[#2563EB] font-medium transition-all group"
                    >
                      <Phone className="w-5 h-5" />
                      (845) 274-1100
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollRevealSection>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
