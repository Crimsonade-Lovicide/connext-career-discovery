"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { AILegalAssistant } from "@/components/ai-legal-assistant"
import { Footer } from "@/components/footer"
import { ScrollRevealSection } from "@/components/scroll-reveal-section"
import { ParticleField } from "@/components/particle-field"
import { MagneticButton } from "@/components/magnetic-button"
import { AnimatedText } from "@/components/animated-text"
import { Button } from "@/components/ui/button"
import { ArrowRight, Scale, Shield, Clock, Users, ChevronRight, Sparkles, Zap, Award, Network } from "lucide-react"

const practiceAreas = [
  {
    icon: Users,
    title: "Family Law",
    description: "Divorce, custody, adoption, and family dispute resolution with compassion.",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    icon: Shield,
    title: "Criminal Defense",
    description: "Aggressive defense strategies protecting your rights and freedom.",
    gradient: "from-red-500/20 to-orange-500/20",
  },
  {
    icon: Scale,
    title: "Real Estate",
    description: "Property transactions, disputes, and zoning matters handled expertly.",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: Clock,
    title: "Estate Planning",
    description: "Wills, trusts, and asset protection for your family&apos;s future.",
    gradient: "from-amber-500/20 to-yellow-500/20",
  },
]



const features = [
  { icon: Zap, title: "AI-Powered Analysis", desc: "Instant analysis of thousands of case precedents" },
  { icon: Clock, title: "24/7 Support", desc: "Round-the-clock access to your case information" },
  { icon: Shield, title: "Secure & Private", desc: "Bank-level encryption for all your data" },
  { icon: Award, title: "Expert Team", desc: "Top attorneys backed by cutting-edge AI" },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] overflow-hidden">
      <ParticleField />
      <div className="grain-overlay" />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Morphing Gradient Blobs */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-[#2563EB]/30 to-[#3B82F6]/20 rounded-full blur-3xl animate-morph animate-float-subtle" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-[#3B82F6]/20 to-[#60a5fa]/15 rounded-full blur-3xl animate-morph animate-float" style={{ animationDelay: '-3s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#2563EB]/10 rounded-full blur-3xl animate-pulse-glow" />
          
          {/* Spinning Rings with Gradient */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full animate-spin-slow">
            <div className="absolute inset-0 rounded-full border border-transparent bg-gradient-to-r from-[#2563EB]/30 via-transparent to-transparent" style={{ backgroundOrigin: 'border-box', backgroundClip: 'border-box' }} />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full animate-spin-reverse">
            <div className="absolute inset-0 rounded-full border border-[#3B82F6]/10" />
            {/* Orbiting Dot */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#2563EB] rounded-full shadow-[0_0_20px_rgba(37,99,235,0.8)]" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#2563EB]/20 animate-spin-slow" style={{ animationDuration: '15s' }}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#3B82F6] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
          </div>
          
          {/* Grid Pattern with Fade */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(37, 99, 235, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
            }}
          />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-premium px-5 py-2.5 rounded-full mb-8 animate-fade-up">
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
              <span className="text-sm text-gray-300 font-medium">AI-Powered Legal Excellence</span>
              <div className="w-2 h-2 bg-[#2563EB] rounded-full animate-pulse shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 leading-[1.1]">
              <span className="block animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <span className="gradient-text-animated text-glow">Legal Representation.</span>
              </span>
              <span className="block text-white animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <AnimatedText text="Reimagined." delay={400} />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto animate-fade-up leading-relaxed" style={{ animationDelay: '0.3s' }}>
              Experience the future of law. Our AI-enhanced legal team delivers 
              faster insights, smarter strategies, and better outcomes for your case.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <MagneticButton href="/contact" size="lg" className="px-8 py-6 text-lg">
                Get a Free Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <MagneticButton href="/how-it-works" variant="outline" size="lg" className="px-8 py-6 text-lg">
                See How It Works
              </MagneticButton>
            </div>


          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-7 h-12 border-2 border-white/20 rounded-full flex items-start justify-center p-2 backdrop-blur-sm">
            <div className="w-1.5 h-3 bg-[#2563EB] rounded-full animate-bounce-soft shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
          </div>
        </div>
      </section>



      {/* Features Bar */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <ScrollRevealSection key={i} delay={i * 100}>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 flex items-center justify-center group-hover:bg-[#2563EB]/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">{feature.title}</h4>
                    <p className="text-gray-500 text-xs">{feature.desc}</p>
                  </div>
                </div>
              </ScrollRevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollRevealSection>
            <div className="text-center mb-16">
              <span className="text-[#2563EB] text-sm font-medium uppercase tracking-wider">What We Do</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
                Our <span className="gradient-text">Practice Areas</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Expert legal representation across multiple disciplines, 
                powered by cutting-edge AI technology.
              </p>
            </div>
          </ScrollRevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practiceAreas.map((area, index) => (
              <ScrollRevealSection key={area.title} delay={index * 100}>
                <Link
                  href="/practice-areas"
                  className="group block p-8 glass-premium rounded-2xl glow-card tilt-card relative overflow-hidden"
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${area.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10 flex items-start gap-6">
                    <div className="w-14 h-14 rounded-xl bg-[#2563EB]/10 flex items-center justify-center shrink-0 group-hover:bg-[#2563EB] group-hover:scale-110 transition-all duration-300">
                      <area.icon className="w-7 h-7 text-[#2563EB] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#2563EB] transition-colors">
                        {area.title}
                      </h3>
                      <p className="text-gray-400">{area.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-[#2563EB] group-hover:translate-x-2 transition-all" />
                  </div>
                </Link>
              </ScrollRevealSection>
            ))}
          </div>

          <ScrollRevealSection delay={400}>
            <div className="text-center mt-12">
              <Button
                asChild
                variant="outline"
                className="border-[#2563EB]/50 text-[#2563EB] hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-all"
              >
                <Link href="/practice-areas" className="animated-underline">
                  View All Practice Areas
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2563EB]/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollRevealSection>
              <div>
                <span className="text-[#2563EB] text-sm font-medium uppercase tracking-wider">Why Us</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                  Why Choose <span className="gradient-text">A.I. Esquire?</span>
                </h2>
                <p className="text-gray-400 mb-10 text-lg leading-relaxed">
                  We combine decades of legal expertise with advanced AI technology 
                  to deliver unprecedented results for our clients.
                </p>
                
                <div className="space-y-6">
                  {[
                    { title: "AI-Powered Analysis", desc: "Our AI reviews thousands of case precedents in seconds" },
                    { title: "24/7 Support", desc: "Get instant answers and updates on your case anytime" },
                    { title: "Transparent Pricing", desc: "No hidden fees, clear billing from start to finish" },
                    { title: "Expert Team", desc: "Seasoned attorneys backed by cutting-edge technology" },
                  ].map((item, i) => (
                    <ScrollRevealSection key={i} delay={i * 100}>
                      <div className="group">
                        <div className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                            <p className="text-gray-400 text-sm">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    </ScrollRevealSection>
                  ))}
                </div>
              </div>
            </ScrollRevealSection>

            <ScrollRevealSection delay={200}>
              <div className="relative">
                {/* Main Card */}
                <div className="glass-premium rounded-3xl p-10 relative overflow-hidden">
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#2563EB] to-[#3B82F6] rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.5)] rotate-12">
                    <Scale className="w-12 h-12 text-white -rotate-12" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 pr-16">Free Case Evaluation</h3>
                  <p className="text-gray-400 mb-8 leading-relaxed">
                    Get a comprehensive analysis of your case with our AI-powered 
                    evaluation tool. No obligation, completely confidential.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {["Instant AI case analysis", "Expert attorney review", "Clear strategy roadmap"].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#2563EB]/20 flex items-center justify-center">
                          <svg className="w-3 h-3 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-300 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <MagneticButton href="/contact" className="w-full justify-center">
                    Start Your Free Evaluation
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-[#2563EB]/20 rounded-2xl -z-10" />
                <div className="absolute -top-4 -left-8 w-20 h-20 bg-[#2563EB]/5 rounded-xl -z-10" />
              </div>
            </ScrollRevealSection>
          </div>
        </div>
      </section>

      {/* AI Legal Assistant Section */}
      <AILegalAssistant />

      {/* Built Differently Section */}
      <section className="py-24 bg-gradient-to-b from-[#08080C] to-[#0A0A0F] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.05)_0%,transparent_70%)]" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollRevealSection>
            <div className="text-center mb-16">
              <span className="text-[#2563EB] text-sm font-medium uppercase tracking-wider">Our Difference</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
                Built <span className="gradient-text">Differently</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Why A.I. Esquire is not a typical law firm
              </p>
            </div>
          </ScrollRevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollRevealSection delay={0}>
              <div className="glass-premium rounded-2xl p-8 h-full glow-card relative group">
                <div className="w-14 h-14 rounded-xl bg-[#2563EB]/10 flex items-center justify-center mb-6 group-hover:bg-[#2563EB] group-hover:scale-110 transition-all duration-300">
                  <Scale className="w-7 h-7 text-[#2563EB] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Licensed Attorney</h3>
                <p className="text-gray-400 leading-relaxed">
                  Founded and led by a Connecticut-licensed attorney. Real bar admission, real accountability, real representation.
                </p>
              </div>
            </ScrollRevealSection>

            <ScrollRevealSection delay={150}>
              <div className="glass-premium rounded-2xl p-8 h-full glow-card relative group">
                <div className="w-14 h-14 rounded-xl bg-[#2563EB]/10 flex items-center justify-center mb-6 group-hover:bg-[#2563EB] group-hover:scale-110 transition-all duration-300">
                  <Network className="w-7 h-7 text-[#2563EB] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Nationwide Network</h3>
                <p className="text-gray-400 leading-relaxed">
                  Backed by a vetted network of attorneys across all 50 states so wherever you are, we can match you with qualified local counsel.
                </p>
              </div>
            </ScrollRevealSection>

            <ScrollRevealSection delay={300}>
              <div className="glass-premium rounded-2xl p-8 h-full glow-card relative group">
                <div className="w-14 h-14 rounded-xl bg-[#2563EB]/10 flex items-center justify-center mb-6 group-hover:bg-[#2563EB] group-hover:scale-110 transition-all duration-300">
                  <Sparkles className="w-7 h-7 text-[#2563EB] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">AI-First Workflow</h3>
                <p className="text-gray-400 leading-relaxed">
                  We use modern AI to draft, review, and analyze faster — so you get clearer answers, lower costs, and a free initial consultation.
                </p>
              </div>
            </ScrollRevealSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/10 via-[#3B82F6]/5 to-[#2563EB]/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#2563EB]/5 rounded-full blur-3xl" />
        
        {/* Animated Lines */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2563EB] to-transparent animate-shimmer" />
          <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent animate-shimmer" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollRevealSection>
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2563EB]"></span>
                </span>
                <span className="text-sm text-gray-300">Free consultations available now</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Ready to <span className="gradient-text-animated">Get Started?</span>
              </h2>
              <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
                Schedule your free consultation today and discover how AI-powered 
                legal representation can transform your case outcome.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticButton href="/contact" size="lg" className="px-10">
                  Schedule Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </MagneticButton>
                <MagneticButton href="tel:+18452741100" variant="outline" size="lg" className="px-10">
                  Call (845) 274-1100
                </MagneticButton>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      <Footer />
    </main>
  )
}
