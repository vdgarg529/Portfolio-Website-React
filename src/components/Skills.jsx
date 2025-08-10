// src/components/Skills.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

// Main tabs with colors
const mainTabs = [
  { 
    name: 'Technical Skills', 
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
    darkBg: 'bg-gray-800'
  },
  { 
    name: 'Coding Profiles', 
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    darkBg: 'bg-gray-800'
  },
  { 
    name: 'Achievements', 
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50',
    darkBg: 'bg-gray-800'
  },
];

// Technical Skills subcategories
const techCategories = [
  { name: 'Languages', color: 'from-blue-500 to-indigo-600' },
  { name: 'Frameworks & Libraries', color: 'from-purple-500 to-pink-600' },
  { name: 'Databases', color: 'from-amber-500 to-orange-600' },
  { name: 'Dev Tools', color: 'from-green-500 to-teal-600' },
  { name: 'General Tools', color: 'from-cyan-500 to-blue-600' },
];

// Technical skills data with proficiency levels (1-3 stars)
const technicalSkills = [
  { name: 'C', level: 3, category: 'Languages' },
  { name: 'C++', level: 3, category: 'Languages' },
  { name: 'Python', level: 3, category: 'Languages' },
  { name: 'Java', level: 3, category: 'Languages' },
  { name: 'JavaScript', level: 3, category: 'Languages' },
  { name: 'HTML', level: 3, category: 'Languages' },
  { name: 'CSS', level: 3, category: 'Languages' },
  { name: 'TypeScript', level: 2, category: 'Languages' },
  
  { name: 'Langchain', level: 3, category: 'Frameworks & Libraries' },
  { name: 'Hugging Face', level: 3, category: 'Frameworks & Libraries' },
  { name: 'React', level: 3, category: 'Frameworks & Libraries' },
  { name: 'Node.js', level: 3, category: 'Frameworks & Libraries' },
  { name: 'Express', level: 2, category: 'Frameworks & Libraries' },
  { name: 'Flask', level: 2, category: 'Frameworks & Libraries' },
  { name: 'TensorFlow', level: 3, category: 'Frameworks & Libraries' },
  { name: 'PyTorch', level: 3, category: 'Frameworks & Libraries' },
  { name: 'Keras', level: 3, category: 'Frameworks & Libraries' },
  { name: 'Scikit-Learn', level: 3, category: 'Frameworks & Libraries' },
  { name: 'OpenCV', level: 3, category: 'Frameworks & Libraries' },
  { name: 'OpenAI Gym', level: 3, category: 'Frameworks & Libraries' },
  { name: 'Pandas', level: 3, category: 'Frameworks & Libraries' },
  { name: 'NumPy', level: 3, category: 'Frameworks & Libraries' },
  { name: 'Matplotlib', level: 3, category: 'Frameworks & Libraries' },
  { name: 'SciPy', level: 3, category: 'Frameworks & Libraries' },
  { name: 'Pygame', level: 3, category: 'Frameworks & Libraries' },
  
  { name: 'MongoDB', level: 2, category: 'Databases' },
  { name: 'MySQL', level: 2, category: 'Databases' },
  
  { name: 'Git', level: 3, category: 'Dev Tools' },
  { name: 'GitHub', level: 3, category: 'Dev Tools' },
  { name: 'Shell Scripting', level: 3, category: 'Dev Tools' },
  { name: 'Anaconda', level: 3, category: 'Dev Tools' },
  
  { name: 'OBS Studio', level: 3, category: 'General Tools' },
  { name: 'Camtasia', level: 3, category: 'General Tools' },
  { name: 'Microsoft Office', level: 3, category: 'General Tools' },
  { name: 'Google Workspace', level: 3, category: 'General Tools' },
];

// Coding profiles data with additional details
const codingProfiles = [
  { 
    platform: 'LeetCode', 
    username: 'vdgarg529', 
    link: 'https://leetcode.com/vdgarg529/', 
    solved: 500,
    rating: 1835,
    ratingTitle: 'Knight',
    ratingIcon: '/assets/coding/rating-knight.png' // Add rating icons too
  },
  { 
    platform: 'Codeforces', 
    username: 'vdgarg529', 
    link: 'https://codeforces.com/profile/vdgarg529', 
    solved: 350,
    rating: 1438,
    ratingTitle: 'Specialist',
    ratingIcon: '/assets/coding/rating-specialist.png'
  },
  { 
    platform: 'GeeksForGeeks', 
    username: 'vdgarg529', 
    link: 'https://auth.geeksforgeeks.org/user/vdgarg529', 
    solved: 200,
    rating: 97,
    ratingTitle: 'AIR',
    ratingIcon: '/assets/coding/rating-air.png'
  },
  { 
    platform: 'CodeChef', 
    username: 'vdgarg529', 
    link: 'https://www.codechef.com/users/vdgarg529', 
    solved: 300,
    rating: 1974,
    ratingTitle: '5-star',
    ratingIcon: '/assets/coding/rating-5star.png'
  },
];

// Achievements data
const achievements = [
  "AIR 97 in CodeKaze Season 5 by Coding Ninjas",
  "Global Rank 121 in LeetCode Weekly Contest 382",
  "Specialist (1438) on Codeforces",
  "Knight (1835) on LeetCode",
  "5-star (1974) on CodeChef",
  "Secured 2nd position in coding competition at college fest",
  "Solved 500+ problems across all coding platforms"
];

// Star rating component
const StarRating = ({ level, darkMode }) => {
  return (
    <div className="flex justify-center mt-1">
      {[...Array(3)].map((_, i) => (
        <span 
          key={i} 
          className={`text-lg ${i < level ? 'text-yellow-500' : darkMode ? 'text-gray-600' : 'text-gray-300'}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const Skills = ({ darkMode }) => {
  const [activeMainTab, setActiveMainTab] = useState('Technical Skills');
  const [activeTechCategory, setActiveTechCategory] = useState('Languages');

  // Find the current category color
  const currentCategory = techCategories.find(cat => cat.name === activeTechCategory);
  const gradientClass = currentCategory ? currentCategory.color : 'from-purple-500 to-pink-600';
  
  // Get active main tab properties
  const activeTab = mainTabs.find(tab => tab.name === activeMainTab) || mainTabs[0];

  // Filter technical skills by category
  const filteredSkills = technicalSkills.filter(skill => skill.category === activeTechCategory);

  // Helper function to get skill icon path
  const getSkillIcon = (skillName) => {
    // Convert to lowercase and replace special characters
    const fileName = skillName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace('++', 'pp')
      .replace('.', '');
    return `src/assets/skills/${fileName}.png`;
  };

  // Helper function to get coding platform icon
  const getPlatformIcon = (platform) => {
    return `src/assets/coding/${platform.toLowerCase()}.png`;
  };

  return (
    <div className="px-4 py-8">
      <h2
        className={`font-black text-center mb-6 
          text-[30px] xs:text-[40px] sm:text-[50px] md:text-[60px] 
          ${darkMode ? 'text-white' : 'text-gray-900'}`}
      >
        Skills And Achievements
      </h2>

      {/* Main Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {mainTabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveMainTab(tab.name)}
            className={`relative px-5 py-2 text-sm sm:text-base font-medium rounded-full transition-all ${
              activeMainTab === tab.name
                ? darkMode
                  ? `bg-gradient-to-r ${tab.color} text-white`
                  : `bg-gradient-to-r ${tab.color} text-white`
                : darkMode
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Technical Skills Section */}
      {activeMainTab === 'Technical Skills' && (
        <div className={`rounded-2xl overflow-hidden bg-gradient-to-r ${activeTab.color}`}>
          <div className={`rounded-2xl p-6 ${darkMode ? activeTab.darkBg : activeTab.bgColor}`}>
            {/* Technical Skills Subcategories */}
            <div className={`rounded-xl p-4 mb-8 bg-gradient-to-r ${gradientClass}`}>
              <div className="flex flex-wrap justify-center gap-3">
                {techCategories.map(({ name }) => (
                  <button
                    key={name}
                    onClick={() => setActiveTechCategory(name)}
                    className={`relative px-4 py-2 text-sm sm:text-base font-medium rounded-full transition-all ${
                      activeTechCategory === name
                        ? 'bg-white text-gray-900 shadow-lg'
                        : 'bg-black bg-opacity-20 text-white hover:bg-opacity-30'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Skills Grid with real icons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex flex-col items-center p-4 rounded-xl ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-white hover:bg-gray-50'
                  } shadow-md hover:shadow-lg transition-all`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-100'
                  }`}>
                    <img 
                      src={getSkillIcon(skill.name)} 
                      alt={skill.name}
                      className="w-10 h-10 object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.parentNode.innerHTML = '💻';
                      }}
                    />
                  </div>
                  <h3 className={`font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {skill.name}
                  </h3>
                  <StarRating level={skill.level} darkMode={darkMode} />
                  <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {skill.level === 3 ? 'Advanced' : 
                     skill.level === 2 ? 'Intermediate' : 'Beginner'}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Coding Profiles Section */}
      {activeMainTab === 'Coding Profiles' && (
        <div className={`rounded-2xl overflow-hidden bg-gradient-to-r ${activeTab.color}`}>
          <div className={`rounded-2xl p-6 ${darkMode ? activeTab.darkBg : activeTab.bgColor}`}>
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {codingProfiles.map((profile) => (
                  <motion.a
                    key={profile.platform}
                    href={profile.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`flex flex-col p-5 rounded-xl shadow-lg transition-all hover:scale-[1.02] ${
                      darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 mr-3 flex items-center justify-center">
                        <img 
                          src={getPlatformIcon(profile.platform)} 
                          alt={profile.platform}
                          className="w-10 h-10 object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.parentNode.innerHTML = '👨‍💻';
                          }}
                        />
                      </div>
                      <div>
                        <h3 className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {profile.platform}
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          @{profile.username}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                          darkMode ? 'bg-gray-600' : 'bg-gray-100'
                        }`}>
                          <span className="text-lg">❓</span>
                        </div>
                        <div>
                          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Solved
                          </div>
                          <div className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {profile.solved}+
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                          darkMode ? 'bg-gray-600' : 'bg-gray-100'
                        }`}>
                          <img 
                            src={profile.ratingIcon} 
                            alt="Rating"
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                        <div>
                          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Rating
                          </div>
                          <div className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {profile.rating} <span className="text-xs">({profile.ratingTitle})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-center">
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        darkMode ? 'bg-gray-800 text-cyan-400' : 'bg-cyan-100 text-cyan-700'
                      }`}>
                        View Profile →
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Achievements Section */}
      {activeMainTab === 'Achievements' && (
        <div className={`rounded-2xl overflow-hidden bg-gradient-to-r ${activeTab.color}`}>
          <div className={`rounded-2xl p-6 ${darkMode ? activeTab.darkBg : activeTab.bgColor}`}>
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`flex items-start p-4 rounded-xl ${
                      darkMode ? 'bg-gray-700' : 'bg-white shadow'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      darkMode ? 'bg-gray-600' : 'bg-amber-100'
                    }`}>
                      {index === 0 ? '🥇' : 
                       index === 1 ? '🥈' : 
                       index === 2 ? '🥉' : '🏆'}
                    </div>
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {achievement}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;