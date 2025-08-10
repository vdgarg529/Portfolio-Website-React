import { experiences } from '../constants';
import { motion } from 'framer-motion';

const ExperienceCard = ({ experience, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="mb-10 relative pl-8 border-l-2 border-[#915EFF]"
  >
    <div className="absolute -left-3 w-6 h-6 rounded-full bg-[#915EFF] flex items-center justify-center">
      <div className="w-4 h-4 rounded-full bg-white"></div>
    </div>
    <div className="bg-tertiary p-5 rounded-xl">
      <div className="flex items-center gap-4 mb-4">
        <img 
          src={experience.icon} 
          alt={experience.company_name}
          className="w-12 h-12 object-contain rounded-full"
        />
        <div>
          <h3 className="text-white text-xl font-bold">{experience.title}</h3>
          <p className="text-secondary">{experience.company_name}</p>
        </div>
      </div>
      <p className="text-secondary text-sm mb-3 text-justify">{experience.date}</p>
      <ul className="space-y-2">
        {experience.points.map((point, i) => (
          <li key={i} className="text-white-100 text-sm flex items-start text-justify">
            <span className="mr-2">•</span> {point}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const Experience = ({ darkMode }) => (
  <div className="w-3/4 mx-auto">
    <h2
      className={`font-black text-center mb-6 
        text-[30px] xs:text-[40px] sm:text-[50px] md:text-[60px] 
        ${darkMode ? 'text-white' : 'text-gray-900'}`}
    >
      Work Experience
    </h2>

    <div className="relative">
      {experiences.map((experience, index) => (
        <ExperienceCard
          key={index}
          experience={experience}
          index={index}
          darkMode={darkMode}
        />
      ))}
    </div>
  </div>
);

export default Experience;
