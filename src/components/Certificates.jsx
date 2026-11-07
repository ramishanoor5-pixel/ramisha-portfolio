import { motion } from 'framer-motion'
import { Calendar, Building2 } from 'lucide-react'

const certificates = [
  {
    title: 'Best Intern of October – Web Development',
    issuer: 'ELITE.Org',
    date: 'October 2026',
    icon: '🏆',
    color: 'from-yellow-500/20 to-orange-500/20',
    borderColor: 'border-yellow-500/30',
  },
  {
    title: 'Presenter Badge',
    issuer: 'ELITE.Org',
    date: '2026',
    icon: '🎤',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
  },
  {
    title: 'Content Marketing Essentials for SEO and AI Search',
    issuer: 'Semrush',
    date: '2026',
    icon: '📜',
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
  },
  {
    title: 'DLD Expo – 1st Position',
    issuer: 'University Project – Arduino Car',
    date: '2026',
    icon: '🥇',
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
  },
]

const Certificates = ({ darkMode }) => {
  return (
    <section id="certificates" className="py-24 lg:py-32 relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-20" data-aos="fade-up">
          <p className={`text-sm font-mono mb-3 tracking-wider ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
            // Achievements
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Certificates & <span className="gradient-text">Awards</span>
          </h2>
          <div className="section-divider mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              className={`relative p-7 lg:p-8 rounded-2xl card-hover overflow-hidden ${
                darkMode
                  ? `bg-[#1e293b] border ${cert.borderColor}`
                  : 'bg-white border border-gray-200 shadow-sm'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-50`} />

              <div className="relative z-10">
                <div className="text-5xl mb-5">{cert.icon}</div>
                <h3 className={`text-base font-bold mb-4 leading-snug ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {cert.title}
                </h3>
                <div className={`flex items-center gap-2 text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Building2 size={14} />
                  <span>{cert.issuer}</span>
                </div>
                <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  <Calendar size={14} />
                  <span>{cert.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certificates
