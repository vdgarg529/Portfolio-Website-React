// // src/components/Skills.jsx
// import { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   mainTabs,
//   techCategories,
//   technicalSkills,
//   codingProfiles,
//   achievements,
// } from "../constants/public_skills";

// // Star rating component
// const StarRating = ({ level, darkMode }) => {
//   return (
//     <div className="flex mt-1">
//       {[...Array(3)].map((_, i) => (
//         <span
//           key={i}
//           className={`text-lg ${
//             i < level
//               ? "text-yellow-500"
//               : darkMode
//               ? "text-gray-600"
//               : "text-gray-300"
//           }`}
//         >
//           ★
//         </span>
//       ))}
//     </div>
//   );
// };

// const Skills = ({ darkMode }) => {
//   const [activeMainTab, setActiveMainTab] = useState("Technical Skills");
//   const [activeTechCategory, setActiveTechCategory] = useState("Languages");

//   // Find the current category color
//   const currentCategory = techCategories.find(
//     (cat) => cat.name === activeTechCategory
//   );
//   const gradientClass = currentCategory
//     ? currentCategory.color
//     : "from-purple-500 to-pink-600";

//   // Get active main tab properties
//   const activeTab =
//     mainTabs.find((tab) => tab.name === activeMainTab) || mainTabs[0];

//   // Filter technical skills by category
//   const filteredSkills = technicalSkills.filter(
//     (skill) => skill.category === activeTechCategory
//   );

//   return (
//     <div className="px-4 py-8">
//       <h2
//         className={`font-black text-center mb-6 
//           text-[30px] xs:text-[40px] sm:text-[50px] md:text-[60px] 
//           ${darkMode ? "text-white" : "text-gray-900"}`}
//       >
//         Skills And Achievements
//       </h2>

//       {/* Main Tabs */}
//       <div className="flex flex-wrap justify-center gap-3 mb-10">
//         {mainTabs.map((tab) => (
//           <button
//             key={tab.name}
//             onClick={() => setActiveMainTab(tab.name)}
//             className={`relative px-5 py-2 text-sm sm:text-base font-medium rounded-full transition-all ${
//               activeMainTab === tab.name
//                 ? `bg-gradient-to-r ${tab.color} text-white`
//                 : darkMode
//                 ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             {tab.name}
//           </button>
//         ))}
//       </div>

//       {/* Technical Skills Section */}
//       {activeMainTab === "Technical Skills" && (
//         <div
//           className={`rounded-2xl overflow-hidden bg-gradient-to-r ${activeTab.color}`}
//         >
//           <div
//             className={`rounded-2xl p-6 ${
//               darkMode ? activeTab.darkBg : activeTab.bgColor
//             }`}
//           >
//             {/* Technical Skills Subcategories */}
//             <div
//               className={`rounded-xl p-4 mb-8 bg-gradient-to-r ${gradientClass}`}
//             >
//               <div className="flex flex-wrap justify-center gap-3">
//                 {techCategories.map(({ name }) => (
//                   <button
//                     key={name}
//                     onClick={() => setActiveTechCategory(name)}
//                     className={`relative px-4 py-2 text-sm sm:text-base font-medium rounded-full transition-all ${
//                       activeTechCategory === name
//                         ? "bg-white text-gray-900 shadow-lg"
//                         : "bg-black bg-opacity-20 text-white hover:bg-opacity-30"
//                     }`}
//                   >
//                     {name}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Skills Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
//               {filteredSkills.map((skill) => (
//                 <motion.div
//                   key={skill.name}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.3 }}
//                   className={`flex items-center p-4 rounded-xl ${
//                     darkMode
//                       ? "bg-gray-700 hover:bg-gray-600"
//                       : "bg-white hover:bg-gray-50"
//                   } shadow-md hover:shadow-lg transition-all`}
//                 >
//                   {/* Left Logo */}
//                   <div
//                     className={`w-16 h-16 rounded-full flex items-center justify-center mr-4 ${
//                       darkMode ? "bg-gray-600" : "bg-gray-100"
//                     }`}
//                   >
//                     {skill.icon ? (
//                       <img
//                         src={skill.icon}
//                         alt={skill.name}
//                         className="w-10 h-10 object-contain"
//                       />
//                     ) : (
//                       "💻"
//                     )}
//                   </div>

//                   {/* Right Content */}
//                   <div className="flex flex-col">
//                     <h3
//                       className={`font-bold ${
//                         darkMode ? "text-white" : "text-gray-800"
//                       }`}
//                     >
//                       {skill.name}
//                     </h3>
//                     <StarRating level={skill.level} darkMode={darkMode} />
//                     <div
//                       className={`text-xs mt-1 ${
//                         darkMode ? "text-gray-400" : "text-gray-500"
//                       }`}
//                     >
//                       {skill.level === 3
//                         ? "Advanced"
//                         : skill.level === 2
//                         ? "Intermediate"
//                         : "Beginner"}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Coding Profiles Section */}
//       {activeMainTab === "Coding Profiles" && (
//         <div
//           className={`rounded-2xl overflow-hidden bg-gradient-to-r ${activeTab.color}`}
//         >
//           <div
//             className={`rounded-2xl p-6 ${
//               darkMode ? activeTab.darkBg : activeTab.bgColor
//             }`}
//           >
//             <div className="max-w-5xl mx-auto">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {codingProfiles.map((profile) => (
//                   <motion.a
//                     key={profile.platform}
//                     href={profile.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.4 }}
//                     className={`flex flex-col p-5 rounded-xl shadow-lg transition-all hover:scale-[1.02] ${
//                       darkMode
//                         ? "bg-gray-700 hover:bg-gray-600"
//                         : "bg-white hover:bg-gray-50"
//                     }`}
//                   >
//                     <div className="flex items-center mb-4">
//                       <div className="w-12 h-12 mr-3 flex items-center justify-center">
//                         {profile.logo ? (
//                           <img
//                             src={profile.logo}
//                             alt={profile.platform}
//                             className="w-10 h-10 object-contain"
//                           />
//                         ) : (
//                           "👨‍💻"
//                         )}
//                       </div>
//                       <div>
//                         <h3
//                           className={`font-bold text-xl ${
//                             darkMode ? "text-white" : "text-gray-900"
//                           }`}
//                         >
//                           {profile.platform}
//                         </h3>
//                         <p
//                           className={`text-sm ${
//                             darkMode ? "text-gray-300" : "text-gray-600"
//                           }`}
//                         >
//                           @{profile.username}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4 mt-2">
//                       <div className="flex items-center">
//                         <div
//                           className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
//                             darkMode ? "bg-gray-600" : "bg-gray-100"
//                           }`}
//                         >
//                           <span className="text-lg">❓</span>
//                         </div>
//                         <div>
//                           <div
//                             className={`text-xs ${
//                               darkMode ? "text-gray-400" : "text-gray-500"
//                             }`}
//                           >
//                             Solved
//                           </div>
//                           <div
//                             className={`font-bold ${
//                               darkMode ? "text-white" : "text-gray-900"
//                             }`}
//                           >
//                             {profile.solved}+
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex items-center">
//                         <div
//                           className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
//                             darkMode ? "bg-gray-600" : "bg-gray-100"
//                           }`}
//                         >
//                           {profile.ratingIcon && (
//                             <img
//                               src={profile.ratingIcon}
//                               alt="Rating"
//                               className="w-6 h-6 object-contain"
//                             />
//                           )}
//                         </div>
//                         <div>
//                           <div
//                             className={`text-xs ${
//                               darkMode ? "text-gray-400" : "text-gray-500"
//                             }`}
//                           >
//                             Rating
//                           </div>
//                           <div
//                             className={`font-bold ${
//                               darkMode ? "text-white" : "text-gray-900"
//                             }`}
//                           >
//                             {profile.rating}{" "}
//                             <span className="text-xs">
//                               ({profile.ratingTitle})
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="mt-4 flex justify-center">
//                       <span
//                         className={`text-xs px-3 py-1 rounded-full ${
//                           darkMode
//                             ? "bg-gray-800 text-cyan-400"
//                             : "bg-cyan-100 text-cyan-700"
//                         }`}
//                       >
//                         View Profile →
//                       </span>
//                     </div>
//                   </motion.a>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Achievements Section */}
//       {activeMainTab === "Achievements" && (
//         <div
//           className={`rounded-2xl overflow-hidden bg-gradient-to-r ${activeTab.color}`}
//         >
//           <div
//             className={`rounded-2xl p-6 ${
//               darkMode ? activeTab.darkBg : activeTab.bgColor
//             }`}
//           >
//             <div className="max-w-3xl mx-auto">
//               <ul className="space-y-4">
//                 {achievements.map((achievement, index) => (
//                   <motion.li
//                     key={index}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.4, delay: index * 0.1 }}
//                     className={`flex items-start p-4 rounded-xl ${
//                       darkMode ? "bg-gray-700" : "bg-white shadow"
//                     }`}
//                   >
//                     <div
//                       className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
//                         darkMode ? "bg-gray-600" : "bg-amber-100"
//                       }`}
//                     >
//                       {index === 0
//                         ? "🥇"
//                         : index === 1
//                         ? "🥈"
//                         : index === 2
//                         ? "🥉"
//                         : "🏆"}
//                     </div>
//                     <span
//                       className={`font-medium ${
//                         darkMode ? "text-white" : "text-gray-800"
//                       }`}
//                     >
//                       {achievement}
//                     </span>
//                   </motion.li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Skills;






// src/components/Skills.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  mainTabs,
  techCategories,
  technicalSkills,
  codingProfiles,
  achievements,
} from "../constants/public_skills";

import codolioProfileCard from '../assets/codolio/profileCard.png';
import codolioDevCard from '../assets/codolio/devCard.png';


// Star rating component
const StarRating = ({ level, darkMode }) => {
  return (
    <div className="flex mt-1">
      {[...Array(3)].map((_, i) => (
        <span
          key={i}
          className={`text-lg ${
            i < level
              ? "text-yellow-500"
              : darkMode
              ? "text-gray-600"
              : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const Skills = ({ darkMode }) => {
  const [activeMainTab, setActiveMainTab] = useState("Technical Skills");
  const [activeTechCategory, setActiveTechCategory] = useState("Languages");
  const [isFlipped, setIsFlipped] = useState(false);

  // Find the current category color
  const currentCategory = techCategories.find(
    (cat) => cat.name === activeTechCategory
  );
  const gradientClass = currentCategory
    ? currentCategory.color
    : "from-purple-500 to-pink-600";

  // Get active main tab properties
  const activeTab =
    mainTabs.find((tab) => tab.name === activeMainTab) || mainTabs[0];

  // Filter technical skills by category
  const filteredSkills = technicalSkills.filter(
    (skill) => skill.category === activeTechCategory
  );

  return (
    <div className="px-4 py-8">
      <h2
        className={`font-black text-center mb-6 
          text-[30px] xs:text-[40px] sm:text-[50px] md:text-[60px] 
          ${darkMode ? "text-white" : "text-gray-900"}`}
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
                ? `bg-gradient-to-r ${tab.color} text-white`
                : darkMode
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Technical Skills Section */}
      {activeMainTab === "Technical Skills" && (
        <div
          className={`rounded-2xl overflow-hidden bg-gradient-to-r ${activeTab.color}`}
        >
          <div
            className={`rounded-2xl p-6 ${
              darkMode ? activeTab.darkBg : activeTab.bgColor
            }`}
          >
            {/* Technical Skills Subcategories */}
            <div
              className={`rounded-xl p-4 mb-8 bg-gradient-to-r ${gradientClass}`}
            >
              <div className="flex flex-wrap justify-center gap-3">
                {techCategories.map(({ name }) => (
                  <button
                    key={name}
                    onClick={() => setActiveTechCategory(name)}
                    className={`relative px-4 py-2 text-sm sm:text-base font-medium rounded-full transition-all ${
                      activeTechCategory === name
                        ? "bg-white text-gray-900 shadow-lg"
                        : "bg-black bg-opacity-20 text-white hover:bg-opacity-30"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center p-4 rounded-xl ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-white hover:bg-gray-50"
                  } shadow-md hover:shadow-lg transition-all`}
                >
                  {/* Left Logo */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mr-4 ${
                      darkMode ? "bg-gray-600" : "bg-gray-100"
                    }`}
                  >
                    {skill.icon ? (
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-10 h-10 object-contain"
                      />
                    ) : (
                      "💻"
                    )}
                  </div>

                  {/* Right Content */}
                  <div className="flex flex-col">
                    <h3
                      className={`font-bold ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {skill.name}
                    </h3>
                    <StarRating level={skill.level} darkMode={darkMode} />
                    <div
                      className={`text-xs mt-1 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {skill.level === 3
                        ? "Advanced"
                        : skill.level === 2
                        ? "Intermediate"
                        : "Beginner"}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Coding Profiles Section */}
      {activeMainTab === "Coding Profiles" && (
        <div
          className={`rounded-2xl overflow-hidden bg-gradient-to-r ${activeTab.color}`}
        >
          <div
            className={`rounded-2xl p-6 ${
              darkMode ? activeTab.darkBg : activeTab.bgColor
            }`}
          >
            <div className="max-w-6xl mx-auto transform scale-90 origin-top">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
          {/* LEFT: Codolio Flip Card */}
          <motion.div
            className="relative w-full max-w-sm aspect-[3/4] cursor-pointer [perspective:1000px] mx-auto"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            onClick={() =>
              window.open("https://codolio.com/profile/vdgarg529/card", "_blank")
            }
          >
            <motion.div
              className="absolute w-full h-full rounded-2xl shadow-xl"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front Image */}
              <div
                className="absolute w-full h-full flex items-center justify-center rounded-2xl overflow-hidden bg-gray-900"
                style={{ backfaceVisibility: "hidden" }}
              >
                <img
                  src={codolioProfileCard}
                  alt="Codolio Front"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Back Image */}
              <div
                className="absolute w-full h-full flex items-center justify-center rounded-2xl overflow-hidden bg-gray-900"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                <img
                  src={codolioDevCard}
                  alt="Codolio Back"
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>



              {/* RIGHT: Profiles Stack */}
              <div className="space-y-6">
                {codingProfiles.map((profile) => (
                  <motion.a
                    key={profile.platform}
                    href={profile.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`flex items-center p-5 rounded-xl shadow-lg transition-all hover:scale-[1.02] ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    {/* Logo */}
                    <div className="w-12 h-12 mr-4 flex items-center justify-center">
                      {profile.logo ? (
                        <img
                          src={profile.logo}
                          alt={profile.platform}
                          className="w-10 h-10 object-contain"
                        />
                      ) : (
                        "👨‍💻"
                      )}
                    </div>

                    {/* Content */}
                    <div>
                      <h3
                        className={`font-bold text-lg ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {profile.platform}
                      </h3>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        @{profile.username} | {profile.solved}+ problems | Rating{" "}
                        {profile.rating}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
         </div>
      )}

      {/* Achievements Section */}
      {activeMainTab === "Achievements" && (
        <div
          className={`rounded-2xl overflow-hidden bg-gradient-to-r ${activeTab.color}`}
        >
          <div
            className={`rounded-2xl p-6 ${
              darkMode ? activeTab.darkBg : activeTab.bgColor
            }`}
          >
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`flex items-start p-4 rounded-xl ${
                      darkMode ? "bg-gray-700" : "bg-white shadow"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                        darkMode ? "bg-gray-600" : "bg-amber-100"
                      }`}
                    >
                      {index === 0
                        ? "🥇"
                        : index === 1
                        ? "🥈"
                        : index === 2
                        ? "🥉"
                        : "🏆"}
                    </div>
                    <span
                      className={`font-medium ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
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
