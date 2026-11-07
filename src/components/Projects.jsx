import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Play, ChevronRight } from 'lucide-react'
import { FaGithub as Github } from 'react-icons/fa'

const projects = [
  {
    title: 'JobNest – Job Portal',
    description: 'A multi-page job portal application with reusable components, dynamic data, and responsive layouts.',
    tech: ['React.js', 'JavaScript', 'CSS', 'REST API'],
    github: 'https://github.com/ramishanoor5-pixel/jobnest',
    live: 'https://jobnest001.netlify.app/',
    category: 'React',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'TaskFlow – Task Management',
    description: 'A task management application featuring user authentication and CRUD operations. Users can sign up, log in, and manage their personal tasks.',
    tech: ['React.js', 'Firebase Auth', 'Firestore', 'CSS'],
    github: 'https://github.com/ramishanoor5-pixel/task-flow',
    live: 'https://task-flow9.netlify.app/login',
    category: 'React',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Mehfil-e-Zauq – Restaurant',
    description: 'A restaurant website featuring an elegant design, responsive layout, restaurant information, and reservation-focused sections.',
    tech: ['WordPress', 'Elementor'],
    video: 'https://drive.google.com/file/d/13o1ygxpJ9RncqQkQzXiC-OSpHZ797WpU/view?usp=sharing',
    category: 'WordPress',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    title: 'Amazon Clone',
    description: 'A frontend website inspired by Amazon, created to practice webpage structure, styling, layouts, and responsive design.',
    tech: ['HTML5', 'CSS3'],
    github: 'https://github.com/ramishanoor5-pixel/amazon-clone',
    category: 'HTML/CSS',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    title: 'Lofology Clone',
    description: 'A website clone developed to practice frontend design, webpage structure, and styling.',
    tech: ['HTML5', 'CSS3'],
    github: 'https://github.com/ramishanoor5-pixel/loafology-clone',
    category: 'HTML/CSS',
    gradient: 'from-green-500 to-teal-500',
  },
  {
    title: 'Arduino Obstacle-Avoiding Car',
    description: 'A 4WD obstacle-avoiding robot car built using Arduino Uno, ultrasonic sensor, servo motor, and motor driver. Won 1st position at the DLD Expo.',
    tech: ['Arduino', 'C++', 'Ultrasonic Sensor', 'L298N'],
    category: 'Hardware',
    gradient: 'from-violet-500 to-indigo-500',
  },
]

const categories = ['All', 'React', 'WordPress', 'HTML/CSS', 'Hardware']

const Projects = ({ darkMode }) => {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" className={`py-24 lg:py-32 ${darkMode ? 'bg-[#0d1117]' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <p className={`text-sm font-mono mb-3 tracking-wider ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
            // My Work
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="section-divider mx-auto" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-14" data-aos="fade-up" data-aos-delay="100">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                  : darkMode
                  ? 'bg-[#1e293b] text-gray-400 hover:text-white hover:bg-[#2d3a4f]'
                  : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-9">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`group rounded-2xl overflow-hidden card-hover ${
                  darkMode
                    ? 'bg-[#1e293b] border border-gray-700/50'
                    : 'bg-white border border-gray-200 shadow-sm'
                }`}
              >
                {/* Project Header with gradient */}
                <div className={`h-48 sm:h-44 lg:h-48 bg-gradient-to-br ${project.gradient} relative flex items-center justify-center`}>
                  <div className="text-white/20 text-7xl font-bold font-mono">
                    {project.title.charAt(0)}
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Github size={22} />
                      </motion.a>
                    )}
                    {project.live && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                      >
                        <ExternalLink size={22} />
                      </motion.a>
                    )}
                    {project.video && (
                      <motion.a
                        href={project.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Play size={22} />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 lg:p-7">
                  <h3 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm mb-5 leading-relaxed line-clamp-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2.5 mb-5">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium ${
                          darkMode
                            ? 'bg-[#151c2c] text-purple-400 border border-purple-500/20'
                            : 'bg-purple-50 text-purple-600'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-5 pt-4 border-t ${darkMode ? 'border-gray-700/50' : 'border-gray-100'}">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1.5 text-sm font-medium hover:text-purple-500 transition-colors ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        <Github size={16} />
                        Code
                        <ChevronRight size={14} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1.5 text-sm font-medium hover:text-purple-500 transition-colors ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        <ExternalLink size={16} />
                        Live Demo
                        <ChevronRight size={14} />
                      </a>
                    )}
                    {project.video && (
                      <a
                        href={project.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1.5 text-sm font-medium hover:text-purple-500 transition-colors ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        <Play size={16} />
                        Video
                        <ChevronRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
