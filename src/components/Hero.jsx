// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiDownload, HiMail } from 'react-icons/hi';
import profilePic from '../assets/profile.jpg';

const qualities = [
  { emoji: "🚀", text: "Passionate Problem Solver" },
  { emoji: "🧠", text: "Lifelong Learner" },
  { emoji: "💻", text: "Tech Enthusiast" },
  { emoji: "🗣️", text: "Public Speaker" },
  { emoji: "🎙️", text: "Orator" },
  { emoji: "🤝", text: "Negotiator" },
  { emoji: "💬", text: "Excellent Communicator" },
];

const Hero = ({ darkMode }) => {
  const messages = [
    "Welcome to my Portfolio!",
    "Let's build something amazing 🚀",
    "Innovative solutions for complex problems",
    "Technology + Creativity = Magic ✨"
  ];
  
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  // For qualities animation
  const [qualityIndex, setQualityIndex] = useState(0);

  useEffect(() => {
    const currentMessage = messages[currentMessageIndex];
    
    const handleTyping = () => {
      if (isDeleting) {
        setDisplayText(currentMessage.substring(0, displayText.length - 1));
      } else {
        setDisplayText(currentMessage.substring(0, displayText.length + 1));
      }
      
      if (!isDeleting && displayText === currentMessage) {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
      
      if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        return;
      }
      
      setTypingSpeed(isDeleting ? 75 : 150);
    };
    
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentMessageIndex, messages, typingSpeed]);

  // Cycle qualities every 4 seconds
  useEffect(() => {
    const qualityTimer = setInterval(() => {
      setQualityIndex((prev) => (prev + 1) % qualities.length);
    }, 4000);
    return () => clearInterval(qualityTimer);
  }, []);

  return (
    <section 
      id="hero" 
      className={`min-h-screen flex items-center pt-16 px-4 sm:px-8 ${
        darkMode 
          ? 'bg-gradient-to-br from-[#050816] via-[#0d0b20] to-[#090325]' 
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Introduction */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:pr-12"
        >
          <div className="flex items-center mb-4">
            <motion.span 
              className="text-4xl md:text-5xl lg:text-6xl mr-4"
              animate={{ 
                rotate: [0, 15, -10, 15, 0],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              👋
            </motion.span>
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Hi, I'm
            </h1>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
              Vardan Garg
            </span>
          </h1>

          {/* Static Description below name */}
          <p className={`mb-10 text-md sm:text-lg leading-relaxed text-justify ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <b><i>I am an ardent problem solver, fueled by an insatiable curiosity and a relentless pursuit of innovative solutions. As a lifelong learner, I continually broaden my intellectual horizons, embracing new knowledge with open arms. Deeply passionate about technology, I immerse myself in the ever-evolving digital landscape, staying ahead of the curve. Gifted with oratory prowess and public speaking finesse, I captivate audiences with eloquence and persuasive articulation. Skilled in negotiation, I adeptly navigate complex discussions, forging consensus and building bridges where others see walls. Above all, I pride myself on being an exceptional communicator, able to convey ideas with clarity and conviction, ensuring that my message resonates long after the conversation ends.
            </i></b>
          </p>

          {/* Animated Quality */}
          <div className="h-14 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={qualityIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className={`inline-flex items-center gap-3 text-xl sm:text-2xl font-semibold rounded-full px-6 py-3 select-none cursor-default ${
                  darkMode
                    ? "bg-purple-900/70 text-purple-300 shadow-lg"
                    : "bg-purple-100/90 text-purple-700 shadow-md"
                }`}
              >
                <span className="text-3xl">{qualities[qualityIndex].emoji}</span>
                <span>{qualities[qualityIndex].text}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
        
        {/* Right Column - Profile Image and Typing */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center justify-center"
        >
          {/* Profile Image with Hover Effects */}
          <div className="relative mb-10">
            <div className={`absolute -inset-4 rounded-full ${
              darkMode 
                ? 'bg-gradient-to-r from-purple-500 to-pink-600' 
                : 'bg-gradient-to-r from-purple-400 to-pink-500'
            } blur-xl opacity-30 animate-pulse`}></div>
            
            <motion.div 
              className={`relative rounded-full overflow-hidden w-64 h-64 sm:w-80 sm:h-80 border-4 ${
                darkMode ? 'border-purple-500/30' : 'border-purple-300'
              } shadow-2xl`}
              whileHover={{ 
                scale: 1.2,
                rotate: 10,
                transition: { 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 150,
                  damping: 10
                }
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={profilePic} 
                alt="Vardan Garg" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
            </motion.div>
          </div>
          
          {/* Typing Animation */}
          <div className={`py-3 px-6 rounded-full ${
            darkMode ? 'bg-[#151030]' : 'bg-purple-50'
          } mb-8`}>
            <div className="flex items-center justify-center">
              <div className={`text-lg md:text-xl font-bold min-h-[28px] ${
                darkMode ? 'text-purple-400' : 'text-purple-600'
              }`}>
                {displayText}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="ml-1"
                >
                  |
                </motion.span>
              </div>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium flex items-center gap-2 shadow-lg"
            >
              <HiDownload size={20} />
              <a
                href="src/assets/resume.pdf"
                download="Resume.pdf"
              >
                Download CV
              </a>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 ${
                darkMode 
                  ? 'border-2 border-purple-500 text-white hover:bg-purple-500/10' 
                  : 'border-2 border-purple-600 text-purple-600 hover:bg-purple-100'
              }`}
            >
              <HiMail size={20} />
              Contact Me
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
