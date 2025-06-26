import { motion } from 'framer-motion';
import aboutPic from '../assets/about.jpg';

const About = () => {
  const skills = [
    'JavaScript', 'React', 'Node.js', 'Tailwind CSS', 
    'Express', 'MongoDB', 'Git', 'Responsive Design',
    'TypeScript', 'Redux', 'Next.js', 'Firebase'
  ];

  return (
    <div>
      <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] mb-6">
        About Me
      </h2>
      
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="order-2 md:order-1"
        >
          <p className="text-gray-300 mb-6 text-lg">
            I'm a passionate Full Stack Developer with a strong focus on creating modern, 
            user-friendly web applications. With expertise in both frontend and backend technologies, 
            I bring ideas to life through clean, efficient code and intuitive user interfaces.
          </p>
          <p className="text-gray-300 mb-8 text-lg">
            My journey in web development started 3 years ago, and since then I've worked on various projects 
            ranging from e-commerce platforms to SaaS applications. I'm constantly learning new technologies 
            and methodologies to stay at the forefront of web development.
          </p>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-purple-400">My Skills</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="px-4 py-2 bg-tertiary rounded-full text-sm"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
        
        <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1.4 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="order-1 md:order-2 flex justify-center"
>
  <div className="relative group w-[160px] sm:w-[180px] md:w-[200px]">
    {/* Glowing gradient border */}
    <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 blur-lg opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"></div>

    {/* Image container */}
    <div className="relative aspect-[2/3] border-2 border-dashed rounded-2xl shadow-xl bg-white border-pink-300 overflow-hidden">
      <img
        src={aboutPic}
        alt="Vardan Garg"
        className="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-105"
      />
    </div>
  </div>
</motion.div>



      </div>
    </div>
  );
};

export default About;