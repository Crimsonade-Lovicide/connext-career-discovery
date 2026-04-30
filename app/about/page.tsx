import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollRevealSection } from "@/components/scroll-reveal-section"
import { Award, BookOpen, Users, Target, Briefcase, GraduationCap, Quote, Linkedin, Twitter } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | A.I. Esquire Legal",
  description: "Learn about A.I. Esquire Legal and our founder Eric Hoffman. Combining legal expertise with AI innovation.",
}

const values = [
  {
    icon: Target,
    title: "Client-Centered Approach",
    description: "Every decision we make is guided by what&apos;s best for our clients and their cases.",
    gradient: "from-rose-500/20 to-pink-500/20",
  },
  {
    icon: BookOpen,
    title: "Innovation First",
    description: "We leverage cutting-edge AI technology to deliver better outcomes faster.",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Users,
    title: "Accessibility",
    description: "Quality legal representation should be accessible to everyone, not just the privileged few.",
    gradient: "from-emerald-500/20 to-green-500/20",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We hold ourselves to the highest standards of legal practice and ethical conduct.",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
]

const milestones = [
  { year: "2018", title: "Founded", desc: "A.I. Esquire Legal was established in San Francisco" },
  { year: "2019", title: "AI Integration", desc: "Launched proprietary AI case analysis platform" },
  { year: "2021", title: "500+ Cases", desc: "Reached milestone of 500 successfully resolved cases" },
  { year: "2023", title: "National Expansion", desc: "Expanded services to all 50 states" },
  { year: "2024", title: "Award Winning", desc: "Named 'Most Innovative Law Firm' by Legal Tech Review" },
]

const team = [
  { name: "Eric Hoffman", role: "Founder & Managing Partner", initials: "EH", bio: "Stanford Law, 15+ years experience" },
  { name: "Sarah Chen", role: "Senior Partner, Family Law", initials: "SC", bio: "Harvard Law, Family Law specialist" },
  { name: "Michael Torres", role: "Partner, Criminal Defense", initials: "MT", bio: "Yale Law, Former prosecutor" },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] overflow-hidden">
      <div className="grain-overlay" />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#2563EB]/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#3B82F6]/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollRevealSection>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 glass-premium px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#2563EB] rounded-full animate-pulse" />
                <span className="text-sm text-gray-300">About Us</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Pioneering the Future of <span className="gradient-text-animated text-glow">Legal Services</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                A.I. Esquire Legal was founded on a simple belief: that advanced technology 
                and human expertise, when combined, can deliver justice more effectively 
                than either could alone.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollRevealSection>
              <div className="relative">
                {/* Main Image Container */}
                <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-[#2563EB]/20 to-[#3B82F6]/10 glass-premium relative group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-[#2563EB] to-[#3B82F6] flex items-center justify-center mb-6 shadow-[0_0_60px_rgba(37,99,235,0.4)] group-hover:scale-105 transition-transform duration-500">
                        <span className="text-7xl font-bold text-white">EH</span>
                      </div>
                      <p className="text-gray-400">Eric Hoffman</p>
                      <p className="text-[#2563EB] text-sm">Founder & Managing Partner</p>
                    </div>
                  </div>
                  
                  {/* Floating Stats */}
                  <div className="absolute top-6 left-6 glass px-4 py-3 rounded-xl">
                    <div className="text-2xl font-bold text-white">15+</div>
                    <div className="text-xs text-gray-400">Years Experience</div>
                  </div>
                  <div className="absolute bottom-6 right-6 glass px-4 py-3 rounded-xl">
                    <div className="text-2xl font-bold text-white">500+</div>
                    <div className="text-xs text-gray-400">Cases Won</div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -bottom-6 -right-6 w-40 h-40 border-2 border-[#2563EB]/20 rounded-3xl -z-10" />
                <div className="absolute -top-6 -left-6 w-28 h-28 bg-gradient-to-br from-[#2563EB]/10 to-transparent rounded-2xl -z-10" />
              </div>
            </ScrollRevealSection>

            <ScrollRevealSection delay={200}>
              <div>
                <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                  <Quote className="w-4 h-4 text-[#2563EB]" />
                  <span className="text-sm text-gray-300">Meet Our Founder</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold mb-2">Eric Hoffman</h2>
                <p className="text-[#2563EB] mb-8 text-lg">Founder & Managing Partner</p>
                
                <div className="space-y-5 text-gray-400 leading-relaxed">
                  <p>
                    Eric Hoffman founded A.I. Esquire Legal with a vision to democratize 
                    access to quality legal representation. With over 15 years of experience 
                    in litigation and a passion for technology, he saw an opportunity to 
                    transform how legal services are delivered.
                  </p>
                  <p>
                    After graduating <span className="text-white">magna cum laude from Stanford Law School</span>, Eric spent 
                    a decade at top-tier law firms before recognizing that the traditional 
                    legal model left too many people without proper representation.
                  </p>
                  <p>
                    Today, Eric leads a team of expert attorneys and AI specialists who 
                    share his commitment to making justice accessible.
                  </p>
                </div>

                <div className="flex flex-wrap gap-6 mt-10">
                  <div className="flex items-center gap-4 glass-premium rounded-xl p-4">
                    <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-[#2563EB]" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Stanford Law</p>
                      <p className="text-gray-500 text-sm">J.D., Magna Cum Laude</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 glass-premium rounded-xl p-4">
                    <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-[#2563EB]" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">15+ Years</p>
                      <p className="text-gray-500 text-sm">Legal Experience</p>
                    </div>
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="flex gap-3 mt-8">
                  <a href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-[#2563EB] hover:bg-[#2563EB]/10 transition-all">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-[#2563EB] hover:bg-[#2563EB]/10 transition-all">
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </ScrollRevealSection>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24 bg-gradient-to-b from-[#08080C] to-[#0A0A0F] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.05)_0%,transparent_50%)]" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollRevealSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <Award className="w-4 h-4 text-[#2563EB]" />
                <span className="text-sm text-gray-300">Our Principles</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Core <span className="gradient-text">Values</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                These principles guide everything we do at A.I. Esquire Legal.
              </p>
            </div>
          </ScrollRevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <ScrollRevealSection key={value.title} delay={index * 100}>
                <div className="glass-premium rounded-2xl p-8 glow-card h-full relative overflow-hidden group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-[#2563EB]/10 flex items-center justify-center mb-6 group-hover:bg-[#2563EB] group-hover:scale-110 transition-all duration-300">
                      <value.icon className="w-7 h-7 text-[#2563EB] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-400">{value.description}</p>
                  </div>
                </div>
              </ScrollRevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollRevealSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Our <span className="gradient-text">Journey</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                From a bold idea to a leading AI-powered law firm.
              </p>
            </div>
          </ScrollRevealSection>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#2563EB] via-[#3B82F6] to-[#2563EB]/20 transform md:-translate-x-1/2" />
              
              {milestones.map((milestone, index) => (
                <ScrollRevealSection key={milestone.year} delay={index * 100}>
                  <div className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Content */}
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                      <div className="glass-premium rounded-xl p-6 glow-card">
                        <span className="text-[#2563EB] text-3xl font-bold">{milestone.year}</span>
                        <h3 className="text-xl font-semibold text-white mt-2">{milestone.title}</h3>
                        <p className="text-gray-400 mt-2">{milestone.desc}</p>
                      </div>
                    </div>
                    
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 w-5 h-5 bg-[#2563EB] rounded-full transform -translate-x-1/2 border-4 border-[#0A0A0F] shadow-[0_0_20px_rgba(37,99,235,0.5)]" />
                  </div>
                </ScrollRevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-b from-[#08080C] to-[#0A0A0F]">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollRevealSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Our <span className="gradient-text">Expert Team</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A diverse team of attorneys and technologists working together to deliver results.
              </p>
            </div>
          </ScrollRevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <ScrollRevealSection key={member.name} delay={index * 100}>
                <div className="glass-premium rounded-2xl p-8 text-center glow-card group">
                  <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-[#2563EB] to-[#3B82F6] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(37,99,235,0.3)] group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(37,99,235,0.5)] transition-all duration-300">
                    <span className="text-3xl font-bold text-white">{member.initials}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                  <p className="text-[#2563EB] text-sm mt-1">{member.role}</p>
                  <p className="text-gray-500 text-sm mt-3">{member.bio}</p>
                  
                  <div className="flex justify-center gap-3 mt-6">
                    <a href="#" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-[#2563EB] transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-[#2563EB] transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </ScrollRevealSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
