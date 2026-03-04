import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import SearchModal from './components/SearchModal'
import { posts as initialPosts, categoryStructure } from './data/posts'
import SampleMDX from './pages/posts/SampleMDX.mdx'

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
    // Tailwind dark mode class
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header 
        categoryStructure={categoryStructure}
        setIsSearchOpen={setIsSearchOpen}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main>
        <Routes>
          <Route path="/" element={
            <Home 
              posts={initialPosts} 
              categoryStructure={categoryStructure}
            />
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/post/:slug" element={<PostDetail posts={initialPosts} />} />
          <Route path="/mdx-example" element={
            <div className="max-w-4xl mx-auto px-6 py-20">
              <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
                <SampleMDX />
              </div>
            </div>
          } />
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <h1 className="text-6xl font-black mb-4">404</h1>
              <p className="text-xl text-slate-500 mb-8">Page not found.</p>
              <button onClick={() => window.location.href = '/'} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold">Go Home</button>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
      {isSearchOpen && (
        <SearchModal 
          posts={initialPosts} 
          onClose={() => setIsSearchOpen(false)} 
        />
      )}
    </div>
  )
}

export default App
