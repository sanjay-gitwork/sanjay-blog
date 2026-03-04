import { Link } from 'react-router-dom'
import { LayoutGrid, Twitter, Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-2">
                <Link to="/" className="flex items-center gap-2.5 mb-6">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                    <LayoutGrid size={16} />
                  </div>
                  <span className="text-lg font-black tracking-tighter">Bento<span className="text-indigo-600">Log.</span></span>
                </Link>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed mb-8">
                  A curated collection of thoughts on software architecture, design systems, and the future of technology. Written for engineers, by engineers.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-indigo-600 transition-colors"><Twitter size={18} /></a>
                  <a href="#" className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-indigo-600 transition-colors"><Github size={18} /></a>
                  <a href="#" className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-indigo-600 transition-colors"><Linkedin size={18} /></a>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white mb-6">Journal</h4>
                <ul className="space-y-4">
                  <li><Link to="/" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Latest Posts</Link></li>
                  <li><Link to="/?category=Engineering" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Engineering</Link></li>
                  <li><Link to="/?category=Tech & Tools" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Tech & Tools</Link></li>
                  <li><Link to="/mdx-example" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">MDX Samples</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white mb-6">Company</h4>
                <ul className="space-y-4">
                  <li><Link to="/about" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">About Me</Link></li>
                  <li><Link to="/contact" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Contact</Link></li>
                  <li><a href="mailto:hello@bentolog.com" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-2"><Mail size={14} /> hello@bentolog.com</a></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
              <p>&copy; 2026 BentoLog Systems. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-slate-900 dark:hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-slate-900 dark:hover:text-white">Terms of Service</a>
              </div>
            </div>
        </div>
    </footer>
  )
}
