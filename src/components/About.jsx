import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, Code, Heart } from 'lucide-react'

const stats = [
  { icon: <GraduationCap size={28} />, label: 'CS Student', value: 'UCP' },
  { icon: <Briefcase size={28} />, label: 'Internship', value: 'ELITE.Org' },
  { icon: <Code size={28} />, label: 'Focus Area', value: 'Frontend' },
  { icon: <Heart size={28} />, label: 'Passion', value: 'Web Dev' },
]

const About = ({ darkMode }) => {
  return (
    <section id="about" className="py-24 lg:py-32 relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-20" data-aos="fade-up">
          <p className={`text-sm font-mono mb-3 tracking-wider ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
            // About Me
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Get to Know <span className="gradient-text">Me</span>
          </h2>
          <div className="section-divider mx-auto" />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center flex-shrink-0"
          >
            <div className="relative">
              <div className={`w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden profile-glow ${
                darkMode ? 'bg-[#1e293b]' : 'bg-gray-100'
              }`}>
                <img
                  src="/profile.jpg"
                  alt="Ramisha Noor"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Experience Badge */}
              <motion.div
                className={`absolute -bottom-5 -right-5 px-5 py-4 rounded-2xl ${
                  darkMode ? 'bg-[#1e293b] border border-purple-500/30' : 'bg-white shadow-2xl'
                }`}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-purple-500 font-bold text-xl">CS Student</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>@ UCP</p>
              </motion.div>
              {/* Decorative corner */}
              <div className="absolute -top-5 -left-5 w-28 h-28 border-2 border-purple-500/30 rounded-3xl" />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h3 className="text-2xl lg:text-3xl font-bold mb-6">
              A Passionate <span className="text-purple-500">Frontend Developer</span> &amp; WordPress Developer
            </h3>

            <div className={`space-y-5 text-base lg:text-lg leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <p>
                I am a Computer Science student at the University of Central Punjab with a strong interest
                in frontend and web development. I enjoy creating responsive, user-friendly websites and
                turning ideas into practical digital experiences.
              </p>
              <p>
                I have hands-on experience with HTML5, CSS3, JavaScript, React.js, Basic SEO, APIs and
                WordPress, along with working knowledge of C++. Through academic projects and my Web
                Development Internship at ELITE.Org, I have gained practical experience in building websites,
                developing web applications, integrating Firebase authentication and databases, and applying
                basic SEO techniques.
              </p>
              <p>
                I am continuously learning, improving my development skills, and looking forward to opportunities
                where I can contribute and grow as a developer.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className={`text-center p-5 rounded-2xl card-hover ${
                    darkMode ? 'bg-[#1e293b] border border-gray-700/50' : 'bg-gray-50 border border-gray-200'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-purple-500 mb-3 flex justify-center">{stat.icon}</div>
                  <p className="font-bold text-base">{stat.value}</p>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
