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
      <div>
        <h3 className="text-white font-bold text-xl">{edu.degree}</h3>
        <p className="text-secondary font-medium">{edu.school}</p>
        <p className="text-secondary text-sm mt-1">{edu.date}</p>
        <p className="mt-3 text-white-100">{edu.description}</p>
      </div>
    </div>
  </motion.div>
);

const Education = () => (
  <>
    <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] mb-10">
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