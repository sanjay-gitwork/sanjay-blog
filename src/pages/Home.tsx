import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Post, CategoryStructure } from '../types'
import { Tag, ArrowUpDown, ChevronDown, LayoutGrid, List, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

interface HomeProps {
  posts: Post[];
  categoryStructure: CategoryStructure;
}

export default function Home({ posts, categoryStructure }: HomeProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentCategory = searchParams.get('category') || 'All'
  const currentTag = searchParams.get('tag')
  
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 9

  const uniqueTags = useMemo(() => [...new Set(posts.flatMap(p => p.tags))].sort(), [posts])

  const filteredPosts = useMemo(() => {
    let results = posts
    if (currentTag) {
      results = posts.filter(p => p.tags && p.tags.includes(currentTag))
    } else if (currentCategory !== 'All') {
      const children = categoryStructure[currentCategory] || []
      results = posts.filter(p => p.category === currentCategory || children.includes(p.category))
    }

    const sorted = [...results]
    switch (sortBy) {
      case 'newest': return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      case 'oldest': return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      case 'az': return sorted.sort((a, b) => a.title.localeCompare(b.title))
      case 'za': return sorted.sort((a, b) => b.title.localeCompare(a.title))
      default: return sorted
    }
  }, [posts, currentCategory, currentTag, sortBy, categoryStructure])

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  const calculateReadTime = (content?: string) => {
    if (!content) return 2;
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  }

  const handleSetCategory = (cat: string) => {
    setSearchParams(cat === 'All' ? {} : { category: cat })
    setCurrentPage(1)
  }

  const handleSetTag = (tag: string | null) => {
    setSearchParams(tag ? { tag } : {})
    setCurrentPage(1)
  }

  return (
    <div className="max-w-7xl mx-auto px-6">
      <Helmet>
        <title>{currentTag ? `#${currentTag}` : currentCategory !== 'All' ? currentCategory : 'Engineering Journal'} | BentoLog</title>
      </Helmet>

      <section className="py-20 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1] bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-500 bg-clip-text text-transparent">
            {currentTag ? (
              <>Tagged: <span className="text-indigo-600">#{currentTag}</span></>
            ) : currentCategory !== 'All' ? (
              <>Browsing <span className="text-indigo-600">{currentCategory}</span></>
            ) : (
              "Engineering the Next Generation."
            )}
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed">
            {currentTag || currentCategory !== 'All' ? (
              <>Showing articles for your selection. <button onClick={() => handleSetCategory('All')} className="text-indigo-600 font-bold hover:underline">Clear all filters</button></>
            ) : (
              "A curated collection of thoughts on software architecture, design systems, and the future of technology."
            )}
          </p>
      </section>
      
      <div className="flex flex-wrap items-center justify-between gap-4 mb-12 py-6 border-y border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap gap-4">
            <div className="dropdown relative group">
                <button type="button" className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold hover:border-slate-400 transition-all">
                    <Tag size={16} className="text-indigo-600" /> 
                    {currentTag ? `#${currentTag}` : 'Filter by Tag'}
                    <ChevronDown size={14} className="opacity-50" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2 overflow-y-auto max-h-80">
                    <button onClick={() => handleSetTag(null)} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 ${!currentTag ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : ''}`}>
                        All Tags
                    </button>
                    {uniqueTags.map(tag => (
                        <button key={tag} onClick={() => handleSetTag(tag)} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 ${currentTag === tag ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : ''}`}>
                            #{tag}
                        </button>
                    ))}
                </div>
            </div>

            <div className="dropdown relative group">
                <button type="button" className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold hover:border-slate-400 transition-all">
                    <ArrowUpDown size={16} className="text-indigo-600" /> 
                    {sortBy === 'newest' ? 'Newest First' : sortBy === 'oldest' ? 'Oldest First' : sortBy === 'az' ? 'Alphabetical (A-Z)' : 'Alphabetical (Z-A)'}
                    <ChevronDown size={14} className="opacity-50" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2">
                    <button onClick={() => setSortBy('newest')} className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800">Newest First</button>
                    <button onClick={() => setSortBy('oldest')} className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800">Oldest First</button>
                    <button onClick={() => setSortBy('az')} className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800">Alphabetical (A-Z)</button>
                    <button onClick={() => setSortBy('za')} className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800">Alphabetical (Z-A)</button>
                </div>
            </div>
          </div>
          
          <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}><LayoutGrid size={18} /></button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}><List size={18} /></button>
          </div>
      </div>

      {filteredPosts.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8 mb-20">
            {currentPosts.map((post, index) => {
              const spanClass = index === 0 ? 'md:col-span-6 lg:col-span-12' : (index === 1 || index === 2 ? 'md:col-span-3 lg:col-span-6' : 'md:col-span-2 lg:col-span-4');
              return (
                <Link key={post.id} to={`/post/${post.slug}`} className={`group flex flex-col justify-between p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 ${spanClass}`}>
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest">{post.category}</span>
                            <span className="text-xs text-slate-400">{post.date} • {calculateReadTime(post.content)} min read</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black mb-4 group-hover:text-indigo-600 transition-colors leading-tight">{post.title}</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 line-clamp-3 leading-relaxed">{post.desc}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {post.tags.slice(0, 2).map(t => <span key={t} className="text-xs text-slate-400 font-bold">#{t}</span>)}
                      </div>
                      <div className="flex items-center gap-2 font-black text-sm group-hover:translate-x-1 transition-transform">Read <ArrowRight size={16} /></div>
                    </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-4 mb-20">
            {currentPosts.map(post => (
              <Link key={post.id} to={`/post/${post.slug}`} className="group flex flex-col md:flex-row md:items-center justify-between p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl hover:border-indigo-500 transition-all">
                  <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">{post.category}</span>
                          <span className="text-xs text-slate-400">{post.date}</span>
                      </div>
                      <h3 className="text-xl font-bold group-hover:text-indigo-600 transition-colors">{post.title}</h3>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-8 flex items-center gap-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    <span className="text-xs">{calculateReadTime(post.content)} min read</span>
                    <ArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform" />
                  </div>
              </Link>
            ))}
          </div>
        )
      ) : <div className="py-20 text-center text-slate-400">No posts found for this selection.</div>}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mb-20">
            <button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1} className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl disabled:opacity-30"><ChevronLeft size={20} /></button>
            <span className="font-bold text-sm">Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage === totalPages} className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl disabled:opacity-30"><ChevronRight size={20} /></button>
        </div>
      )}
    </div>
  )
}
