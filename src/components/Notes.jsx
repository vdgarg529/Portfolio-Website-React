// // // src/components/Notes.jsx
// // import { useState } from "react";
// // import ReactMarkdown from "react-markdown";
// // import { notesData } from "../constants/public_notes";

// // const Notes = ({ darkMode }) => {
// //   const [selectedSubject, setSelectedSubject] = useState(null);
// //   const [selectedTopic, setSelectedTopic] = useState(null);

// //   return (
// //     <div className={`min-h-screen pt-16 ${darkMode ? "bg-[#050816] text-white" : "bg-gray-50 text-gray-900"}`}>
// //       {/* Subject Tabs */}
// //       <div className={`flex overflow-x-auto sticky top-16 z-10 ${darkMode ? "bg-[#050816] border-b border-gray-700" : "bg-white border-b border-gray-300"}`}>
// //         {Object.keys(notesData).map((subject) => (
// //           <button
// //             key={subject}
// //             className={`px-6 py-3 font-semibold whitespace-nowrap transition-colors ${
// //               selectedSubject === subject
// //                 ? "border-b-4 border-purple-500 text-purple-500"
// //                 : darkMode
// //                 ? "hover:text-purple-400 text-gray-300"
// //                 : "hover:text-purple-600 text-gray-700"
// //             }`}
// //             onClick={() => {
// //               setSelectedSubject(subject);
// //               setSelectedTopic(null);
// //             }}
// //           >
// //             {subject}
// //           </button>
// //         ))}
// //       </div>

// //       <div className="flex flex-1 h-[calc(100vh-4rem)]">
// //         {/* Sidebar */}
// //         {selectedSubject && (
// //           <div className={`w-64 border-r p-4 overflow-y-auto ${darkMode ? "border-gray-700 bg-[#050816]" : "border-gray-300 bg-white"}`}>
// //             <h2 className="font-bold mb-4">{selectedSubject}</h2>
// //             <ul className="space-y-2">
// //               {notesData[selectedSubject].map((note, idx) => (
// //                 <li key={idx}>
// //                   <button
// //                     className={`w-full text-left px-2 py-1 rounded transition-colors ${
// //                       selectedTopic === idx
// //                         ? "bg-purple-500 text-white"
// //                         : darkMode
// //                         ? "hover:bg-gray-700 text-gray-300"
// //                         : "hover:bg-gray-200 text-gray-700"
// //                     }`}
// //                     onClick={() => setSelectedTopic(idx)}
// //                   >
// //                     {note.topic}
// //                   </button>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         )}

// //         {/* Content Viewer */}
// //         <div className="flex-1 p-6 overflow-y-auto">
// //           {selectedTopic !== null ? (
// //             <div className={`${darkMode ? "prose prose-invert max-w-none" : "prose max-w-none"}`}>
// //               <ReactMarkdown
// //                 components={{
// //                   h1: ({node, ...props}) => <h1 className="text-purple-500 mb-4" {...props} />,
// //                   h2: ({node, ...props}) => <h2 className="text-purple-400 mb-3" {...props} />,
// //                   p: ({node, ...props}) => <p className="mb-4" {...props} />
// //                 }}
// //               >
// //                 {notesData[selectedSubject][selectedTopic].content}
// //               </ReactMarkdown>
// //             </div>
// //           ) : (
// //             <div className="h-full flex items-center justify-center">
// //               <p className="opacity-70 text-lg">
// //                 {selectedSubject
// //                   ? "Select a topic to view notes."
// //                   : "Select a subject to begin."}
// //               </p>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Notes;




// // src/components/Notes.jsx
// import { useState } from "react";
// import ReactMarkdown from "react-markdown";
// import { notesData } from "../constants/public_notes";

// const Notes = ({ darkMode }) => {
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [selectedTopic, setSelectedTopic] = useState(null);

//   return (
//     <div
//       className={`min-h-screen pt-16 ${
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
//               selectedSubject === subject
//                 ? "border-b-4 border-purple-500 text-purple-500"
//                 : darkMode
//                 ? "hover:text-purple-400 text-gray-300"
//                 : "hover:text-purple-600 text-gray-700"
//             }`}
//             onClick={() => {
//               setSelectedSubject(subject);
//               setSelectedTopic(null);
//             }}
//           >
//             {subject}
//           </button>
//         ))}
//       </div>

//       <div className="flex flex-1 h-[calc(100vh-4rem)]">
//         {/* Sidebar */}
//         {selectedSubject && (
//           <div
//             className={`w-64 border-r p-4 overflow-y-auto shadow-inner ${
//               darkMode
//                 ? "border-gray-700 bg-[#0a0f1a]"
//                 : "border-gray-300 bg-gray-50"
//             }`}
//           >
//             <ul className="space-y-2">
//               {notesData[selectedSubject].map((note, idx) => (
//                 <li key={idx}>
//                   <button
//                     className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-all duration-200 ${
//                       selectedTopic === idx
//                         ? "bg-purple-500 text-white shadow-md"
//                         : darkMode
//                         ? "hover:bg-gray-800 text-gray-300"
//                         : "hover:bg-gray-200 text-gray-700"
//                     }`}
//                     onClick={() => setSelectedTopic(idx)}
//                   >
//                     {note.topic}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Content Viewer */}
//         <div className="flex-1 p-8 overflow-y-auto">
//           {selectedTopic !== null ? (
//             <div
//               className={`transition-all duration-300 ${
//                 darkMode ? "prose prose-invert max-w-none" : "prose max-w-none"
//               }`}
//             >
//               <ReactMarkdown
//                 components={{
//                   h1: ({ node, ...props }) => (
//                     <h1
//                       className="text-purple-500 mb-6 font-bold text-3xl"
//                       {...props}
//                     />
//                   ),
//                   h2: ({ node, ...props }) => (
//                     <h2
//                       className="text-purple-400 mb-4 font-semibold text-2xl"
//                       {...props}
//                     />
//                   ),
//                   p: ({ node, ...props }) => (
//                     <p className="mb-4 leading-relaxed" {...props} />
//                   ),
//                   ul: ({ node, ...props }) => (
//                     <ul className="list-disc ml-6 mb-4 space-y-1" {...props} />
//                   ),
//                   li: ({ node, ...props }) => (
//                     <li className="leading-relaxed" {...props} />
//                   ),
//                 }}
//               >
//                 {notesData[selectedSubject][selectedTopic].content}
//               </ReactMarkdown>
//             </div>
//           ) : (
//             <div className="h-full flex items-center justify-center">
//               <p className="opacity-70 text-lg italic">
//                 {selectedSubject
//                   ? "✨ Select a topic to explore the notes."
//                   : "📚 Select a subject to begin."}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Notes;


// src/components/Notes.jsx
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { notesData } from "../constants/public_notes";
import { ChevronRight, ChevronDown } from "lucide-react"; // nice arrows

const Notes = ({ darkMode }) => {
  const [selectedPath, setSelectedPath] = useState([]);
  const [openNodes, setOpenNodes] = useState(new Set());

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
  const renderTree = (node, path = []) => {
    return (
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

              {/* Render children only if open */}
              {!isLeaf && isOpen && renderTree(node[key], newPath)}
            </li>
          );
        })}
      </ul>
    );
  };

  const content = getContentAtPath(selectedPath);

  return (
    <div
      className={`min-h-screen pt-16 ${
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
              setOpenNodes(new Set([subject])); // auto-open selected subject
            }}
          >
            {subject}
          </button>
        ))}
      </div>

      <div className="flex flex-1 h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        {selectedPath.length > 0 && (
          <div
            className={`w-72 border-r p-4 overflow-y-auto ${
              darkMode
                ? "border-gray-700 bg-[#0a0f1a]"
                : "border-gray-300 bg-gray-50"
            }`}
          >
            {renderTree(notesData[selectedPath[0]], [selectedPath[0]])}
          </div>
        )}

        {/* Content Viewer */}
        <div className="flex-1 p-6 overflow-y-auto">
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
      </div>
    </div>
  );
};

export default Notes;
