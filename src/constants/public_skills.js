// src/constants/public_skills.js

// ✅ Language Logos
import cLogo from "../assets/skills/c.png";
import cppLogo from "../assets/skills/cpp.png";
import pythonLogo from "../assets/skills/python.png";
import javaLogo from "../assets/skills/java.png";
import jsLogo from "../assets/skills/javascript.png";
import htmlLogo from "../assets/skills/html.png";
import cssLogo from "../assets/skills/css.png";
import tsLogo from "../assets/skills/typescript.png";

// ✅ Frameworks & Libraries Logos
import reactLogo from "../assets/skills/react.png";
import nodeLogo from "../assets/skills/nodejs.png";
import expressLogo from "../assets/skills/express.png";
import flaskLogo from "../assets/skills/flask.png";
import tensorflowLogo from "../assets/skills/tensorflow.png";
import pytorchLogo from "../assets/skills/pytorch.png";
import kerasLogo from "../assets/skills/keras.png";
import sklearnLogo from "../assets/skills/sklearn.png";
import opencvLogo from "../assets/skills/opencv.png";
import pandasLogo from "../assets/skills/pandas.png";
import numpyLogo from "../assets/skills/numpy.png";
import matplotlibLogo from "../assets/skills/matplotlib.png";
import scipyLogo from "../assets/skills/scipy.png";

// ✅ Databases Logos
import mongodbLogo from "../assets/skills/mongodb.png";
import mysqlLogo from "../assets/skills/mysql.png";

// ✅ Dev Tools Logos
import gitLogo from "../assets/skills/git.png";
import githubLogo from "../assets/skills/github.png";
import shellLogo from "../assets/skills/shell.png";
import anacondaLogo from "../assets/skills/anaconda.png";

// ✅ General Tools Logos
import obsLogo from "../assets/skills/obs-studio.png";
import camtasiaLogo from "../assets/skills/camtasia.png";
import officeLogo from "../assets/skills/msoffice.png";
import gworkspaceLogo from "../assets/skills/google-workspace.png";

// ✅ Coding Platforms Logos
import leetcodeLogo from "../assets/coding/leetcode.png";
import codeforcesLogo from "../assets/coding/codeforces.png";
import gfgLogo from "../assets/coding/gfg.png";
import codechefLogo from "../assets/coding/codechef.png";

// ✅ Rating Icons
import ratingKnight from "../assets/coding/leetcode.png";
import ratingSpecialist from "../assets/coding/leetcode.png";
import ratingAir from "../assets/coding/leetcode.png";
import rating5star from "../assets/coding/leetcode.png";

// -----------------------------
// 📌 Main Tabs
// -----------------------------
export const mainTabs = [
  {
    name: "Technical Skills",
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    darkBg: "bg-gray-800",
  },
  {
    name: "Coding Profiles",
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    darkBg: "bg-gray-800",
  },
  {
    name: "Achievements",
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
    darkBg: "bg-gray-800",
  },
];

// -----------------------------
// 📌 Technical Skills Categories
// -----------------------------
export const techCategories = [
  { name: "Languages", color: "from-blue-500 to-indigo-600" },
  { name: "Frameworks & Libraries", color: "from-purple-500 to-pink-600" },
  { name: "Databases", color: "from-amber-500 to-orange-600" },
  { name: "Dev Tools", color: "from-green-500 to-teal-600" },
  { name: "General Tools", color: "from-cyan-500 to-blue-600" },
];

// -----------------------------
// 📌 Technical Skills
// -----------------------------
export const technicalSkills = [
  // Languages
  { name: "C", level: 3, category: "Languages", icon: cLogo },
  { name: "C++", level: 3, category: "Languages", icon: cppLogo },
  { name: "Python", level: 3, category: "Languages", icon: pythonLogo },
  { name: "Java", level: 3, category: "Languages", icon: javaLogo },
  { name: "JavaScript", level: 3, category: "Languages", icon: jsLogo },
  { name: "HTML", level: 3, category: "Languages", icon: htmlLogo },
  { name: "CSS", level: 3, category: "Languages", icon: cssLogo },
  { name: "TypeScript", level: 2, category: "Languages", icon: tsLogo },

  // Frameworks & Libraries
  { name: "React", level: 3, category: "Frameworks & Libraries", icon: reactLogo },
  { name: "Node.js", level: 3, category: "Frameworks & Libraries", icon: nodeLogo },
  { name: "Express", level: 2, category: "Frameworks & Libraries", icon: expressLogo },
  { name: "Flask", level: 2, category: "Frameworks & Libraries", icon: flaskLogo },
  { name: "TensorFlow", level: 3, category: "Frameworks & Libraries", icon: tensorflowLogo },
  { name: "PyTorch", level: 3, category: "Frameworks & Libraries", icon: pytorchLogo },
  { name: "Keras", level: 3, category: "Frameworks & Libraries", icon: kerasLogo },
  { name: "Scikit-Learn", level: 3, category: "Frameworks & Libraries", icon: sklearnLogo },
  { name: "OpenCV", level: 3, category: "Frameworks & Libraries", icon: opencvLogo },
  { name: "Pandas", level: 3, category: "Frameworks & Libraries", icon: pandasLogo },
  { name: "NumPy", level: 3, category: "Frameworks & Libraries", icon: numpyLogo },
  { name: "Matplotlib", level: 3, category: "Frameworks & Libraries", icon: matplotlibLogo },
  { name: "SciPy", level: 3, category: "Frameworks & Libraries", icon: scipyLogo },

  // Databases
  { name: "MongoDB", level: 2, category: "Databases", icon: mongodbLogo },
  { name: "MySQL", level: 2, category: "Databases", icon: mysqlLogo },

  // Dev Tools
  { name: "Git", level: 3, category: "Dev Tools", icon: gitLogo },
  { name: "GitHub", level: 3, category: "Dev Tools", icon: githubLogo },
  { name: "Shell Scripting", level: 3, category: "Dev Tools", icon: shellLogo },
  { name: "Anaconda", level: 3, category: "Dev Tools", icon: anacondaLogo },

  // General Tools
  { name: "OBS Studio", level: 3, category: "General Tools", icon: obsLogo },
  { name: "Camtasia", level: 3, category: "General Tools", icon: camtasiaLogo },
  { name: "Microsoft Office", level: 3, category: "General Tools", icon: officeLogo },
  { name: "Google Workspace", level: 3, category: "General Tools", icon: gworkspaceLogo },
];

// -----------------------------
// 📌 Coding Profiles
// -----------------------------
export const codingProfiles = [
  {
    platform: "LeetCode",
    username: "vdgarg529",
    link: "https://leetcode.com/vdgarg529/",
    solved: 500,
    rating: 1835,
    ratingTitle: "Knight",
    logo: leetcodeLogo,
    ratingIcon: ratingKnight,
  },
  {
    platform: "Codeforces",
    username: "vdgarg529",
    link: "https://codeforces.com/profile/vdgarg529",
    solved: 350,
    rating: 1438,
    ratingTitle: "Specialist",
    logo: codeforcesLogo,
    ratingIcon: ratingSpecialist,
  },
  {
    platform: "GeeksForGeeks",
    username: "vdgarg529",
    link: "https://auth.geeksforgeeks.org/user/vdgarg529",
    solved: 200,
    rating: 97,
    ratingTitle: "AIR",
    logo: gfgLogo,
    ratingIcon: ratingAir,
  },
  {
    platform: "CodeChef",
    username: "vdgarg529",
    link: "https://www.codechef.com/users/vdgarg529",
    solved: 300,
    rating: 1974,
    ratingTitle: "5-star",
    logo: codechefLogo,
    ratingIcon: rating5star,
  },
];

// -----------------------------
// 📌 Achievements
// -----------------------------
export const achievements = [
  "Secured AIR 66 (GE) in NIC Recruitment (Advt.NIELIT/NIC/2023/1) for Scientific Officer",
  "Appointed as District Informatics Officer(DIO) at Rajgarh Collectorate of M.P",
  "Ranked in Top 3.8% nationwide in GATE(CS/IP) with a normalized Gate Score of 519",
  "Attained 100% MMVY scholarship based on class12th Merit for BTech in CSE",
  "Achieved Zonal Rank 28 in the International Cyber Olympiad organized by SOF",
  "Secured Zonal Rank 64 in the International Maths Olympiad organized by SOF",
  "Solved 600+ problems across all coding platforms; 350+ leetcode",
];
