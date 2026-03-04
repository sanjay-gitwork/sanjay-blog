import { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { Post } from '../types'
import { ArrowLeft, Clock, Calendar, Tag, Share2, Twitter, Linkedin, ChevronRight, AlertCircle, ArrowRight } from 'lucide-react'

interface PostDetailProps {
  posts: Post[];
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function PostDetail({ posts }: PostDetailProps) {
  const { slug } = useParams<{ slug: string }>()
  const post = posts.find(p => p.slug === slug)
  
  // Use post as the initial source of truth to prevent blank screens
  const [content, setContent] = useState(post?.content || '')
  const [displayPost, setDisplayPost] = useState<Post | null>(post || null)
  const [isLoading, setIsLoading] = useState(!!(post?.file && !post?.content))
  const [progress, setProgress] = useState(0)
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const contentRef = useRef<HTMLDivElement>(null)

  // Scroll Progress Logic
  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight > 0) {
        setProgress((window.scrollY / scrollHeight) * 100)
      }
    }
    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  // Content Fetching & Metadata Sync
  useEffect(() => {
    if (!post) return;

    if (post.file && !post.content) {
      setIsLoading(true)
      const fetchPath = post.file.startsWith('/') ? post.file : '/' + post.file
      
      fetch(fetchPath)
        .then(res => {
          if (!res.ok) throw new Error(`Failed to load: ${res.statusText}`)
          return res.text()
        })
        .then(text => {
          // Robust Frontmatter Parser
          const frontmatterRegex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*([\s\S]*)$/
          const match = text.match(frontmatterRegex)
          
          if (match) {
            const metadataBlock = match[1]
            const bodyContent = match[2]
            const metadata: any = {}
            
            metadataBlock.split('\n').forEach(line => {
              const colonIndex = line.indexOf(':')
              if (colonIndex > -1) {
                const key = line.slice(0, colonIndex).trim()
                let val = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '')
                
                if (val.startsWith('[') && val.endsWith(']')) {
                  metadata[key] = val.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''))
                } else {
                  metadata[key] = val
                }
              }
            })

            setDisplayPost(prev => ({ ...prev!, ...metadata }))
            setContent(bodyContent)
          } else {
            setContent(text)
          }
          setIsLoading(false)
        })
        .catch(err => {
          console.error("Fetch error:", err)
          setContent("# Error\nCould not load the content for this post. Please check if the file exists in the public/posts folder.")
          setIsLoading(false)
        })
    } else {
      setContent(post.content || '')
      setDisplayPost(post)
      setIsLoading(false)
    }
  }, [post, slug])

  // ToC Generation Logic
  useEffect(() => {
    if (contentRef.current && content && !isLoading) {
      const timer = setTimeout(() => {
        const headings = contentRef.current?.querySelectorAll('h2, h3')
        const tocItems: TocItem[] = []
        headings?.forEach((heading, index) => {
          const id = `section-${index}`
          heading.setAttribute('id', id)
          tocItems.push({
            id,
            text: (heading as HTMLElement).innerText,
            level: heading.tagName === 'H2' ? 2 : 3
          })
        })
        setToc(tocItems)

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) setActiveId(entry.target.id)
            })
          },
          { rootMargin: '-100px 0px -70% 0px' }
        )

        headings?.forEach((heading) => observer.observe(heading))
        return () => observer.disconnect()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [content, isLoading])

  // Error State: Slug doesn't exist in registry
  if (!post || !displayPost) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
        <AlertCircle size={64} className="text-slate-200 dark:text-slate-800 mb-6" />
        <h1 className="text-4xl font-black mb-4">Article Not Found</h1>
        <p className="text-slate-500 max-w-sm mb-8">The link might be broken or the article has been moved to a different category.</p>
        <Link to="/" className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all">Back to Journal</Link>
      </div>
    )
  }

  const calculateReadTime = (text: string) => {
    const words = text.trim().split(/\s+/).length
    return Math.max(1, Math.ceil(words / 200))
  }

  const related = posts
    .filter(p => p.category === displayPost.category && p.id !== displayPost.id)
    .slice(0, 2)

  return (
    <div className="relative min-h-screen pb-20">
      <Helmet>
        <title>{displayPost.title} | BentoLog</title>
        <meta name="description" content={displayPost.desc} />
      </Helmet>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-transparent">
        <div className="h-full bg-indigo-600 transition-all duration-100 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="flex items-center justify-between mb-12">
          <Link to="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors group">
            <ArrowLeft size={16} className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Journal
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-400">
            <Link to="/" className="hover:text-slate-600">Home</Link>
            <ChevronRight size={12} />
            <span className="text-slate-600">{displayPost.category}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16">
          <article className="min-w-0">
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {displayPost.category}
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <div className="flex items-center text-slate-500 text-xs font-bold">
                  <Clock size={14} className="mr-1.5" />
                  {calculateReadTime(content)} min read
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.1]">
                {displayPost.title}
              </h1>

              <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed mb-8 border-l-4 border-indigo-500 pl-6 italic font-medium">
                {displayPost.desc}
              </p>

              <div className="flex items-center gap-4 py-8 border-y border-slate-100 dark:border-slate-800/50">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400">
                  <Calendar size={20} />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-0.5">Published Date</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{displayPost.date}</div>
                </div>
              </div>
            </header>

            {displayPost.image && (
              <div className="mb-12 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800">
                <img src={displayPost.image} alt={displayPost.title} className="w-full h-auto object-cover max-h-[500px]" />
              </div>
            )}

            <div 
              ref={contentRef}
              className={`prose prose-slate dark:prose-invert prose-lg max-w-none transition-all duration-500
                ${isLoading ? 'opacity-20 blur-sm scale-[0.99]' : 'opacity-100 blur-0 scale-100'}`}
            >
              {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-4">
                  <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm font-bold text-slate-400">Fetching Content...</p>
                </div>
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                  {content}
                </ReactMarkdown>
              )}
            </div>

            <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800">
              <div className="flex flex-wrap gap-2">
                {displayPost.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-black uppercase tracking-widest transition-colors hover:border-indigo-500">
                    <Tag size={12} className="mr-2 text-indigo-600" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12 p-10 rounded-[3rem] bg-indigo-600 text-white flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-black mb-2 tracking-tight">Enjoyed the read?</h4>
                <p className="text-indigo-100 font-medium">Share this insight with your fellow engineers.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all shadow-sm"><Twitter size={20} /></button>
                <button className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all shadow-sm"><Linkedin size={20} /></button>
                <button className="px-8 py-4 rounded-2xl bg-white text-indigo-600 font-black text-sm shadow-xl hover:bg-indigo-50 transition-all flex items-center gap-2">
                  <Share2 size={18} /> Share Article
                </button>
              </div>
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-10">
              {toc.length > 0 && (
                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center">
                    <span className="w-8 h-px bg-slate-200 dark:bg-slate-800 mr-3"></span>
                    Table of Contents
                  </h3>
                  <nav className="space-y-1 border-l border-slate-100 dark:border-slate-800">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`block py-2.5 text-sm transition-all duration-300 pl-5 border-l-2 -ml-[1.5px] ${
                          activeId === item.id
                            ? 'text-indigo-600 border-indigo-600 font-black translate-x-1'
                            : 'text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white hover:translate-x-1'
                        } ${item.level === 3 ? 'pl-8 text-xs italic font-medium' : ''}`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              <div className="p-8 rounded-[2.5rem] bg-slate-900 dark:bg-slate-900 border border-slate-800 text-white shadow-2xl">
                <h4 className="font-black text-lg mb-2">Weekly Insights</h4>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">Join 2,000+ engineers receiving the best architectural patterns every week.</p>
                <input type="email" placeholder="email@example.com" className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-sm placeholder:text-slate-500 outline-none mb-3 focus:border-indigo-500 transition-colors" />
                <button className="w-full py-3.5 rounded-xl bg-indigo-600 text-white text-xs font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">Subscribe Now</button>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer Navigation */}
        <section className="mt-32 pt-16 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Continue Reading</h2>
              <p className="text-slate-500 font-medium italic">Handpicked for you in <span className="text-indigo-600">{displayPost.category}</span></p>
            </div>
            <Link to="/" className="hidden sm:flex items-center text-sm font-black text-indigo-600 hover:underline">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {related.map(p => (
              <Link key={p.id} to={`/post/${p.slug}`} className="group p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-indigo-500 transition-all shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {p.category}
                  </span>
                  <span className="text-xs font-bold text-slate-300">{p.date}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {p.title}
                </h3>
                <div className="flex items-center text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">
                  Read Article
                  <ArrowRight size={14} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
