// import { useState } from "react";
// import ReactMarkdown from "react-markdown";
// import { notesData } from "../constants/public_notes";
// import {
//   ChevronRight,
//   ChevronDown,
//   PanelLeftClose,
//   PanelLeftOpen,
// } from "lucide-react";

// const Notes = ({ darkMode }) => {
//   const [selectedPath, setSelectedPath] = useState([]);
//   const [openNodes, setOpenNodes] = useState(new Set());
//   const [sidebarVisible, setSidebarVisible] = useState(true);

//   const getContentAtPath = (path) => {
//     let node = notesData;
//     for (let key of path) node = node[key];
//     return node?.content;
//   };

//   const toggleNode = (pathKey) => {
//     setOpenNodes((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(pathKey)) newSet.delete(pathKey);
//       else newSet.add(pathKey);
//       return newSet;
//     });
//   };

//   // Recursive tree renderer
//   const renderTree = (node, path = []) => (
//     <ul className="ml-2 space-y-1">
//       {Object.keys(node).map((key) => {
//         const newPath = [...path, key];
//         const isLeaf = node[key]?.content !== undefined;
//         const pathKey = newPath.join(">");
//         const isOpen = openNodes.has(pathKey);

//         return (
//           <li key={pathKey}>
//             <div className="flex items-center">
//               {!isLeaf && (
//                 <button
//                   onClick={() => toggleNode(pathKey)}
//                   className="mr-1 text-xs"
//                 >
//                   {isOpen ? (
//                     <ChevronDown size={16} />
//                   ) : (
//                     <ChevronRight size={16} />
//                   )}
//                 </button>
//               )}

//               <button
//                 className={`flex-1 text-left px-2 py-1 rounded transition-colors ${
//                   JSON.stringify(selectedPath) === JSON.stringify(newPath)
//                     ? "bg-purple-500 text-white"
//                     : darkMode
//                     ? "hover:bg-gray-700 text-gray-300"
//                     : "hover:bg-gray-200 text-gray-700"
//                 }`}
//                 onClick={() => {
//                   if (isLeaf) setSelectedPath(newPath);
//                   else toggleNode(pathKey);
//                 }}
//               >
//                 {key}
//               </button>
//             </div>

//             {!isLeaf && isOpen && renderTree(node[key], newPath)}
//           </li>
//         );
//       })}
//     </ul>
//   );

//   const content = getContentAtPath(selectedPath);

//   return (
//     <div
//       className={`min-h-screen pt-16 relative flex flex-col ${
//         darkMode ? "bg-[#050816] text-white" : "bg-gray-50 text-gray-900"
//       }`}
//     >
//       {/* Subject Tabs */}
//       <div
//         className={`flex overflow-x-auto sticky top-16 z-10 ${
//           darkMode
//             ? "bg-[#050816] border-b border-gray-700"
//             : "bg-white border-b border-gray-300"
//         }`}
//       >
//         {Object.keys(notesData).map((subject) => (
//           <button
//             key={subject}
//             className={`px-6 py-3 font-semibold whitespace-nowrap transition-colors ${
//               selectedPath[0] === subject
//                 ? "border-b-4 border-purple-500 text-purple-500"
//                 : darkMode
//                 ? "hover:text-purple-400 text-gray-300"
//                 : "hover:text-purple-600 text-gray-700"
//             }`}
//             onClick={() => {
//               setSelectedPath([subject]);
//               setOpenNodes(new Set([subject]));
//               setSidebarVisible(true);
//             }}
//           >
//             {subject}
//           </button>
//         ))}
//       </div>

//       <div className="flex flex-1 h-[calc(100vh-4rem)] relative overflow-hidden">
//         {/* Sidebar */}
//         {selectedPath.length > 0 && (
//           <div
//             className={`absolute top-0 left-0 h-full w-72 border-r p-4 overflow-y-auto transform transition-transform duration-300 ease-in-out z-30
//             ${
//               sidebarVisible ? "translate-x-0" : "-translate-x-full"
//             }
//             ${
//               darkMode
//                 ? "border-gray-700 bg-[#0a0f1a]"
//                 : "border-gray-300 bg-gray-50"
//             }`}
//             style={{ maxHeight: "calc(100vh - 4rem)" }}
//           >
//             {renderTree(notesData[selectedPath[0]], [selectedPath[0]])}
//           </div>
//         )}

//         {/* Overlay (mobile only) */}
//         {sidebarVisible && selectedPath.length > 0 && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-40 z-20 lg:hidden"
//             onClick={() => setSidebarVisible(false)}
//           />
//         )}

//         {/* Content Viewer */}
//         <div
//           className={`flex-1 p-6 overflow-y-auto transition-all duration-300 ${
//             sidebarVisible && selectedPath.length > 0 ? "lg:ml-72" : "ml-0"
//           }`}
//           style={{ maxHeight: "calc(100vh - 4rem)" }}
//         >
//           {content ? (
//             <div
//               className={`${
//                 darkMode ? "prose prose-invert max-w-none" : "prose max-w-none"
//               }`}
//             >
//               <ReactMarkdown>{content}</ReactMarkdown>
//             </div>
//           ) : (
//             <div className="h-full flex items-center justify-center">
//               <p className="opacity-70 text-lg italic">
//                 {selectedPath.length > 0
//                   ? "📖 Select a subtopic to view notes."
//                   : "📚 Select a subject to begin."}
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Toggle Button pinned at boundary */}
//         {selectedPath.length > 0 && (
//           <button
//             onClick={() => setSidebarVisible(!sidebarVisible)}
//             className={`absolute top-0 transform -translate-y-1/2 z-40 p-2 rounded-r-lg shadow-md transition-colors
//               ${darkMode ? "bg-purple-600 text-white" : "bg-purple-500 text-white"}
//               `}
//             style={{
//               left: sidebarVisible ? "18rem" : "0rem", // align with sidebar width
//               marginTop: "2.5rem", // tangent with subject navbar
//             }}
//           >
//             {sidebarVisible ? (
//               <PanelLeftClose size={18} />
//             ) : (
//               <PanelLeftOpen size={18} />
//             )}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Notes;







import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { notesData } from "../constants/public_notes";
import {
  ChevronRight,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const Notes = ({ darkMode }) => {
  const [selectedPath, setSelectedPath] = useState([]);
  const [openNodes, setOpenNodes] = useState(new Set());
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const getContentAtPath = (path) => {
    let node = notesData;
    for (let key of path) node = node[key];
    return node?.content;
  };

  const toggleNode = (pathKey) => {
    setOpenNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(pathKey)) newSet.delete(pathKey);
      else newSet.add(pathKey);
      return newSet;
    });
  };

  // Recursive tree renderer
  const renderTree = (node, path = []) => (
    <ul className="ml-2 space-y-1">
      {Object.keys(node).map((key) => {
        const newPath = [...path, key];
        const isLeaf = node[key]?.content !== undefined;
        const pathKey = newPath.join(">");
        const isOpen = openNodes.has(pathKey);

        return (
          <li key={pathKey}>
            <div className="flex items-center">
              {!isLeaf && (
                <button
                  onClick={() => toggleNode(pathKey)}
                  className="mr-1 text-xs"
                >
                  {isOpen ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
              )}

              <button
                className={`flex-1 text-left px-2 py-1 rounded transition-colors ${
                  JSON.stringify(selectedPath) === JSON.stringify(newPath)
                    ? "bg-purple-500 text-white"
                    : darkMode
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-200 text-gray-700"
                }`}
                onClick={() => {
                  if (isLeaf) setSelectedPath(newPath);
                  else toggleNode(pathKey);
                }}
              >
                {key}
              </button>
            </div>

            {!isLeaf && isOpen && renderTree(node[key], newPath)}
          </li>
        );
      })}
    </ul>
  );

  const content = getContentAtPath(selectedPath);

  return (
    <div
      className={`min-h-screen pt-16 relative flex flex-col ${
        darkMode ? "bg-[#050816] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Subject Tabs */}
      <div
        className={`flex overflow-x-auto sticky top-16 z-10 ${
          darkMode
            ? "bg-[#050816] border-b border-gray-700"
            : "bg-white border-b border-gray-300"
        }`}
      >
        {Object.keys(notesData).map((subject) => (
          <button
            key={subject}
            className={`px-6 py-3 font-semibold whitespace-nowrap transition-colors ${
              selectedPath[0] === subject
                ? "border-b-4 border-purple-500 text-purple-500"
                : darkMode
                ? "hover:text-purple-400 text-gray-300"
                : "hover:text-purple-600 text-gray-700"
            }`}
            onClick={() => {
              setSelectedPath([subject]);
              setOpenNodes(new Set([subject]));
              setSidebarVisible(true);
            }}
          >
            {subject}
          </button>
        ))}
      </div>

      <div className="flex flex-1 h-[calc(100vh-4rem)] relative overflow-hidden">
        {/* Sidebar */}
        {selectedPath.length > 0 && (
          <div
            className={`absolute top-0 left-0 h-full w-72 border-r p-4 overflow-y-auto transform transition-transform duration-300 ease-in-out z-30
            ${
              sidebarVisible ? "translate-x-0" : "-translate-x-full"
            }
            ${
              darkMode
                ? "border-gray-700 bg-[#0a0f1a]"
                : "border-gray-300 bg-gray-50"
            }`}
            style={{ maxHeight: "calc(100vh - 4rem)" }}
          >
            {renderTree(notesData[selectedPath[0]], [selectedPath[0]])}
          </div>
        )}

        {/* Overlay (mobile only) */}
        {sidebarVisible && selectedPath.length > 0 && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-20 lg:hidden"
            onClick={() => setSidebarVisible(false)}
          />
        )}

        {/* Content Viewer */}
        <div
          className={`flex-1 p-6 overflow-y-auto transition-all duration-300 
            ${sidebarVisible && selectedPath.length > 0 ? "lg:ml-72" : "ml-0"} 
            ${darkMode ? "border-l border-gray-700" : "border-l border-gray-300"}
            rounded-tl-lg rounded-bl-lg
          `}
          style={{ maxHeight: "calc(100vh - 4rem)" }}
        >
          {content ? (
            <div
              className={`${
                darkMode ? "prose prose-invert max-w-none" : "prose max-w-none"
              }`}
            >
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="opacity-70 text-lg italic">
                {selectedPath.length > 0
                  ? "📖 Select a subtopic to view notes."
                  : "📚 Select a subject to begin."}
              </p>
            </div>
          )}
        </div>

        {/* Toggle Button pinned at boundary */}
        {selectedPath.length > 0 && (
          <button
            onClick={() => setSidebarVisible(!sidebarVisible)}
            className={`absolute top-0 transform -translate-y-1/2 z-40 p-2 rounded-r-lg shadow-md transition-colors
              ${darkMode ? "bg-purple-600 text-white" : "bg-purple-500 text-white"}`}
            style={{
              left: sidebarVisible ? "18rem" : "0rem", // align with sidebar width
              marginTop: "2.5rem", // tangent with subject navbar
            }}
          >
            {sidebarVisible ? (
              <PanelLeftClose size={18} />
            ) : (
              <PanelLeftOpen size={18} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Notes;
