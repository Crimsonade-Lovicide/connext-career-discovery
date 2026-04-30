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
  Sparkles,
  Scale,
  Network
} from "lucide-react"

const practiceAreasData: Record<string, {
  title: string
  icon: typeof Users
  gradient: string
  bgGradient: string
  metaDescription: string
  overview: string[]
  services: string[]
}> = {
  "personal-injury": {
    title: "Personal Injury",
    icon: AlertCircle,
    gradient: "from-purple-500 to-violet-500",
    bgGradient: "from-purple-500/10 to-violet-500/5",
    metaDescription: "Expert personal injury representation combining licensed attorneys with AI-powered case analysis. Free consultation for auto accidents, medical malpractice, workplace injuries, and more.",
    overview: [
      "When you have been injured due to someone else's negligence, you deserve compensation that reflects the full extent of your damages. At A.I. Esquire Legal, we combine the expertise of licensed attorneys with AI-powered analysis to build the strongest possible case for your recovery.",
      "Our team handles all aspects of personal injury claims, from initial investigation through settlement negotiations or trial. We use advanced AI tools to analyze medical records, calculate damages, and identify all potentially liable parties to maximize your compensation.",
      "We work on a contingency basis for personal injury cases, meaning you pay nothing unless we win. Our nationwide network of attorneys ensures you have qualified local counsel no matter where your injury occurred."
    ],
    services: [
      "Auto and motorcycle accident claims",
      "Medical malpractice and misdiagnosis cases",
      "Workplace and construction injuries",
      "Slip and fall / premises liability",
      "Product liability and defective products"
    ]
  },
  "family-law": {
    title: "Family Law",
    icon: Users,
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-500/10 to-rose-500/5",
    metaDescription: "Compassionate family law services with AI-enhanced efficiency. Divorce, child custody, adoption, and prenuptial agreements handled by licensed attorneys. Free consultation.",
    overview: [
      "Family legal matters are among the most emotionally challenging situations you may face. At A.I. Esquire Legal, we approach every family law case with compassion and understanding, while leveraging AI technology to handle your case more efficiently and affordably.",
      "Our licensed attorneys have extensive experience in all aspects of family law, from amicable divorces to contested custody battles. We use AI-powered tools to streamline document preparation, track deadlines, and analyze case precedents, allowing us to focus more time on your unique needs.",
      "Whether you are going through a divorce, seeking custody arrangements, or planning for your family's future with a prenuptial agreement, our team provides personalized guidance every step of the way."
    ],
    services: [
      "Divorce and legal separation proceedings",
      "Child custody and parenting time arrangements",
      "Child and spousal support calculations",
      "Adoption and guardianship matters",
      "Prenuptial and postnuptial agreements"
    ]
  },
  "estate-planning": {
    title: "Estate Planning",
    icon: FileText,
    gradient: "from-amber-500 to-yellow-500",
    bgGradient: "from-amber-500/10 to-yellow-500/5",
    metaDescription: "Comprehensive estate planning services to protect your family's future. Wills, trusts, powers of attorney, and probate administration. Free consultation with licensed attorneys.",
    overview: [
      "Proper estate planning ensures your wishes are honored and your loved ones are protected. A.I. Esquire Legal makes estate planning accessible and straightforward, using AI-enhanced workflows to create comprehensive plans tailored to your specific situation.",
      "Our licensed attorneys work with you to understand your goals, family dynamics, and financial situation. We then use advanced tools to draft precise legal documents while explaining every provision in plain language so you understand exactly how your estate plan works.",
      "From simple wills to complex trust structures, we provide estate planning solutions for every stage of life. Our team also assists with probate administration, helping executors and beneficiaries navigate the process efficiently."
    ],
    services: [
      "Last will and testament preparation",
      "Revocable and irrevocable trust creation",
      "Powers of attorney and healthcare directives",
      "Probate and estate administration",
      "Business succession planning"
    ]
  },
  "business-law": {
    title: "Business Law",
    icon: Scale,
    gradient: "from-blue-500 to-indigo-500",
    bgGradient: "from-blue-500/10 to-indigo-500/5",
    metaDescription: "Strategic business legal services for startups and established companies. Entity formation, contracts, compliance, and disputes handled by licensed attorneys with AI efficiency.",
    overview: [
      "In today's fast-paced business environment, you need legal counsel that can keep up. A.I. Esquire Legal provides comprehensive business law services that combine experienced legal judgment with AI-powered efficiency to help your business thrive.",
      "Our attorneys advise businesses of all sizes, from startups forming their first LLC to established companies navigating complex transactions. We use AI tools to review contracts faster, track regulatory changes, and identify potential issues before they become problems.",
      "Whether you need help with entity formation, contract negotiations, employment matters, or business disputes, our team delivers practical legal solutions that align with your business objectives."
    ],
    services: [
      "Business entity formation and structuring",
      "Contract drafting, review, and negotiation",
      "Employment law and HR compliance",
      "Intellectual property protection",
      "Business disputes and litigation"
    ]
  },
  "real-estate": {
    title: "Real Estate",
    icon: Home,
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 to-teal-500/5",
    metaDescription: "Full-service real estate legal representation for buyers, sellers, and investors. Title review, closings, disputes, and commercial transactions. Free consultation.",
    overview: [
      "Real estate transactions involve significant financial commitments and complex legal requirements. A.I. Esquire Legal provides thorough real estate legal services that protect your interests while streamlining the process through AI-enhanced workflows.",
      "Our licensed attorneys handle residential and commercial real estate matters, from straightforward home purchases to complex development projects. We use AI-powered tools to review title documents, identify potential issues, and ensure all closing requirements are met.",
      "Whether you are buying your first home, investing in rental properties, or developing commercial real estate, our team provides the legal guidance you need to close with confidence."
    ],
    services: [
      "Residential and commercial closings",
      "Title examination and insurance",
      "Purchase and sale agreement review",
      "Landlord-tenant disputes",
      "Zoning and land use matters"
    ]
  },
  "criminal-defense": {
    title: "Criminal Defense",
    icon: Shield,
    gradient: "from-red-500 to-orange-500",
    bgGradient: "from-red-500/10 to-orange-500/5",
    metaDescription: "Aggressive criminal defense representation backed by AI-powered case analysis. Felonies, misdemeanors, DUI, and appeals handled by experienced licensed attorneys. Free consultation.",
    overview: [
      "When you are facing criminal charges, your freedom and future are on the line. A.I. Esquire Legal provides aggressive criminal defense representation, using AI-powered analysis of case law and evidence to build the strongest possible defense strategy.",
      "Our licensed attorneys have extensive experience defending clients against all types of criminal charges, from misdemeanors to serious felonies. We use advanced technology to analyze discovery materials, identify weaknesses in the prosecution's case, and research applicable precedents.",
      "We believe everyone deserves a vigorous defense and work tirelessly to protect your rights throughout the criminal justice process. From arraignment through trial or appeal, we stand by your side."
    ],
    services: [
      "Felony and misdemeanor defense",
      "DUI and DWI representation",
      "Drug offense defense",
      "White collar crime defense",
      "Appeals and post-conviction relief"
    ]
  },
  "immigration": {
    title: "Immigration",
    icon: Globe,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/5",
    metaDescription: "Expert immigration law services with AI-powered case tracking and document preparation. Family visas, employment visas, green cards, citizenship, and deportation defense. Free consultation.",
    overview: [
      "Navigating the U.S. immigration system can be overwhelming, with complex regulations that change frequently. A.I. Esquire Legal provides expert guidance through every step of the immigration process, using AI-powered tools to track deadlines, prepare documents, and monitor case status.",
      "Our licensed attorneys have deep experience in all aspects of immigration law, from family-based petitions to employment visas to deportation defense. We use advanced technology to ensure no deadline is missed and every form is completed accurately.",
      "Whether you are seeking to bring family members to the United States, obtain work authorization, pursue citizenship, or defend against removal, our team provides knowledgeable and compassionate representation."
    ],
    services: [
      "Family-based immigration petitions",
      "Employment visas and work authorization",
      "Green card and permanent residency applications",
      "Citizenship and naturalization",
      "Deportation and removal defense"
    ]
  }
}

const slugs = Object.keys(practiceAreasData)

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const area = practiceAreasData[slug]
  if (!area) {
    return { title: "Practice Area | A.I. Esquire Legal" }
  }
  return {
    title: `${area.title} Attorney | A.I. Esquire Legal`,
    description: area.metaDescription,
  }
}

function toTitleCase(str: string): string {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

export default async function PracticeAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const area = practiceAreasData[slug]
  
  // Fallback for unknown slugs - render generic page instead of 404
  const title = area?.title || toTitleCase(slug)
  const Icon = area?.icon || Scale
  const gradient = area?.gradient || "from-blue-500 to-indigo-500"
  const bgGradient = area?.bgGradient || "from-blue-500/10 to-indigo-500/5"
  const overview = area?.overview || [
    `A.I. Esquire Legal provides comprehensive ${title.toLowerCase()} services combining the expertise of licensed attorneys with AI-powered workflows.`,
    `Our team is led by a Connecticut-licensed attorney and backed by a nationwide network of qualified counsel across all 50 states.`,
    `Contact us today for a free consultation to discuss your ${title.toLowerCase()} matter.`
  ]
  const services = area?.services || [
    "Initial case evaluation",
    "Document preparation and review",
    "Legal strategy development",
    "Representation and advocacy",
    "Ongoing case management"
  ]

  return (
    <main className="min-h-screen bg-[#0A0A0F] overflow-hidden">
      <div className="grain-overlay" />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#2563EB]/10 rounded-full blur-3xl animate-pulse-glow" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollRevealSection>
            <div className="max-w-4xl mx-auto">
              <Link 
                href="/practice-areas" 
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                All Practice Areas
              </Link>
              
              <div className="flex items-center gap-6 mb-8">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  {title}
                </h1>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollRevealSection>
              <div className="prose prose-lg prose-invert max-w-none">
                {overview.map((paragraph, index) => (
                  <p key={index} className="text-gray-300 leading-relaxed mb-6 text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </ScrollRevealSection>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollRevealSection>
              <div className={`glass-premium rounded-3xl p-8 md:p-10 relative overflow-hidden bg-gradient-to-br ${bgGradient}`}>
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-20 rounded-full blur-2xl`} />
                
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                  How We Can Help
                </h2>
                
                <ul className="space-y-4">
                  {services.map((service, index) => (
                    <li key={index} className="flex items-start gap-4 group">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 mt-0.5`}>
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-200 text-lg group-hover:text-white transition-colors">
                        {service}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollRevealSection>
          </div>
        </div>
      </section>

      {/* Trust Signal Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollRevealSection>
              <div className="glass-premium rounded-3xl p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Why Choose A.I. Esquire Legal
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 flex items-center justify-center">
                      <Scale className="w-6 h-6 text-[#2563EB]" />
                    </div>
                    <h3 className="font-semibold text-white">Licensed Attorneys</h3>
                    <p className="text-gray-400 text-sm">
                      Led by a Connecticut-licensed attorney with real bar admission and accountability.
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 flex items-center justify-center">
                      <Network className="w-6 h-6 text-[#2563EB]" />
                    </div>
                    <h3 className="font-semibold text-white">Nationwide Network</h3>
                    <p className="text-gray-400 text-sm">
                      Vetted attorneys across all 50 states to match you with qualified local counsel.
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-[#2563EB]" />
                    </div>
                    <h3 className="font-semibold text-white">AI-First Workflow</h3>
                    <p className="text-gray-400 text-sm">
                      Modern AI for faster drafting, review, and analysis means clearer answers at lower cost.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollRevealSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollRevealSection>
              <div className="glass-premium rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#3B82F6]/10 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2563EB]"></span>
                    </span>
                    <span className="text-sm text-gray-300">Free Consultation</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Discuss Your {title} Matter?
                  </h2>
                  <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                    Schedule a free consultation to discuss your case with a licensed attorney. 
                    We will review your situation and explain your options with no obligation.
                  </p>
                  
                  <Button asChild size="lg" className="bg-[#2563EB] hover:bg-[#3B82F6] shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] transition-all px-10">
                    <Link href="/contact">
                      Get Your Free Consultation
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
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
