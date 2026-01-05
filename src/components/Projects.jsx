// Project.jsx
import { projectGroups } from '../constants';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";


const ProjectCard = ({ project, index, onReadMore }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-tertiary rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
  >
    <div className="relative">
      <img
        src={project.image}
        alt={project.name}
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute bottom-4 left-4">
        <h3 className="text-white font-bold text-xl">{project.name}</h3>
      </div>

    <div className="absolute top-4 right-4 flex gap-1">
      <div
        onClick={() => window.open(project.source_code_link, "_blank")}
        className="bg-black/50 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-black/70"
      >
        <FaGithub className="text-white text-2xl" />
      </div>

      {project.hosted_link && (
        <div
          onClick={() => window.open(project.hosted_link, "_blank")}
          className="bg-black/50 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-black/70"
        >
          <HiOutlineExternalLink className="text-white text-2xl" />
        </div>
      )}
    </div>

    </div>
    <div className="p-6">
      <p className="text-white-100 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span 
            key={tag.name} 
            className={`px-3 py-1 text-xs rounded-full ${tag.color}`}
          >
            {tag.name}
          </span>
        ))}
      </div>
      <button
        onClick={() => onReadMore(project)}
        className="text-sm text-blue-300 hover:underline"
      >
        Read More
      </button>
    </div>
  </motion.div>
);

const Projects = () => {
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] mb-6">
        My Projects
      </h2>

      <p className="text-secondary text-lg max-w-3xl mb-10">
        Following projects showcase my skills and experience through real-world examples of my work.
      </p>

      <div className="flex flex-wrap gap-4 mb-10">
        {projectGroups.map((group, index) => (
          <button
            key={index}
            onClick={() => setSelectedGroupIndex(index)}
            className={`px-4 py-2 rounded-full border transition-all text-sm font-medium ${selectedGroupIndex === index ? 'bg-purple-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            {group.groupName}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectGroups[selectedGroupIndex].projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            index={index}
            onReadMore={setSelectedProject}
          />
        ))}
      </div>

      {/* Read More Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            <h3 className="text-2xl font-bold mb-4">{selectedProject.name}</h3>
            <p className="text-gray-700 whitespace-pre-line">{selectedProject.readme}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
