import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, 
  MapPin, 
  Send, 
  User, 
  MessageSquare, 
  AtSign, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  LogOut, 
  Trash2, 
  Clock,
  Inbox
} from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { db, auth } from '../config/firebase'
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  orderBy, 
  query, 
  serverTimestamp 
} from 'firebase/firestore'
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'

const Contact = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  // Admin Portal State
  const [showAdminModal, setShowAdminModal] = useState(false)
  const [adminUser, setAdminUser] = useState(null)
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [adminError, setAdminError] = useState('')
  const [messages, setMessages] = useState([])
  const [loadingMessages, setLoadingMessages] = useState(false)

  // Listen to Auth state for Admin
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAdminUser(user)
      if (user) {
        fetchMessages()
      }
    })
    return () => unsubscribe()
  }, [])

  const fetchMessages = async () => {
    setLoadingMessages(true)
    try {
      const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'))
      const snapshot = await getDocs(q)
      const list = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        dateFormatted: d.data().createdAt?.toDate ? d.data().createdAt.toDate().toLocaleString() : 'Just now'
      }))
      setMessages(list)
    } catch (err) {
      console.error('Error fetching messages:', err)
    } finally {
      setLoadingMessages(false)
    }
  }

  const handleDeleteMessage = async (id) => {
    try {
      await deleteDoc(doc(db, 'contacts', id))
      setMessages((prev) => prev.filter((m) => m.id !== id))
    } catch (err) {
      console.error('Error deleting message:', err)
    }
  }

  const handleAdminLogin = async (e) => {
    e.preventDefault()
    setAdminError('')
    try {
      await signInWithEmailAndPassword(auth, adminEmail, adminPassword)
      setAdminPassword('')
    } catch (err) {
      setAdminError(err.message || 'Login failed. Please check credentials.')
    }
  }

  const handleAdminLogout = async () => {
    await signOut(auth)
    setMessages([])
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      // 1. Save contact message into Firebase Firestore
      await addDoc(collection(db, 'contacts'), {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        createdAt: serverTimestamp(),
      })

      setStatus({
        type: 'success',
        message: 'Thank you! Your message has been saved and sent successfully. I will get back to you shortly.',
      })
      setFormData({ name: '', email: '', subject: '', message: '' })

      // If admin is currently logged in, refresh list
      if (adminUser) {
        fetchMessages()
      }
    } catch (err) {
      console.error('Firebase error:', err)
      // Fallback: If network or permission issues occur, offer mailto
      setStatus({
        type: 'error',
        message: 'Could not connect directly to the database. Opening your email app as fallback...',
      })
      const mailtoLink = `mailto:ramishanoor5@gmail.com?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      )}`
      window.open(mailtoLink, '_blank')
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail size={22} />,
      label: 'Email',
      value: 'ramishanoor5@gmail.com',
      href: 'mailto:ramishanoor5@gmail.com',
    },
    {
      icon: <MapPin size={22} />,
      label: 'Location',
      value: 'Punjab, Pakistan',
      href: null,
    },
  ]

  const socialLinks = [
    {
      icon: <FaGithub size={22} />,
      label: 'GitHub',
      href: 'https://github.com/ramishanoor5-pixel',
    },
    {
      icon: <FaLinkedin size={22} />,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/hafiza-ramisha-noor-b65805375/',
    },
    {
      icon: <Mail size={22} />,
      label: 'Email Me',
      href: 'mailto:ramishanoor5@gmail.com',
    },
  ]

  return (
    <section id="contact" className="py-24 lg:py-32 relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-20" data-aos="fade-up">
          <p className={`text-sm font-mono mb-3 tracking-wider ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
            // Get in Touch
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Let's Build Something <span className="gradient-text">Together</span>
          </h2>
          <div className="section-divider mx-auto mb-6" />
          <p className={`max-w-2xl mx-auto text-base lg:text-lg leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Have a project in mind or want to collaborate? Feel free to reach out. Messages sent here are stored safely via Firebase!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Contact Information
              </h3>

              <div className="space-y-5">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-center gap-5 p-5 rounded-2xl ${
                      darkMode ? 'bg-[#1e293b] border border-gray-700/50' : 'bg-gray-50 border border-gray-200'
                    }`}
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                      {info.icon}
                    </div>
                    <div>
                      <p className={`text-xs mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className={`text-base font-medium hover:text-purple-500 transition-colors ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className={`text-base font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {info.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className={`text-base font-bold mb-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Follow Me
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`p-4 rounded-xl transition-all duration-200 cursor-pointer ${
                      darkMode
                        ? 'bg-[#1e293b] text-gray-400 hover:text-purple-400 hover:bg-[#2d3a4f] border border-gray-700/50'
                        : 'bg-gray-50 text-gray-500 hover:text-purple-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                    whileHover={{ scale: 1.12, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Admin Portal Trigger (Discreet button to view received messages) */}
            <div className="pt-4 border-t border-gray-800/50">
              <button
                onClick={() => setShowAdminModal(true)}
                className={`flex items-center gap-2 text-xs font-mono transition-colors ${
                  darkMode ? 'text-gray-500 hover:text-purple-400' : 'text-gray-400 hover:text-purple-600'
                }`}
              >
                <Lock size={14} />
                <span>{adminUser ? 'View Received Messages (Online)' : 'Admin: View Messages'}</span>
              </button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className={`lg:col-span-3 p-8 lg:p-10 rounded-2xl ${
              darkMode ? 'bg-[#1e293b] border border-gray-700/50' : 'bg-white border border-gray-200 shadow-sm'
            }`}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Status Alert */}
            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl mb-6 flex items-start gap-3 text-sm ${
                  status.type === 'success'
                    ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                    : 'bg-red-500/10 border border-red-500/30 text-red-400'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                )}
                <span>{status.message}</span>
              </motion.div>
            )}

            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Name
                </label>
                <div className="relative">
                  <User size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className={`w-full pl-12 pr-5 py-4 rounded-xl text-base outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-500/50 ${
                      darkMode
                        ? 'bg-[#151c2c] border border-gray-700 text-white placeholder-gray-600'
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Email
                </label>
                <div className="relative">
                  <AtSign size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className={`w-full pl-12 pr-5 py-4 rounded-xl text-base outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-500/50 ${
                      darkMode
                        ? 'bg-[#151c2c] border border-gray-700 text-white placeholder-gray-600'
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Project Collaboration"
                className={`w-full px-5 py-4 rounded-xl text-base outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-500/50 ${
                  darkMode
                    ? 'bg-[#151c2c] border border-gray-700 text-white placeholder-gray-600'
                    : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            <div className="mb-8">
              <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Message
              </label>
              <div className="relative">
                <MessageSquare size={18} className={`absolute left-4 top-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell me about your project..."
                  className={`w-full pl-12 pr-5 py-4 rounded-xl text-base outline-none resize-none transition-all duration-200 focus:ring-2 focus:ring-purple-500/50 ${
                    darkMode
                      ? 'bg-[#151c2c] border border-gray-700 text-white placeholder-gray-600'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors duration-200 text-lg shadow-lg shadow-purple-500/20 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              <Send size={20} />
              <span>{loading ? 'Saving message...' : 'Send Message'}</span>
            </motion.button>
          </motion.form>
        </div>
      </div>

      {/* Admin Messages Modal */}
      <AnimatePresence>
        {showAdminModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-3xl max-h-[85vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl ${
                darkMode ? 'bg-[#151c2c] border border-gray-700 text-white' : 'bg-white border border-gray-200 text-gray-900'
              }`}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-400">
                    <Inbox size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Contact Messages Dashboard</h3>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {adminUser ? `Logged in as: ${adminUser.email}` : 'Firebase Authentication Required'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAdminModal(false)}
                  className={`p-2 rounded-lg text-sm ${darkMode ? 'hover:bg-[#1e293b]' : 'hover:bg-gray-100'}`}
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto flex-1">
                {!adminUser ? (
                  /* Login View */
                  <form onSubmit={handleAdminLogin} className="max-w-md mx-auto py-6">
                    <p className={`text-sm mb-6 text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Sign in with your Firebase admin credentials to view and manage inquiries sent through this website.
                    </p>

                    {adminError && (
                      <div className="p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                        {adminError}
                      </div>
                    )}

                    <div className="mb-4">
                      <label className="block text-xs font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        required
                        placeholder="ramishanoor5@gmail.com"
                        className={`w-full px-4 py-3 rounded-xl text-sm outline-none ${
                          darkMode ? 'bg-[#1e293b] border border-gray-700 text-white' : 'bg-gray-50 border border-gray-200'
                        }`}
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-xs font-semibold mb-2">Password</label>
                      <input
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        className={`w-full px-4 py-3 rounded-xl text-sm outline-none ${
                          darkMode ? 'bg-[#1e293b] border border-gray-700 text-white' : 'bg-gray-50 border border-gray-200'
                        }`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-sm transition-colors"
                    >
                      Authenticate & View Messages
                    </button>
                  </form>
                ) : (
                  /* Messages View */
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium">
                        Total Inquiries: <strong className="text-purple-400">{messages.length}</strong>
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={fetchMessages}
                          className="text-xs px-3 py-1.5 rounded-lg bg-purple-600/20 text-purple-400 hover:bg-purple-600/30"
                        >
                          Refresh
                        </button>
                        <button
                          onClick={handleAdminLogout}
                          className="text-xs flex items-center gap-1 text-red-400 hover:underline"
                        >
                          <LogOut size={12} />
                          Sign Out
                        </button>
                      </div>
                    </div>

                    {loadingMessages ? (
                      <p className="text-center py-8 text-sm text-gray-500">Loading messages from Firebase...</p>
                    ) : messages.length === 0 ? (
                      <div className="text-center py-12">
                        <Inbox size={40} className="mx-auto mb-3 opacity-30 text-purple-400" />
                        <p className="text-sm text-gray-400">No messages received yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.map((item) => (
                          <div
                            key={item.id}
                            className={`p-5 rounded-xl border transition-all ${
                              darkMode ? 'bg-[#1e293b] border-gray-700/60' : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div>
                                <h4 className="font-bold text-base">{item.subject || 'No Subject'}</h4>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  From: <span className="font-semibold">{item.name}</span> ({item.email})
                                </p>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-[11px] text-gray-500 flex items-center gap-1">
                                  <Clock size={12} />
                                  {item.dateFormatted}
                                </span>
                                <button
                                  onClick={() => handleDeleteMessage(item.id)}
                                  className="text-gray-400 hover:text-red-400 p-1"
                                  title="Delete message"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                            <p className={`text-sm mt-3 whitespace-pre-wrap leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {item.message}
                            </p>
                            <div className="mt-4 pt-3 border-t border-gray-700/40 flex justify-end">
                              <a
                                href={`mailto:${item.email}?subject=Re: ${encodeURIComponent(item.subject || 'Your inquiry')}`}
                                className="text-xs px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg inline-flex items-center gap-1"
                              >
                                <Mail size={12} />
                                Reply to {item.email}
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Contact
