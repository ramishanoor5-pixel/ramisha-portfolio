import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { ArrowDown } from 'lucide-react'

const roles = [
  'Frontend Developer',
  'WordPress Developer',
  'Web Developer',
  'React Developer',
]

const Hero = ({ darkMode }) => {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const role = roles[currentRole]
    let timeout

    if (!isDeleting) {
      if (displayText.length < role.length) {
        timeout = setTimeout(() => {
          setDisplayText(role.substring(0, displayText.length + 1))
        }, 100)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000)
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1))
        }, 50)
      } else {
        setIsDeleting(false)
        setCurrentRole((prev) => (prev + 1) % roles.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 w-full relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-20">
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left flex-1"
          >
            <motion.p
              variants={itemVariants}
              className={`text-base md:text-lg font-mono mb-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}
            >
              👋 Hello, I'm
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="gradient-text">Hafiza Ramisha</span>
              <br />
              <span className={darkMode ? 'text-white' : 'text-gray-900'}>Noor</span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="text-xl sm:text-2xl md:text-3xl font-medium mb-8 h-10"
            >
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>I'm a </span>
              <span className="text-purple-500">{displayText}</span>
              <span className="typing-cursor text-purple-500">|</span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className={`text-base md:text-lg mb-10 max-w-xl leading-relaxed ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              } mx-auto lg:mx-0`}
            >
              Building responsive and user-friendly web experiences with creativity and clean code.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
            >
              <motion.a
                href="#projects"
                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors duration-200 text-center text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Projects
              </motion.a>
              <motion.a
                href="#contact"
                className={`px-8 py-4 border-2 border-purple-600 font-semibold rounded-xl transition-colors duration-200 text-center text-base ${
                  darkMode ? 'text-purple-400 hover:bg-purple-600/10' : 'text-purple-600 hover:bg-purple-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex gap-5 justify-center lg:justify-start relative z-20"
            >
              <motion.a
                href="https://github.com/ramishanoor5-pixel"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className={`p-4 rounded-xl transition-all duration-200 cursor-pointer ${
                  darkMode
                    ? 'bg-[#1e293b] text-gray-300 hover:text-purple-400 hover:bg-[#2d3a4f] shadow-md shadow-purple-500/5'
                    : 'bg-gray-100 text-gray-600 hover:text-purple-600 hover:bg-gray-200 shadow-md'
                }`}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub size={24} />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/hafiza-ramisha-noor-b65805375/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className={`p-4 rounded-xl transition-all duration-200 cursor-pointer ${
                  darkMode
                    ? 'bg-[#1e293b] text-gray-300 hover:text-purple-400 hover:bg-[#2d3a4f] shadow-md shadow-purple-500/5'
                    : 'bg-gray-100 text-gray-600 hover:text-purple-600 hover:bg-gray-200 shadow-md'
                }`}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin size={24} />
              </motion.a>

              <motion.a
                href="mailto:ramishanoor5@gmail.com"
                aria-label="Send Email"
                className={`p-4 rounded-xl transition-all duration-200 cursor-pointer ${
                  darkMode
                    ? 'bg-[#1e293b] text-gray-300 hover:text-purple-400 hover:bg-[#2d3a4f] shadow-md shadow-purple-500/5'
                    : 'bg-gray-100 text-gray-600 hover:text-purple-600 hover:bg-gray-200 shadow-md'
                }`}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <HiOutlineMail size={24} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex justify-center flex-shrink-0"
          >
            <div className="relative">
              {/* Rotating border */}
              <motion.div
                className="absolute inset-[-8px] rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #8b5cf6, #6d28d9, #a78bfa, #8b5cf6)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <div className={`relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden ${darkMode ? 'bg-[#0b0f19]' : 'bg-[#f8fafc]'} p-1.5`}>
                <img
                  src="/profile.jpg"
                  alt="Hafiza Ramisha Noor"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Floating badges */}
              <motion.div
                className={`absolute -right-6 top-10 px-4 py-2 rounded-xl text-sm font-medium shadow-lg ${
                  darkMode ? 'bg-[#1e293b] text-purple-400 border border-purple-500/30' : 'bg-white text-purple-600 shadow-xl'
                }`}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                ⚛️ React.js
              </motion.div>
              <motion.div
                className={`absolute -left-6 bottom-20 px-4 py-2 rounded-xl text-sm font-medium shadow-lg ${
                  darkMode ? 'bg-[#1e293b] text-purple-400 border border-purple-500/30' : 'bg-white text-purple-600 shadow-xl'
                }`}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                🌐 WordPress
              </motion.div>
              <motion.div
                className={`absolute right-2 -bottom-2 px-4 py-2 rounded-xl text-sm font-medium shadow-lg ${
                  darkMode ? 'bg-[#1e293b] text-purple-400 border border-purple-500/30' : 'bg-white text-purple-600 shadow-xl'
                }`}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                🔥 Firebase
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={28} />
      </motion.a>
    </section>
  )
}

export default Hero
