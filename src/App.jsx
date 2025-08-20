// // src/App.jsx
// import { useState, useEffect } from 'react';
// import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// import About from './components/About';
// import Experience from './components/Experience';
// import Education from './components/Education';
// import Projects from './components/Projects';
// import Contact from './components/Contact';
// import Skills from './components/Skills';
// import Footer from './components/Footer';

// const App = () => {
//   const [darkMode, setDarkMode] = useState(true);
  
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [darkMode]);

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${
//       darkMode ? 'dark bg-[#050816] text-white' : 'bg-gray-50 text-gray-900'
//     }`}>
//       <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
//       <main>
//         <section id="hero">
//           <Hero darkMode={darkMode} />
//         </section>
        
//         <section id="about" className="py-20 px-4 sm:px-8">
//           <div className="max-w-7xl mx-auto">
//             <About darkMode={darkMode} />
//           </div>
//         </section>
        
//         <section id="skills" className={`py-20 px-4 sm:px-8 ${
//           darkMode ? 'bg-[#090325]' : 'bg-gray-100'
//         }`}>
//           <div className="max-w-7xl mx-auto">
//             <Skills darkMode={darkMode} />
//           </div>
//         </section>
        
//         <section id="experience" className="py-20 px-4 sm:px-8">
//           <div className="max-w-7xl mx-auto">
//             <Experience darkMode={darkMode} />
//           </div>
//         </section>
        
//         <section id="education" className={`py-20 px-4 sm:px-8 ${
//           darkMode ? 'bg-[#090325]' : 'bg-gray-100'
//         }`}>
//           <div className="max-w-7xl mx-auto">
//             <Education darkMode={darkMode} />
//           </div>
//         </section>
        
//         <section id="projects" className="py-20 px-4 sm:px-8">
//           <div className="max-w-7xl mx-auto">
//             <Projects darkMode={darkMode} />
//           </div>
//         </section>
        
//         <section id="contact" className={`py-20 px-4 sm:px-8 ${
//           darkMode ? 'bg-[#090325]' : 'bg-gray-100'
//         }`}>
//           <div className="max-w-7xl mx-auto">
//             <Contact darkMode={darkMode} />
//           </div>
//         </section>
//       </main>
      
//       <Footer darkMode={darkMode} />
//     </div>
//   );
// };

// export default App;








// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Skills from './components/Skills';
import Footer from './components/Footer';
import Studio from './components/Studio';
import Blog from './components/Blog';
import Notes from './components/Notes';

const MainPage = ({ darkMode }) => (
  <main>
    <section id="hero">
      <Hero darkMode={darkMode} />
    </section>
    <section id="about" className="py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <About darkMode={darkMode} />
      </div>
    </section>
    <section id="skills" className={`py-20 px-4 sm:px-8 ${
      darkMode ? 'bg-[#090325]' : 'bg-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto">
        <Skills darkMode={darkMode} />
      </div>
    </section>
    <section id="experience" className="py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <Experience darkMode={darkMode} />
      </div>
    </section>
    <section id="education" className={`py-20 px-4 sm:px-8 ${
      darkMode ? 'bg-[#090325]' : 'bg-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto">
        <Education darkMode={darkMode} />
      </div>
    </section>
    <section id="projects" className="py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <Projects darkMode={darkMode} />
      </div>
    </section>
    <section id="contact" className={`py-20 px-4 sm:px-8 ${
      darkMode ? 'bg-[#090325]' : 'bg-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto">
        <Contact darkMode={darkMode} />
      </div>
    </section>
  </main>
);

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'dark bg-[#050816] text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <Routes>
          <Route path="/" element={<MainPage darkMode={darkMode} />} />
          <Route path="/studio" element={<Studio darkMode={darkMode} />} />
          <Route path="/blog" element={<Blog darkMode={darkMode} />} />
          <Route path="/notes" element={<Notes darkMode={darkMode} />} />
        </Routes>
        
        <Footer darkMode={darkMode} />
      </div>
    </Router>
  );
};

export default App;
