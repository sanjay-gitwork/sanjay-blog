import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Post } from '../types'

interface SearchModalProps {
  posts: Post[];
  onClose: () => void;
}

export default function SearchModal({ posts, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  const results = searchTerm 
    ? posts.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.desc.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  return (
    <div className="search-modal-backdrop" style={{ display: 'flex' }} onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="search-modal">
            <input 
              ref={inputRef}
              type="text" 
              className="search-input" 
              placeholder="Search posts..." 
              autoComplete="off"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="search-results">
                {results.length > 0 ? (
                  results.map(p => (
                    <Link key={p.id} to={`/post/${p.slug}`} onClick={onClose} className="search-result-item">
                      <span className="search-result-title">{p.title}</span>
                      <span className="search-result-meta">{p.date} • {p.category}</span>
                    </Link>
                  ))
                ) : searchTerm ? (
                  <div style={{ padding: '1rem', color: 'var(--text-muted)' }}>No results found.</div>
                ) : null}
            </div>
            <div style={{ padding: '0.75rem', background: 'var(--tag-bg)', borderTop: '1px solid var(--border)', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right' }}>
                <span style={{ border: '1px solid var(--border)', padding: '2px 6px', borderRadius: '4px', background: 'var(--bg-card)' }}>ESC</span> to close
            </div>
        </div>
    </div>
  )
}
