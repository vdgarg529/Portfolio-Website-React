import { motion } from 'framer-motion';
import aboutPic from '../assets/about.jpg';

const About = ({ darkMode }) => {
  // Common colors
  const headingColor = darkMode ? 'text-white' : 'text-gray-900';
  const textColor = darkMode ? 'text-gray-300' : 'text-gray-700';
  const highlightColor = darkMode ? 'text-pink-400' : 'text-pink-600';
  const borderColor = darkMode ? 'border-pink-500' : 'border-pink-300';
  const hoverBorderColor = darkMode ? 'group-hover:border-purple-300' : 'group-hover:border-purple-400';

  return (
    <div>
      {/* Heading */}
      <h2
        className={`font-black mb-6 text-left text-[30px] xs:text-[40px] sm:text-[50px] md:text-[60px] ${headingColor}`}
      >
        About Me
      </h2>
      
      <div className="grid md:grid-cols-[60%_40%] gap-12 items-center">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="order-2 md:order-1 text-justify max-w-[750px]"
        >
          <p className={`mb-6 text-lg leading-relaxed ${textColor}`}>
            My journey into tech — especially computers — began the same way it does for many kids: through video games. 
            But even while I was busy racing in <span className="italic">NFS</span>, exploring <span className="italic">Vice City</span>, 
            or solving puzzles in <span className="italic">Prince of Persia</span>, there was always a part of me wondering, 
            <span className="italic"> “How does all of this actually work?”</span>
          </p>

          <p className={`mb-6 text-lg leading-relaxed ${textColor}`}>
            Things got more interesting when I was introduced to QBasic and early web development. 
            My very first website wasn’t anything spectacular, but seeing something I coded appear on the screen 
            was nothing short of magical.
          </p>

          <p className={`mb-6 text-lg leading-relaxed ${textColor}`}>
            That spark eventually led me to pursue a B.Tech in Computer Science, where I stumbled upon Machine Learning. 
            The idea that we could develop a car capable of driving entirely on its own — no driver, no intervention — 
            absolutely fascinated me. From that moment, I knew this was where I belonged.
          </p>

          <p className={`mb-6 text-lg leading-relaxed ${textColor}`}>
            Fast-forward to today, and I’m a professional ML/DL Developer specializing in Large Language Models 
            and Computer Vision. Along the way, I’ve also embraced my natural skill for teaching — sharing knowledge, 
            mentoring others, and giving back to the community. It’s something I plan to continue for the rest of my life, 
            because I believe in one simple motto: 
            <span className={`font-semibold ${highlightColor}`}> “Learn and pass on.”</span>
          </p>
        </motion.div>
        
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="order-1 md:order-2 flex justify-center"
        >
          <div className="relative group w-[220px] sm:w-[260px] md:w-[320px] transform transition duration-500 hover:rotate-1 hover:-translate-y-2">
            {/* Glowing gradient border */}
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 blur-xl opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500"></div>

            {/* Image container */}
            <div
              className={`relative aspect-[2/3] rounded-2xl shadow-2xl overflow-hidden 
              border-2 ${borderColor} ${hoverBorderColor} transition-all duration-500`}
            >
              <img
                src={aboutPic}
                alt="Vardan Garg"
                className="w-full h-full object-cover rounded-2xl transform transition duration-700 ease-in-out 
                  group-hover:scale-110 group-hover:brightness-110"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
