import { User, Code2, Rocket, Globe, Mail, Linkedin, Twitter, Github } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function About() {
  const skills = [
    { name: 'TypeScript', color: 'bg-blue-500' },
    { name: 'React', color: 'bg-indigo-500' },
    { name: 'Node.js', color: 'bg-green-500' },
    { name: 'Rust', color: 'bg-orange-600' },
    { name: 'Kubernetes', color: 'bg-blue-600' },
    { name: 'AWS', color: 'bg-yellow-500' },
    { name: 'PostgreSQL', color: 'bg-indigo-400' },
    { name: 'Docker', color: 'bg-blue-400' }
  ];

  return (
    <div className="min-h-[80vh] py-20 px-6">
      <Helmet>
        <title>About | BentoLog</title>
        <meta name="description" content="About the author of BentoLog - Engineering Lead & Writer." />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-40 h-40 md:w-56 md:h-56 bg-white dark:bg-slate-900 rounded-3xl flex items-center justify-center text-slate-200 shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
               <User size={80} className="text-slate-300 dark:text-slate-700" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg border-4 border-white dark:border-slate-950">
               <Code2 size={20} />
            </div>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-indigo-600 font-black uppercase tracking-[0.2em] text-xs mb-3">Engineering Lead & Writer</h4>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
              I build systems that <span className="text-indigo-600">scale.</span>
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
               <a href="#" className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl hover:text-indigo-600 transition-colors shadow-sm"><Twitter size={18} /></a>
               <a href="#" className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl hover:text-indigo-600 transition-colors shadow-sm"><Github size={18} /></a>
               <a href="#" className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl hover:text-indigo-600 transition-colors shadow-sm"><Linkedin size={18} /></a>
               <Link to="/contact" className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl hover:text-indigo-600 transition-colors shadow-sm"><Mail size={18} /></Link>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8 prose prose-slate dark:prose-invert prose-lg">
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
               Hello! I'm the creator of BentoLog. I've spent over a decade navigating the complexities of modern software architecture, from microservices at scale to refined design systems.
            </p>
            <p>
              This journal is my "digital garden" where I document my technical explorations and share insights that might help other engineers solve real-world problems. I believe in clean code, robust types, and developer experience that makes building software a joy.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 not-prose mt-12">
              <div className="p-8 bg-indigo-50 dark:bg-indigo-900/20 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/50">
                <Rocket className="text-indigo-600 mb-4" size={32} />
                <h3 className="font-black text-slate-900 dark:text-white mb-2">My Mission</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">To bridge the gap between high-level architectural concepts and pragmatic implementation details.</p>
              </div>
              <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                <Globe className="text-indigo-600 mb-4" size={32} />
                <h3 className="font-black text-slate-900 dark:text-white mb-2">My Community</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">I actively contribute to open source and mentor developers worldwide through various platforms.</p>
              </div>
            </div>
          </div>

          <aside className="space-y-12">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center">
                <span className="w-8 h-px bg-slate-200 dark:bg-slate-800 mr-3"></span>
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill.name} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-sm font-bold shadow-sm">
                    <span className={`w-2 h-2 rounded-full ${skill.color}`}></span>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white">
              <h4 className="font-black mb-4">Want to collaborate?</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">I'm always open to discussing technical projects, speaking engagements, or code reviews.</p>
              <Link to="/contact" className="inline-block w-full text-center py-4 bg-indigo-600 rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all">Get in touch</Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
