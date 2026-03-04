import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LayoutGrid, ChevronDown, Search, Moon, Sun, Menu, X, Home as HomeIcon, SunMoon } from 'lucide-react'
import { CategoryStructure } from '../types'

interface HeaderProps {
  categoryStructure: CategoryStructure;
  setIsSearchOpen: (open: boolean) => void;
  theme: string;
  toggleTheme: () => void;
}

export default function Header({ categoryStructure, setIsSearchOpen, theme, toggleTheme }: HeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [openGroups, setOpenGroups] = useState<string[]>(['Engineering'])
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const currentCategory = searchParams.get('category') || 'All'

  const toggleGroup = (group: string) => {
    setOpenGroups(prev => 
      prev.includes(group) ? prev.filter(g => g !== group) : [...prev, group]
    )
  }

  const handleCategoryClick = (cat: string) => {
    navigate(cat === 'All' ? '/' : `/?category=${cat}`)
    setIsSidebarOpen(false)
  }

  const isHome = location.pathname === '/'

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 h-20">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5" onClick={() => handleCategoryClick('All')}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
              <LayoutGrid size={20} />
            </div>
            <span className="text-xl font-black tracking-tighter">Bento<span className="text-indigo-600">Log.</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link 
              to="/" 
              onClick={() => handleCategoryClick('All')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${isHome && currentCategory === 'All' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'}`}
            >
              Journal
            </Link>
            
            <div className="relative group">
              <button className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5 transition-all ${isHome && currentCategory !== 'All' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900'}`}>
                Categories <ChevronDown size={14} className="opacity-50" />
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-3 z-50">
                <button onClick={() => handleCategoryClick('All')} className="w-full text-left px-4 py-3 rounded-2xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 mb-1">All Articles</button>
                {Object.entries(categoryStructure).map(([parent, children]) => (
                  <div key={parent} className="mb-2">
                    <div className="flex items-center justify-between px-4 py-2">
                      <button onClick={() => handleCategoryClick(parent)} className={`text-xs font-black uppercase tracking-widest ${currentCategory === parent ? 'text-indigo-600' : 'text-slate-400'}`}>{parent}</button>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {children.map(child => (
                        <button key={child} onClick={() => handleCategoryClick(child)} className={`text-left px-4 py-2 rounded-xl text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 ${currentCategory === child ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-500'}`}>{child}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link to="/about" className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${location.pathname === '/about' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900'}`}>About</Link>
            <Link to="/contact" className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${location.pathname === '/contact' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900'}`}>Contact</Link>
            
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-3"></div>

            <button onClick={() => setIsSearchOpen(true)} className="p-2.5 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition-all">
              <Search size={18} />
            </button>
            <button onClick={toggleTheme} className="p-2.5 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition-all">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setIsSearchOpen(true)} className="p-2 text-slate-500"><Search size={20} /></button>
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-500"><Menu size={24} /></button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isSidebarOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-500 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsSidebarOpen(false)}></div>
        <aside className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-500 ease-out p-8 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between mb-12">
            <span className="text-xl font-black">Menu</span>
            <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl"><X size={20} /></button>
          </div>
          <div className="space-y-2">
            <Link to="/" onClick={() => handleCategoryClick('All')} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 font-bold">Home <HomeIcon size={18} /></Link>
            <div className="h-px bg-slate-100 dark:bg-slate-800 my-4"></div>
            {Object.entries(categoryStructure).map(([parent, children]) => (
              <div key={parent} className="py-2">
                <button onClick={() => toggleGroup(parent)} className="w-full flex items-center justify-between font-black uppercase tracking-widest text-xs text-slate-400 mb-2">{parent} <ChevronDown size={14} className={`transform transition-transform ${openGroups.includes(parent) ? 'rotate-180' : ''}`} /></button>
                {openGroups.includes(parent) && (
                  <div className="space-y-1 pl-4">
                    {children.map(child => (
                      <button key={child} onClick={() => handleCategoryClick(child)} className="w-full text-left p-3 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800">{child}</button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="h-px bg-slate-100 dark:bg-slate-800 my-4"></div>
            <button onClick={() => { toggleTheme(); setIsSidebarOpen(false); }} className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 font-bold">Theme <SunMoon size={18} /></button>
          </div>
        </aside>
      </div>
    </>
  )
}
