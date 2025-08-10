import { education } from '../constants';
import { motion } from 'framer-motion';

const EducationCard = ({ edu, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-tertiary p-6 rounded-2xl hover:shadow-lg transition-shadow"
  >
    <div className="flex items-start gap-4">
      <img
        src={edu.icon}
        alt={edu.school}
        className="w-16 h-16 object-contain rounded-xl"
      />
      <div className="text-justify">
        <h3 className="text-white font-bold text-xl">{edu.degree}</h3>
        <p className="text-secondary font-medium">{edu.school}</p>

        <div className="flex items-center gap-3 text-sm text-secondary mt-1">
          <span>{edu.date}</span>
          {edu.grade && (
            <span className="bg-yellow-400 text-red-700 px-2 py-0.5 rounded-full text-xs font-semibold">
              {edu.grade}
            </span>
          )}
        </div>

        <p className="mt-3 text-white-100">{edu.description}</p>
      </div>
    </div>
  </motion.div>
);

const Education = ({ darkMode }) => (
  <>
    <h2
      className={`font-black text-center mb-10 
        text-[30px] xs:text-[40px] sm:text-[50px] md:text-[60px] 
        ${darkMode ? 'text-white' : 'text-gray-900'}`}
    >
      Education
    </h2>

    <div className="grid md:grid-cols-2 gap-8">
      {education.map((edu, index) => (
        <EducationCard key={index} edu={edu} index={index} />
      ))}
    </div>
  </>
);

export default Education;
