import { useState } from 'react'
import { Send, CheckCircle, Mail, MapPin, MessageSquare, Phone, ArrowLeft } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate a brief delay
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <div className="min-h-[80vh] py-20 px-6">
      <Helmet>
        <title>Contact | BentoLog</title>
        <meta name="description" content="Get in touch with the author of BentoLog." />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-indigo-600 mb-12 group transition-colors">
          <ArrowLeft size={16} className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Back to Journal
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h4 className="text-indigo-600 font-black uppercase tracking-[0.2em] text-xs mb-3">Contact</h4>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                Let's <span className="text-indigo-600">Connect.</span>
              </h1>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 dark:text-white mb-1">Email Me</h3>
                  <p className="text-slate-500 dark:text-slate-400">hello@bentolog.com</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 dark:text-white mb-1">Office</h3>
                  <p className="text-slate-500 dark:text-slate-400">San Francisco, CA</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 dark:text-white mb-1">Call</h3>
                  <p className="text-slate-500 dark:text-slate-400">+1 (555) 000-0000</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
               <MessageSquare className="text-indigo-600 mb-4" size={32} />
               <h3 className="font-black text-slate-900 dark:text-white mb-2">Live Chat</h3>
               <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">I'm available for quick chats during business hours (PST).</p>
               <button className="text-indigo-600 font-bold hover:underline">Start Chatting →</button>
            </div>
          </div>

          {/* Form Area */}
          <div className="lg:col-span-3">
            {!submitted ? (
              <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-indigo-500/5">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Jane Doe" 
                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all dark:text-white" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="jane@example.com" 
                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all dark:text-white" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Subject</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Project Inquiry" 
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all dark:text-white" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Your Message</label>
                    <textarea 
                      required 
                      rows={6} 
                      placeholder="Tell me about your project..." 
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all dark:text-white resize-none"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Sending..." : <>Send Message <Send size={18} /></>}
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-indigo-600 p-12 md:p-20 rounded-[3rem] text-center text-white animate-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle size={48} className="text-white" />
                  </div>
                  <h2 className="text-4xl font-black mb-4 tracking-tight">Message Received!</h2>
                  <p className="text-indigo-100 text-lg mb-10 max-w-sm mx-auto leading-relaxed">Thanks for reaching out. I usually respond within 24 hours.</p>
                  <Link to="/" className="inline-block px-10 py-5 bg-white text-indigo-600 font-black rounded-2xl hover:bg-indigo-50 transition-all shadow-xl">Back to Home</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
