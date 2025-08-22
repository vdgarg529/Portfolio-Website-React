import NICIcon from '../assets/Profile/NIC.png';
import SPSIcon from '../assets/Profile/sps.png';
import MBIcon from '../assets/Profile/MagnetBrains.png';
import PersiIcon from '../assets/Profile/Persistent.png';
import DSPIcon from '../assets/Profile/disskover.jpeg';
import IIITIcon from '../assets/Profile/IIITA.jpg';
import UITIcon from '../assets/Profile/UIT,RGPV.jpg';
import GGIAIcon from '../assets/Profile/GyanGanga.jpg';
import RYANIcon from '../assets/Profile/Ryan.jpeg';



export const experiences = [
  {
    title: "Scientific Officer",
    company_name: "National Informatics Center",
    icon: NICIcon,
    date: "March 2025 - April 2025",
    points: [
      "Served as District Informatics Officer (DIO), Rajgarh – Acted as IT advisor to the District Collector, representing NIC at the district level and delivering technology-driven solutions",
      "Implemented key e-governance initiatives – Led the deployment and smooth functioning of projects such as E-Office File System, Uparjan (procurement), IRAD (road safety), Sarthak (attendance system by MPSEDC), and PARAK (GIS system by MPSEDC)",
      "Enabled digital transformation in governance – Ensured seamless onboarding, adoption, and integration of IT systems to enhance operational efficiency across departments",
      "Managed district-level communication infrastructure – Oversaw the uninterrupted functioning of Polycom and Cisco-based video conferencing systems for administrative meetings and coordination"
    ],
  },
  {
    title: "Quant/LR/DI Faculty",
    company_name: "Sagar Public School",
    icon: SPSIcon,
    date: "August 2023 - September 2023",
    points: [
      "Achieved a record-breaking score – Secured the highest marks ever in the screening test and interview for the position of Quantitative Aptitude, Logical Reasoning, and Data Interpretation faculty",
      "Selected as subject faculty – Shortlisted and appointed based on exceptional performance in the selection process",
      "Trained senior school students – Prepared Class 11th and 12th students for competitive exams including CUET, IPMAT, and CLAT",
      "Delivered result-oriented coaching – Focused on building problem-solving speed, accuracy, and exam strategies to maximize student performance"
    ],
  },
  {
    title: "AI/CS Faculty",
    company_name: "Magnet Brains",
    icon: MBIcon,
    date: "July 2021 - Feburary 2023",
    points: [
      "Scaled digital reach exponentially – Grew the official YouTube channel to 8.52M+ subscribers and 100M+ views by creating targeted, high-quality EdTech content that resonated with students and parents across India",
      "Delivered impactful AI & CS education – Taught over 100,000 students in AI (Grade 9–10), Computer Science (Grade 11–12), and CUET preparation through structured coursework, ensuring conceptual clarity and practical understanding",
      "Facilitated large-scale live learning – Engaged 500+ students concurrently in real-time doubt-solving sessions, amassing 32K+ live views and fostering interactive, collaborative learning experiences",
      "Optimized content performance – Applied analytics-driven strategies to boost learner engagement by 45% and subscriber growth by 30%, enhancing both reach and retention"
    ],
  },
  {
    title: "Software Trainee Intern",
    company_name: "Persistent Systems",
    icon: PersiIcon,
    date: "January 2022 - July 2022",
    points: [
      "Contributed to enterprise-grade solutions – Collaborated with cross-functional teams under the Agile methodology, actively participating in sprint planning, daily stand-ups, and retrospectives to ensure timely delivery of project milestones",
      "Strengthened technical & problem-solving skills – Worked on real-world projects, applying software development best practices while rapidly adapting to new tools, frameworks, and workflows",
      "Enhanced professional competencies – Sharpened abilities in communication, cross-functional collaboration, strategic thinking, learning agility, and feedback receptiveness, essential for high-performance environments",
      "Gained end-to-end development exposure – Acquired hands-on experience in requirement gathering, development, testing, and deployment processes, contributing to the overall success of the project lifecycle"
    ],
  },
  {
    title: "Maths/Physics Faculty",
    company_name: "Disskover Study Point",
    icon: DSPIcon,
    date: "August 2016 - April 2023",
    points: [
      "Board Member – Disskover Study Point – Provided strategic guidance for an education venture with a distinctive model of maintaining small batch sizes (8–15 students) to maximize individual attention and accelerate learning outcomes",
      "Focused on transforming underperforming students – Specialized in working with students scoring below 50%, helping them achieve significant academic improvements, often reaching 75%+",
      "Redefined teaching impact – Believed that true teaching excellence lies in uplifting struggling learners, rather than marginally improving already high-achieving students",
      "Taught core STEM subjects – Personally delivered Mathematics and Physics lessons to Class 9th and 10th students, emphasizing conceptual clarity and problem-solving skills"
    ],
  },
  // Add more experiences
];
export const education = [
  {
    school: "Indian Institute Of Information Technology",
    degree: "M.Tech [IT-MLIS]",
    icon: IIITIcon,
    date: "2024 - 2026",
    grade: "8.91 CGPA", // <-- Added grade here
    description:
      "Advanced Programming Practices, Image and Video Processing, Introduction to Machine Learning, Mathematics For IT, Research Methodology & IPR, Deep Learning, Probabilistic Machine Learning and Graphical Models, Natural Language Processing, Convex Optimization, Big Data Analytics"
  },
  {
    school: "University of Institute Technology",
    degree: "B.Tech [CSE]",
    icon: UITIcon,
    date: "2018 - 2022",
    grade: "8.44 CGPA",
    description:
      "Engineering Mathematics, Digital Logic, Computer Organization and Architecture, Programming and Data Structures, Algorithms, Theory of Computation, Compiler Design, Operating System, Databases, Computer Networks"
  },
  {
    school: "Gyan Ganga International School",
    degree: "Class 12th [CBSE]",
    icon: GGIAIcon,
    date: "2017 - 2018",
    grade: "87.8%",
    description: "Physics, Chemistry, Mathematics, English, Physical Education"
  },
  {
    school: "Ryan International School, Bhopal",
    degree: "Class 10th [CBSE]",
    icon: RYANIcon,
    date: "2015 - 2016",
    grade: "10 CGPA",
    description: "Mathematic, Science, English, Social Science, Hindi"
  },
];

export const projectGroups = [
  {
    groupName: "Computer Vision",
    projects: [
      {
        name: "E-Commerce Platform",
        description: "Full-featured e-commerce solution with payment gateway and admin panel.",
        tags: [
          { name: "React", color: "bg-blue-500/20 text-blue-300" },
          { name: "Node.js", color: "bg-green-500/20 text-green-300" },
          { name: "MongoDB", color: "bg-emerald-500/20 text-emerald-300" },
        ],
        image: "https://via.placeholder.com/640x360",
        source_code_link: "https://github.com/example/ecommerce",
        hosted_link: "https://ecommerce.example.com",
        readme: "This is a full-featured MERN stack e-commerce application with JWT auth, Stripe integration, and admin dashboard.",
      },
      // Add more projects in this group
    ]
  },
  {
    groupName: "Natural Language Processing",
    projects: [
      {
        name: "Tab Manager",
        description: "Chrome extension to manage and group tabs efficiently.",
        tags: [
          { name: "JavaScript", color: "bg-yellow-500/20 text-yellow-300" },
          { name: "Chrome API", color: "bg-gray-500/20 text-gray-300" },
        ],
        image: "https://via.placeholder.com/640x360",
        source_code_link: "https://github.com/example/tab-manager",
        hosted_link: "https://chrome.google.com/webstore/detail/tab-manager/id",
        readme: "Easily organize, search, and group your Chrome tabs. Built using Manifest V3 and modern JS.",
      },
      // More projects...
    ]
  },
  {
    groupName: "Generative AI",
    projects: [
      {
        name: "Tab Manager",
        description: "Chrome extension to manage and group tabs efficiently.",
        tags: [
          { name: "JavaScript", color: "bg-yellow-500/20 text-yellow-300" },
          { name: "Chrome API", color: "bg-gray-500/20 text-gray-300" },
        ],
        image: "https://via.placeholder.com/640x360",
        source_code_link: "https://github.com/example/tab-manager",
        hosted_link: "https://chrome.google.com/webstore/detail/tab-manager/id",
        readme: "Easily organize, search, and group your Chrome tabs. Built using Manifest V3 and modern JS.",
      },
      // More projects...
    ]
  },
  {
    groupName: "Agentic AI",
    projects: [
      {
        name: "Tab Manager",
        description: "Chrome extension to manage and group tabs efficiently.",
        tags: [
          { name: "JavaScript", color: "bg-yellow-500/20 text-yellow-300" },
          { name: "Chrome API", color: "bg-gray-500/20 text-gray-300" },
        ],
        image: "https://via.placeholder.com/640x360",
        source_code_link: "https://github.com/example/tab-manager",
        hosted_link: "https://chrome.google.com/webstore/detail/tab-manager/id",
        readme: "Easily organize, search, and group your Chrome tabs. Built using Manifest V3 and modern JS.",
      },
      // More projects...
    ]
  },
  {
    groupName: "Reinforcement Learning",
    projects: [
      {
        name: "Tab Manager",
        description: "Chrome extension to manage and group tabs efficiently.",
        tags: [
          { name: "JavaScript", color: "bg-yellow-500/20 text-yellow-300" },
          { name: "Chrome API", color: "bg-gray-500/20 text-gray-300" },
        ],
        image: "https://via.placeholder.com/640x360",
        source_code_link: "https://github.com/example/tab-manager",
        hosted_link: "https://chrome.google.com/webstore/detail/tab-manager/id",
        readme: "Easily organize, search, and group your Chrome tabs. Built using Manifest V3 and modern JS.",
      },
      // More projects...
    ]
  },
  {
    groupName: "Machine Learning",
    projects: [
      {
        name: "Tab Manager",
        description: "Chrome extension to manage and group tabs efficiently.",
        tags: [
          { name: "JavaScript", color: "bg-yellow-500/20 text-yellow-300" },
          { name: "Chrome API", color: "bg-gray-500/20 text-gray-300" },
        ],
        image: "https://via.placeholder.com/640x360",
        source_code_link: "https://github.com/example/tab-manager",
        hosted_link: "https://chrome.google.com/webstore/detail/tab-manager/id",
        readme: "Easily organize, search, and group your Chrome tabs. Built using Manifest V3 and modern JS.",
      },
      // More projects...
    ]
  },
  {
    groupName: "Games",
    projects: [
      {
        name: "Tab Manager",
        description: "Chrome extension to manage and group tabs efficiently.",
        tags: [
          { name: "JavaScript", color: "bg-yellow-500/20 text-yellow-300" },
          { name: "Chrome API", color: "bg-gray-500/20 text-gray-300" },
        ],
        image: "https://via.placeholder.com/640x360",
        source_code_link: "https://github.com/example/tab-manager",
        hosted_link: "https://chrome.google.com/webstore/detail/tab-manager/id",
        readme: "Easily organize, search, and group your Chrome tabs. Built using Manifest V3 and modern JS.",
      },
      // More projects...
    ]
  },
  {
    groupName: "Tools",
    projects: [
      {
        name: "Tab Manager",
        description: "Chrome extension to manage and group tabs efficiently.",
        tags: [
          { name: "JavaScript", color: "bg-yellow-500/20 text-yellow-300" },
          { name: "Chrome API", color: "bg-gray-500/20 text-gray-300" },
        ],
        image: "https://via.placeholder.com/640x360",
        source_code_link: "https://github.com/example/tab-manager",
        hosted_link: "https://chrome.google.com/webstore/detail/tab-manager/id",
        readme: "Easily organize, search, and group your Chrome tabs. Built using Manifest V3 and modern JS.",
      },
      // More projects...
    ]
  },
  // Add more groups freely
];
