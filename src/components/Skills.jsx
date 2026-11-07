import { motion } from 'framer-motion'
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaWordpress,
  FaGitAlt,
  FaGithub,
} from 'react-icons/fa'
import {
  SiFirebase,
  SiNetlify,
  SiElementor,
  SiCplusplus,
} from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'
import { Globe, Search, PenTool, Plug } from 'lucide-react'

const skillCategories = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'HTML5', icon: <FaHtml5 size={22} />, color: '#e34f26' },
      { name: 'CSS3', icon: <FaCss3Alt size={22} />, color: '#1572b6' },
      { name: 'JavaScript', icon: <FaJsSquare size={22} />, color: '#f7df1e' },
      { name: 'React.js', icon: <FaReact size={22} />, color: '#61dafb' },
      { name: 'Responsive Design', icon: <Globe size={22} />, color: '#8b5cf6' },
    ],
  },
  {
    title: 'Backend & Database',
    skills: [
      { name: 'Firebase Auth', icon: <SiFirebase size={22} />, color: '#ffca28' },
      { name: 'Firebase Firestore', icon: <SiFirebase size={22} />, color: '#ff9100' },
      { name: 'API Integration', icon: <Plug size={22} />, color: '#10b981' },
    ],
  },
  {
    title: 'CMS & SEO',
    skills: [
      { name: 'WordPress', icon: <FaWordpress size={22} />, color: '#21759b' },
      { name: 'Elementor', icon: <SiElementor size={22} />, color: '#92003b' },
      { name: 'Basic SEO', icon: <Search size={22} />, color: '#4ade80' },
      { name: 'Keyword Research', icon: <Search size={22} />, color: '#22d3ee' },
      { name: 'Blog Writing', icon: <PenTool size={22} />, color: '#f472b6' },
    ],
  },
  {
    title: 'Programming & Tools',
    skills: [
      { name: 'C++', icon: <SiCplusplus size={22} />, color: '#00599c' },
      { name: 'Git', icon: <FaGitAlt size={22} />, color: '#f05032' },
      { name: 'GitHub', icon: <FaGithub size={22} />, color: '#8b5cf6' },
      { name: 'VS Code', icon: <VscCode size={22} />, color: '#007acc' },
      { name: 'Netlify', icon: <SiNetlify size={22} />, color: '#00c7b7' },
    ],
  },
]

const Skills = ({ darkMode }) => {
  return (
    <section id="skills" className={`py-24 lg:py-32 ${darkMode ? 'bg-[#0d1117]' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-20" data-aos="fade-up">
          <p className={`text-sm font-mono mb-3 tracking-wider ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
            // My Skills
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Technologies & <span className="gradient-text">Tools</span>
          </h2>
          <div className="section-divider mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              className={`p-7 lg:p-8 rounded-2xl card-hover ${
                darkMode ? 'bg-[#1e293b] border border-gray-700/50' : 'bg-white border border-gray-200 shadow-sm'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
            >
              <h3 className={`text-xl font-bold mb-7 pb-4 border-b ${
                darkMode ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'
              }`}>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className={`skill-icon flex items-center gap-3 px-5 py-3.5 rounded-xl cursor-default ${
                      darkMode
                        ? 'bg-[#151c2c] border border-gray-700/50 hover:border-purple-500/50'
                        : 'bg-gray-50 border border-gray-200 hover:border-purple-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span style={{ color: skill.color }}>
                      {skill.icon}
                    </span>
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
