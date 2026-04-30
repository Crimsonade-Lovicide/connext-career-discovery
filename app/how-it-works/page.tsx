import { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollRevealSection } from "@/components/scroll-reveal-section"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { 
  MessageSquare, 
  Search, 
  Scale,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Clock,
  Sparkles,
  Brain,
  FileCheck,
  Users
} from "lucide-react"

export const metadata: Metadata = {
  title: "How It Works | A.I. Esquire Legal",
  description: "Learn how A.I. Esquire Legal combines AI technology with expert attorneys to deliver better legal outcomes.",
}

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Share Your Case",
    description: "Start with a free consultation. Our AI-powered intake system analyzes your situation and gathers key information to match you with the right legal expert.",
    features: [
      { icon: Clock, text: "24/7 availability for initial consultation" },
      { icon: Shield, text: "Secure, confidential information handling" },
      { icon: Brain, text: "AI-assisted preliminary case assessment" },
      { icon: Zap, text: "No obligation to proceed" },
    ],
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    number: "02",
    icon: Search,
    title: "AI-Powered Analysis",
    description: "Our proprietary AI analyzes thousands of similar cases, relevant laws, and precedents to develop a comprehensive strategy tailored to your specific situation.",
    features: [
      { icon: FileCheck, text: "Analysis of 100,000+ case precedents" },
      { icon: Brain, text: "Real-time legal research capabilities" },
      { icon: Sparkles, text: "Predictive outcome modeling" },
      { icon: Zap, text: "Strategy optimization recommendations" },
    ],
    gradient: "from-violet-500 to-purple-500",
  },
  {
    number: "03",
    icon: Scale,
    title: "Expert Representation",
    description: "Your assigned attorney, armed with AI insights, provides aggressive representation throughout your case. Regular updates and transparent communication every step of the way.",
    features: [
      { icon: Users, text: "Dedicated attorney assigned to your case" },
      { icon: Brain, text: "AI-enhanced document preparation" },
      { icon: MessageSquare, text: "Regular case status updates" },
      { icon: Shield, text: "Direct line to your legal team" },
    ],
    gradient: "from-emerald-500 to-teal-500",
  },
]

const faqs = [
  {
    question: "How does the AI technology actually help my case?",
    answer: "Our AI system analyzes millions of legal documents, case outcomes, and precedents to identify patterns and strategies that have proven successful in cases similar to yours. This allows our attorneys to make more informed decisions, prepare stronger arguments, and anticipate opposing counsel&apos;s tactics. The AI handles research and analysis while our human attorneys provide the strategic thinking, courtroom presence, and personal touch that only humans can deliver.",
  },
  {
    question: "Is my information kept confidential?",
    answer: "Absolutely. Attorney-client privilege applies to all communications with our firm. Our AI systems are hosted on secure, encrypted servers that meet or exceed legal industry standards for data protection. We never share your information with third parties, and all data is handled in compliance with state and federal privacy regulations.",
  },
  {
    question: "How much do your services cost?",
    answer: "We offer flexible fee structures depending on your case type. Many cases are handled on a contingency basis, meaning you pay nothing unless we win. For other matters, we offer flat-fee arrangements and hourly billing with transparent pricing. Your initial consultation is always free, and we&apos;ll provide a clear fee estimate before you commit to anything.",
  },
  {
    question: "What practice areas do you cover?",
    answer: "We provide comprehensive legal services in six key areas: Family Law (divorce, custody, adoption), Criminal Defense (felonies, misdemeanors, DUI), Real Estate (transactions, disputes, zoning), Estate Planning (wills, trusts, probate), Immigration (visas, green cards, citizenship), and Personal Injury (accidents, malpractice, liability).",
  },
  {
    question: "How quickly can I speak with an attorney?",
    answer: "Our AI intake system is available 24/7 for initial consultations. For urgent matters, we can typically connect you with an attorney within 2 hours during business hours. For non-urgent matters, expect a callback within one business day. Emergency situations receive immediate priority attention.",
  },
  {
    question: "Do you handle cases nationwide?",
    answer: "Yes, A.I. Esquire Legal is licensed to practice in all 50 states. Our virtual-first approach allows us to effectively represent clients anywhere in the country while maintaining the personal attention of a local firm. For matters requiring court appearances, we have local counsel partnerships in every jurisdiction.",
  },
  {
    question: "What makes A.I. Esquire different from other law firms?",
    answer: "We combine the expertise of experienced attorneys with cutting-edge AI technology to deliver better outcomes faster. Our AI provides instant access to relevant case law and precedents, predictive analytics for case outcomes, automated document preparation, and 24/7 case monitoring. This means more thorough preparation, faster responses, and ultimately better results for our clients.",
  },
  {
    question: "Can I track the progress of my case?",
    answer: "Yes! Every client receives access to our secure client portal where you can view case updates in real-time, access documents, communicate directly with your legal team, and review AI-generated insights about your case progress. You&apos;ll never be left wondering what&apos;s happening with your case.",
  },
]

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] overflow-hidden">
      <div className="grain-overlay" />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#2563EB]/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#3B82F6]/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollRevealSection>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 glass-premium px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-[#2563EB]" />
                <span className="text-sm text-gray-300">How It Works</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                The Future of Legal <span className="gradient-text-animated text-glow">Is Here</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl">
                Experience a seamless legal process powered by AI technology and 
                guided by expert attorneys. From consultation to resolution, we&apos;re with you every step.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-32">
            {steps.map((step, index) => (
              <ScrollRevealSection key={step.number} delay={index * 100}>
                <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? '' : ''}`}>
                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-6 mb-8">
                      <span className="text-8xl font-bold text-[#2563EB]/10">{step.number}</span>
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.3)]`}>
                        <step.icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                      {step.title}
                    </h2>
                    
                    <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {step.features.map((feature) => (
                        <div key={feature.text} className="flex items-center gap-3 group">
                          <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 flex items-center justify-center shrink-0 group-hover:bg-[#2563EB]/20 transition-colors">
                            <feature.icon className="w-5 h-5 text-[#2563EB]" />
                          </div>
                          <span className="text-gray-300 text-sm">{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual */}
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className={`glass-premium rounded-3xl p-8 relative overflow-hidden bg-gradient-to-br ${step.gradient.replace('from-', 'from-').replace('to-', 'to-')}/5`}>
                      <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${step.gradient} opacity-20 rounded-full blur-3xl`} />
                      
                      <div className="relative z-10 space-y-6">
                        {index === 0 && (
                          <>
                            <div className="flex items-center gap-4 p-5 glass rounded-2xl hover:bg-white/5 transition-colors">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                                <Zap className="w-6 h-6 text-cyan-400" />
                              </div>
                              <div>
                                <p className="text-white font-medium">Instant Response</p>
                                <p className="text-gray-400 text-sm">AI available 24/7</p>
                              </div>
                              <div className="ml-auto w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                            </div>
                            <div className="flex items-center gap-4 p-5 glass rounded-2xl hover:bg-white/5 transition-colors">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                                <Shield className="w-6 h-6 text-cyan-400" />
                              </div>
                              <div>
                                <p className="text-white font-medium">100% Confidential</p>
                                <p className="text-gray-400 text-sm">Bank-level encryption</p>
                              </div>
                              <CheckCircle className="ml-auto w-5 h-5 text-cyan-400" />
                            </div>
                            <div className="flex items-center gap-4 p-5 glass rounded-2xl hover:bg-white/5 transition-colors">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                                <Clock className="w-6 h-6 text-cyan-400" />
                              </div>
                              <div>
                                <p className="text-white font-medium">Quick Assessment</p>
                                <p className="text-gray-400 text-sm">Results in minutes</p>
                              </div>
                              <CheckCircle className="ml-auto w-5 h-5 text-cyan-400" />
                            </div>
                          </>
                        )}
                        {index === 1 && (
                          <div className="space-y-6">
                            <div className="relative">
                              <div className="flex justify-between items-center mb-3">
                                <span className="text-gray-400 text-sm">Analyzing case precedents...</span>
                                <span className="text-violet-400 font-mono text-sm">100%</span>
                              </div>
                              <div className="h-2 bg-[#1a1a24] rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full w-full animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="glass rounded-2xl p-5 text-center">
                                <div className="text-3xl font-bold text-violet-400">127K</div>
                                <div className="text-gray-400 text-sm mt-1">Cases Analyzed</div>
                              </div>
                              <div className="glass rounded-2xl p-5 text-center">
                                <div className="text-3xl font-bold text-purple-400">94%</div>
                                <div className="text-gray-400 text-sm mt-1">Match Found</div>
                              </div>
                            </div>
                            <div className="glass rounded-2xl p-5">
                              <div className="flex items-center gap-2 mb-3">
                                <Brain className="w-4 h-4 text-violet-400" />
                                <span className="text-sm text-gray-400">AI Recommendation</span>
                              </div>
                              <p className="text-white">Settlement negotiation with fallback litigation plan</p>
                              <div className="flex items-center gap-2 mt-3">
                                <div className="px-3 py-1 bg-violet-500/20 rounded-full text-violet-400 text-xs">High confidence</div>
                                <div className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-400 text-xs">5 precedents</div>
                              </div>
                            </div>
                          </div>
                        )}
                        {index === 2 && (
                          <div className="space-y-5">
                            <div className="flex items-center gap-4 p-5 glass rounded-2xl">
                              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">SC</span>
                              </div>
                              <div>
                                <p className="text-white font-medium">Sarah Chen</p>
                                <p className="text-gray-400 text-sm">Your Assigned Attorney</p>
                              </div>
                              <span className="ml-auto px-3 py-1.5 bg-green-500/20 text-green-400 text-sm rounded-full flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                Active
                              </span>
                            </div>
                            <div className="glass rounded-2xl p-5">
                              <div className="flex items-center gap-2 mb-3">
                                <MessageSquare className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm text-gray-400">Latest Update</span>
                              </div>
                              <p className="text-white text-sm">Filed motion for expedited hearing. Court date confirmed for next Thursday.</p>
                              <p className="text-emerald-400 text-xs mt-3">2 hours ago</p>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                              <div className="glass rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-white">12</div>
                                <div className="text-gray-500 text-xs mt-1">Documents</div>
                              </div>
                              <div className="glass rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-white">3</div>
                                <div className="text-gray-500 text-xs mt-1">Hearings</div>
                              </div>
                              <div className="glass rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-white">7</div>
                                <div className="text-gray-500 text-xs mt-1">Updates</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex justify-center py-16">
                    <div className="relative h-32">
                      <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-[#2563EB] via-[#3B82F6] to-transparent" />
                      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-3 h-3 bg-[#2563EB] rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
                    </div>
                  </div>
                )}
              </ScrollRevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-[#08080C] to-[#0A0A0F] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.05)_0%,transparent_50%)]" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollRevealSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Frequently Asked <span className="gradient-text">Questions</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Got questions? We&apos;ve got answers. If you don&apos;t see what you&apos;re looking for, 
                feel free to contact us directly.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={100}>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`faq-${index}`}
                    className="glass-premium rounded-2xl px-6 border-0 data-[state=open]:shadow-[0_0_30px_rgba(37,99,235,0.15)]"
                  >
                    <AccordionTrigger className="text-white hover:text-[#2563EB] hover:no-underline text-left py-6 gap-4">
                      <span className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center shrink-0 text-[#2563EB] text-sm font-mono">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-400 leading-relaxed pb-6 pl-12">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/10 via-transparent to-[#2563EB]/10" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollRevealSection>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2563EB]"></span>
                </span>
                <span className="text-sm text-gray-300">Start Today</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Experience the <span className="gradient-text-animated">Difference?</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10">
                Start with a free, no-obligation consultation. Our AI will analyze your situation 
                and connect you with the right legal expert.
              </p>
              <Button asChild size="lg" className="bg-[#2563EB] hover:bg-[#3B82F6] shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] transition-all px-10">
                <Link href="/contact">
                  Get Your Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      <Footer />
    </main>
  )
}
