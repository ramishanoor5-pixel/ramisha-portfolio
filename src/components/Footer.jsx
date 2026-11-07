import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { ArrowUp, Heart } from 'lucide-react'

const Footer = ({ darkMode }) => {
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowScroll(true)
      } else {
        setShowScroll(false)
      }
    }
    window.addEventListener('scroll', checkScroll)
    return () => window.removeEventListener('scroll', checkScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <footer className={`relative pt-16 pb-8 ${darkMode ? 'bg-[#070a12] border-t border-gray-800' : 'bg-gray-100 border-t border-gray-200'}`}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            <a href="#home" className="text-xl font-bold font-mono mb-4 inline-block">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>&lt;</span>
              <span className="gradient-text">Ramisha</span>
              <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}> /&gt;</span>
            </a>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Frontend Developer &amp; WordPress Developer building responsive and user-friendly web experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-base font-bold mb-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm hover:text-purple-500 transition-colors py-1 ${
                    darkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className={`text-base font-bold mb-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Connect
            </h4>
            <div className="flex gap-4">
              <motion.a
                href="https://github.com/ramishanoor5-pixel"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={`p-3 rounded-xl transition-colors ${
                  darkMode ? 'bg-[#1e293b] text-gray-400 hover:text-purple-400' : 'bg-white text-gray-500 hover:text-purple-600 border border-gray-200'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                <FaGithub size={20} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/hafiza-ramisha-noor-b65805375/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`p-3 rounded-xl transition-colors ${
                  darkMode ? 'bg-[#1e293b] text-gray-400 hover:text-purple-400' : 'bg-white text-gray-500 hover:text-purple-600 border border-gray-200'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                <FaLinkedin size={20} />
              </motion.a>
              <motion.a
                href="mailto:ramishanoor5@gmail.com"
                aria-label="Email"
                className={`p-3 rounded-xl transition-colors ${
                  darkMode ? 'bg-[#1e293b] text-gray-400 hover:text-purple-400' : 'bg-white text-gray-500 hover:text-purple-600 border border-gray-200'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                <HiOutlineMail size={20} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`} />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4">
          <p className={`text-sm ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
            © {new Date().getFullYear()} Hafiza Ramisha Noor. All rights reserved.
          </p>
          <p className={`text-sm flex items-center gap-1.5 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
            Built with <Heart size={14} className="text-red-500" /> using React &amp; Tailwind CSS
          </p>
        </div>
      </div>

      {/* Back to Top Button: Only shows when scrolled down, positioned higher so it never overlaps Netlify badge */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-20 right-6 md:right-8 p-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-2xl shadow-purple-500/30 z-40 cursor-pointer"
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}

export default Footer
