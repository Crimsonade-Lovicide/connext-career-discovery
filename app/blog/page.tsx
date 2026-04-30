import { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollRevealSection } from "@/components/scroll-reveal-section"
import { ArrowRight, Calendar, Clock, User, Sparkles, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog | A.I. Esquire Legal",
  description: "Legal insights, AI technology updates, and expert advice from A.I. Esquire Legal.",
}

const blogPosts = [
  {
    id: 1,
    title: "How AI is Revolutionizing Legal Research in 2024",
    excerpt: "Discover how artificial intelligence is transforming the way attorneys conduct legal research, analyze precedents, and build stronger cases for their clients.",
    category: "AI & Technology",
    author: "Eric Hoffman",
    date: "March 15, 2024",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 2,
    title: "5 Things to Know Before Filing for Divorce",
    excerpt: "Navigating a divorce can be overwhelming. Here are the essential things you need to understand before beginning the process to protect your interests.",
    category: "Family Law",
    author: "Sarah Chen",
    date: "March 10, 2024",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 3,
    title: "Understanding Your Rights During a Traffic Stop",
    excerpt: "Know your constitutional rights when interacting with law enforcement during a traffic stop. This knowledge could be crucial if you ever face criminal charges.",
    category: "Criminal Defense",
    author: "Michael Torres",
    date: "March 5, 2024",
    readTime: "5 min read",
    featured: false,
  },
  {
    id: 4,
    title: "Estate Planning Mistakes That Could Cost Your Family",
    excerpt: "Even with good intentions, common estate planning errors can lead to unintended consequences. Learn how to avoid the pitfalls that could hurt your loved ones.",
    category: "Estate Planning",
    author: "Eric Hoffman",
    date: "February 28, 2024",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 5,
    title: "Navigating the 2024 Immigration Policy Changes",
    excerpt: "Recent policy updates have significant implications for visa applications and green card processes. Stay informed about what these changes mean for you.",
    category: "Immigration",
    author: "Maria Gonzalez",
    date: "February 20, 2024",
    readTime: "9 min read",
    featured: false,
  },
  {
    id: 6,
    title: "What to Do After a Car Accident: A Legal Guide",
    excerpt: "The steps you take immediately after an accident can significantly impact your personal injury claim. Follow this comprehensive guide to protect your rights.",
    category: "Personal Injury",
    author: "James Wilson",
    date: "February 15, 2024",
    readTime: "6 min read",
    featured: false,
  },
]

const categoryStyles: Record<string, { bg: string; text: string; gradient: string }> = {
  "AI & Technology": { bg: "bg-violet-500/20", text: "text-violet-400", gradient: "from-violet-500 to-purple-500" },
  "Family Law": { bg: "bg-pink-500/20", text: "text-pink-400", gradient: "from-pink-500 to-rose-500" },
  "Criminal Defense": { bg: "bg-red-500/20", text: "text-red-400", gradient: "from-red-500 to-orange-500" },
  "Estate Planning": { bg: "bg-amber-500/20", text: "text-amber-400", gradient: "from-amber-500 to-yellow-500" },
  "Immigration": { bg: "bg-emerald-500/20", text: "text-emerald-400", gradient: "from-emerald-500 to-teal-500" },
  "Personal Injury": { bg: "bg-blue-500/20", text: "text-blue-400", gradient: "from-blue-500 to-cyan-500" },
}

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <main className="min-h-screen bg-[#0A0A0F] overflow-hidden">
      <div className="grain-overlay" />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#2563EB]/10 rounded-full blur-3xl animate-pulse-glow" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollRevealSection>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 glass-premium px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-[#2563EB]" />
                <span className="text-sm text-gray-300">Our Blog</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                Legal Insights & <span className="gradient-text-animated text-glow">AI Innovation</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl">
                Stay informed with the latest legal developments, expert advice, 
                and insights into how AI is transforming the practice of law.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-8">
          <div className="container mx-auto px-4 lg:px-8">
            <ScrollRevealSection>
              <Link href="#" className="block group">
                <div className="glass-premium rounded-3xl overflow-hidden glow-card relative">
                  <div className="grid lg:grid-cols-2">
                    {/* Image Side */}
                    <div className="aspect-video lg:aspect-auto min-h-[300px] bg-gradient-to-br from-[#2563EB]/20 via-[#3B82F6]/10 to-transparent flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.2)_0%,transparent_70%)]" />
                      
                      {/* Animated Elements */}
                      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#2563EB]/20 rounded-full blur-2xl animate-float" />
                      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-[#3B82F6]/20 rounded-full blur-xl animate-float-delayed" />
                      
                      <div className="text-center relative z-10">
                        <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.4)] group-hover:scale-110 transition-transform duration-500">
                          <span className="text-4xl font-bold text-white">AI</span>
                        </div>
                        <div className="mt-4 inline-flex items-center gap-2 glass px-4 py-2 rounded-full">
                          <TrendingUp className="w-4 h-4 text-[#2563EB]" />
                          <span className="text-sm text-gray-300">Featured Article</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Side */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-6">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-medium ${categoryStyles[featuredPost.category].bg} ${categoryStyles[featuredPost.category].text}`}>
                          {featuredPost.category}
                        </span>
                      </div>
                      <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4 group-hover:text-[#2563EB] transition-colors leading-tight">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#3B82F6] flex items-center justify-center">
                            <span className="text-white text-xs font-bold">EH</span>
                          </div>
                          <span>{featuredPost.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{featuredPost.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                      <div className="mt-8 flex items-center text-[#2563EB] font-medium group-hover:gap-4 gap-2 transition-all">
                        Read Full Article
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollRevealSection>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollRevealSection>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl md:text-3xl font-bold">Latest Articles</h2>
              <div className="flex gap-2">
                {["All", "AI & Tech", "Family", "Criminal"].map((filter) => (
                  <button
                    key={filter}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      filter === "All" 
                        ? "bg-[#2563EB] text-white" 
                        : "glass text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </ScrollRevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => {
              const style = categoryStyles[post.category]
              return (
                <ScrollRevealSection key={post.id} delay={index * 100}>
                  <Link href="#" className="block group h-full">
                    <article className="glass-premium rounded-2xl overflow-hidden glow-card h-full flex flex-col">
                      {/* Image/Visual Area */}
                      <div className={`aspect-video bg-gradient-to-br ${style.gradient}/10 flex items-center justify-center relative overflow-hidden`}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${style.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <span className="text-2xl font-bold text-white">{post.category.charAt(0)}</span>
                        </div>
                        <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
                          {post.category}
                        </span>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#2563EB] transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/5">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-[#2563EB]/20 flex items-center justify-center">
                              <User className="w-3 h-3 text-[#2563EB]" />
                            </div>
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </ScrollRevealSection>
              )
            })}
          </div>

          {/* Load More */}
          <ScrollRevealSection delay={400}>
            <div className="text-center mt-12">
              <button className="glass-premium px-8 py-4 rounded-xl text-white font-medium hover:bg-white/5 transition-colors group">
                Load More Articles
                <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-b from-[#08080C] to-[#0A0A0F] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.05)_0%,transparent_60%)]" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollRevealSection>
            <div className="glass-premium rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#2563EB]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-[#3B82F6]/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-[#2563EB]" />
                  <span className="text-sm text-gray-300">Stay Updated</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Never Miss an <span className="gradient-text">Update</span>
                </h2>
                <p className="text-gray-400 mb-10 text-lg">
                  Subscribe to our newsletter for weekly legal insights, AI updates, 
                  and expert tips delivered straight to your inbox.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-5 py-4 bg-[#1a1a24] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2563EB] focus:shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-[#2563EB] hover:bg-[#3B82F6] text-white font-medium rounded-xl transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2"
                  >
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
                <p className="text-gray-500 text-xs mt-6">
                  By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      <Footer />
    </main>
  )
}
