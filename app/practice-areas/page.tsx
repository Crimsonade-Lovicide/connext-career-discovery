import { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollRevealSection } from "@/components/scroll-reveal-section"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Shield, 
  Home, 
  FileText, 
  Globe, 
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Sparkles
} from "lucide-react"

export const metadata: Metadata = {
  title: "Practice Areas | A.I. Esquire Legal",
  description: "Expert legal services in Family Law, Criminal Defense, Real Estate, Estate Planning, Immigration, and Personal Injury.",
}

const practiceAreas = [
  {
    icon: Users,
    title: "Family Law",
    slug: "family-law",
    description: "Navigating family matters with compassion and AI-powered precision. We understand that family legal issues are deeply personal.",
    services: [
      "Divorce & Separation",
      "Child Custody & Support",
      "Adoption Proceedings",
      "Prenuptial Agreements",
      "Domestic Violence Protection",
      "Mediation Services",
    ],
    stats: { cases: "150+", rate: "94%" },
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-500/10 to-rose-500/5",
  },
  {
    icon: Shield,
    title: "Criminal Defense",
    slug: "criminal-defense",
    description: "Aggressive defense strategies backed by AI analysis of thousands of case precedents to protect your rights and freedom.",
    services: [
      "Felony Defense",
      "Misdemeanor Cases",
      "DUI/DWI Defense",
      "White Collar Crimes",
      "Drug Offenses",
      "Appeals & Post-Conviction",
    ],
    stats: { cases: "200+", rate: "89%" },
    gradient: "from-red-500 to-orange-500",
    bgGradient: "from-red-500/10 to-orange-500/5",
  },
  {
    icon: Home,
    title: "Real Estate",
    slug: "real-estate",
    description: "Comprehensive real estate legal services for buyers, sellers, developers, and investors across all property types.",
    services: [
      "Property Transactions",
      "Title Disputes",
      "Zoning & Land Use",
      "Commercial Leases",
      "Construction Disputes",
      "HOA Matters",
    ],
    stats: { cases: "180+", rate: "97%" },
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 to-teal-500/5",
  },
  {
    icon: FileText,
    title: "Estate Planning",
    slug: "estate-planning",
    description: "Secure your family&apos;s future with comprehensive estate planning services tailored to your unique situation.",
    services: [
      "Wills & Trusts",
      "Power of Attorney",
      "Healthcare Directives",
      "Probate Administration",
      "Asset Protection",
      "Business Succession",
    ],
    stats: { cases: "120+", rate: "99%" },
    gradient: "from-amber-500 to-yellow-500",
    bgGradient: "from-amber-500/10 to-yellow-500/5",
  },
  {
    icon: Globe,
    title: "Immigration",
    slug: "immigration",
    description: "Expert guidance through the complex U.S. immigration system, with AI-powered case tracking and document preparation.",
    services: [
      "Family-Based Immigration",
      "Employment Visas",
      "Green Card Applications",
      "Citizenship & Naturalization",
      "Deportation Defense",
      "Asylum Cases",
    ],
    stats: { cases: "250+", rate: "92%" },
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/5",
  },
  {
    icon: AlertCircle,
    title: "Personal Injury",
    slug: "personal-injury",
    description: "Fighting for maximum compensation when you&apos;ve been injured due to someone else&apos;s negligence.",
    services: [
      "Auto Accidents",
      "Medical Malpractice",
      "Workplace Injuries",
      "Slip & Fall Cases",
      "Product Liability",
      "Wrongful Death",
    ],
    stats: { cases: "300+", rate: "96%" },
    gradient: "from-purple-500 to-violet-500",
    bgGradient: "from-purple-500/10 to-violet-500/5",
  },
]

export default function PracticeAreasPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] overflow-hidden">
      <div className="grain-overlay" />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#2563EB]/10 rounded-full blur-3xl animate-pulse-glow" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollRevealSection>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 glass-premium px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-[#2563EB]" />
                <span className="text-sm text-gray-300">Practice Areas</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                Expert Legal Services <span className="gradient-text-animated text-glow">Across Disciplines</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl">
                Our AI-enhanced legal team provides comprehensive representation 
                in six key practice areas, combining human expertise with cutting-edge technology.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="py-10 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-20">
            {practiceAreas.map((area, index) => (
              <ScrollRevealSection key={area.title} delay={index * 50}>
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Content Side */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${area.gradient} flex items-center justify-center shadow-lg`}>
                        <area.icon className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white">{area.title}</h2>
                    </div>
                    
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                      {area.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {area.services.map((service) => (
                        <div key={service} className="flex items-center gap-3 group">
                          <div className="w-5 h-5 rounded-full bg-[#2563EB]/20 flex items-center justify-center shrink-0 group-hover:bg-[#2563EB]/40 transition-colors">
                            <CheckCircle className="w-3 h-3 text-[#2563EB]" />
                          </div>
                          <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{service}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <Button asChild className="bg-[#2563EB] hover:bg-[#3B82F6] shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all">
                        <Link href="/contact">
                          Get a Free Consultation
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white">
                        <Link href={`/practice-areas/${area.slug}`}>
                          Learn More
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Stats/Visual Side */}
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className={`glass-premium rounded-3xl p-8 glow-card relative overflow-hidden bg-gradient-to-br ${area.bgGradient}`}>
                      {/* Decorative Elements */}
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${area.gradient} opacity-20 rounded-full blur-2xl`} />
                      
                      <div className="relative z-10">
                        <div className="grid grid-cols-2 gap-8 mb-10">
                          <div className="text-center p-6 glass rounded-2xl">
                            <div className={`text-5xl font-bold bg-gradient-to-r ${area.gradient} bg-clip-text text-transparent`}>{area.stats.cases}</div>
                            <div className="text-gray-400 text-sm mt-2">Cases Handled</div>
                          </div>
                          <div className="text-center p-6 glass rounded-2xl">
                            <div className={`text-5xl font-bold bg-gradient-to-r ${area.gradient} bg-clip-text text-transparent`}>{area.stats.rate}</div>
                            <div className="text-gray-400 text-sm mt-2">Success Rate</div>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-400">AI Analysis Accuracy</span>
                              <span className="text-white font-medium">98%</span>
                            </div>
                            <div className="h-2 bg-[#1a1a24] rounded-full overflow-hidden">
                              <div className={`h-full bg-gradient-to-r ${area.gradient} rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]`} style={{ width: '98%' }} />
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-400">Response Time</span>
                              <span className="text-white font-medium">&lt; 2 hours</span>
                            </div>
                            <div className="h-2 bg-[#1a1a24] rounded-full overflow-hidden">
                              <div className={`h-full bg-gradient-to-r ${area.gradient} rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]`} style={{ width: '95%' }} />
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-400">Client Satisfaction</span>
                              <span className="text-white font-medium">{area.stats.rate}</span>
                            </div>
                            <div className="h-2 bg-[#1a1a24] rounded-full overflow-hidden">
                              <div className={`h-full bg-gradient-to-r ${area.gradient} rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]`} style={{ width: area.stats.rate }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {index < practiceAreas.length - 1 && (
                  <div className="border-t border-white/5 mt-20" />
                )}
              </ScrollRevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-[#08080C] to-[#0A0A0F] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.1)_0%,transparent_60%)]" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollRevealSection>
            <div className="glass-premium rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#2563EB]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#3B82F6]/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2563EB]"></span>
                  </span>
                  <span className="text-sm text-gray-300">Get Started Today</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Not Sure Which Practice Area You Need?
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
                  Our AI-powered intake system can analyze your situation and connect you 
                  with the right specialist. Get started with a free consultation today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-[#2563EB] hover:bg-[#3B82F6] shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] transition-all px-8">
                    <Link href="/contact">
                      Start Free Consultation
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white px-8">
                    <Link href="/how-it-works">
                      Learn How It Works
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      <Footer />
    </main>
  )
}
