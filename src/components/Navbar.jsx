import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, Download } from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navLinks.map(link => link.href.substring(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? darkMode
            ? 'bg-[#0b0f19]/90 backdrop-blur-md shadow-lg shadow-purple-500/5'
            : 'bg-white/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            className="text-xl lg:text-2xl font-bold font-mono"
            whileHover={{ scale: 1.05 }}
          >
            <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>&lt;</span>
            <span className="gradient-text">Ramisha</span>
            <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}> /&gt;</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-purple-500 ${
                  activeSection === link.href.substring(1)
                    ? 'text-purple-500'
                    : darkMode
                    ? 'text-gray-300'
                    : 'text-gray-600'
                }`}
                whileHover={{ y: -2 }}
              >
                {link.name}
              </motion.a>
            ))}

            <motion.a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={16} />
              Resume
            </motion.a>

            <motion.button
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-lg transition-colors duration-200 ${
                darkMode ? 'bg-[#1e293b] text-yellow-400 hover:bg-[#2d3a4f]' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 lg:hidden">
            <motion.button
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-lg ${
                darkMode ? 'bg-[#1e293b] text-yellow-400' : 'bg-gray-200 text-gray-700'
              }`}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2.5 rounded-lg ${
                darkMode ? 'text-gray-300 hover:bg-[#1e293b]' : 'text-gray-700 hover:bg-gray-200'
              }`}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`lg:hidden overflow-hidden ${
              darkMode ? 'bg-[#0b0f19]/95 backdrop-blur-md border-t border-gray-800' : 'bg-white/95 backdrop-blur-md border-t border-gray-200'
            }`}
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`block py-3 text-base font-medium transition-colors duration-200 hover:text-purple-500 ${
                    activeSection === link.href.substring(1)
                      ? 'text-purple-500'
                      : darkMode
                      ? 'text-gray-300'
                      : 'text-gray-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="/resume.pdf"
                download
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 py-3 text-base font-medium text-purple-500"
              >
                <Download size={18} />
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
