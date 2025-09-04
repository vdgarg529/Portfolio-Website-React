// // src/components/Notes.jsx
// import { useState } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { notesData } from "../constants/public_notes";
// import {
//   ChevronRight,
//   ChevronDown,
//   PanelLeftClose,
//   PanelLeftOpen,
// } from "lucide-react";

// // 🔹 Import all images from /images folder
// const images = import.meta.glob("/src/assets/PublicContent/images/*", {
//   eager: true,
// });

// // Resolve image path by filename (handles spaces + multiple extensions)
// function resolveImagePath(name) {
//   const base = name.trim();

//   const candidates = [
//     base,
//     base + ".png",
//     base + ".jpg",
//     base + ".jpeg",
//     base + ".svg",
//     base.replace(/ /g, "%20") + ".png", // if vite encodes spaces
//     base.replace(/ /g, "_") + ".png",   // if you rename later with _
//   ];

//   for (let candidate of candidates) {
//     const match = Object.keys(images).find((key) => key.includes(candidate));
//     if (match) return images[match].default;
//   }
//   return null;
// }

// // Preprocess markdown: convert ![[filename]] → ![](resolvedPath)
// function preprocessMarkdown(md) {
//   return md.replace(/!\[\[(.*?)\]\]/g, (_, filename) => {
//     const src = resolveImagePath(filename.trim());
//     return src ? `![](${src})` : `⚠️ Missing image: ${filename}`;
//   });
// }

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
//   const processedContent = content ? preprocessMarkdown(content) : "";

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
//             ${sidebarVisible ? "translate-x-0" : "-translate-x-full"}
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
//           className={`flex-1 p-6 overflow-y-auto transition-all duration-300 
//             ${sidebarVisible && selectedPath.length > 0 ? "lg:ml-72" : "ml-0"} 
//             ${darkMode ? "border-l border-gray-700" : "border-l border-gray-300"}
//             rounded-tl-lg rounded-bl-lg
//           `}
//           style={{ maxHeight: "calc(100vh - 4rem)" }}
//         >
//           {processedContent ? (
//             <div
//               className={`${
//                 darkMode ? "prose prose-invert max-w-none" : "prose max-w-none"
//               }`}
//             >
//               <ReactMarkdown
//                 remarkPlugins={[remarkGfm]}
//                 components={{
//                   img: (props) => (
//                     <img
//                       {...props}
//                       className="rounded-lg mx-auto my-4 shadow-md"
//                       style={{ maxWidth: "100%", height: "auto" }}
//                       alt={props.alt}
//                     />
//                   ),
//                 }}
//               >
//                 {processedContent}
//               </ReactMarkdown>
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
//               ${darkMode ? "bg-purple-600 text-white" : "bg-purple-500 text-white"}`}
//             style={{
//               left: sidebarVisible ? "18rem" : "0rem",
//               marginTop: "2.5rem",
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



// src/components/Notes.jsx
// import { useState } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { notesData } from "../constants/public_notes";
// import {
//   ChevronRight,
//   ChevronDown,
//   PanelLeftClose,
//   PanelLeftOpen,
// } from "lucide-react";

// // 🔹 Import all images from /images folder
// const images = import.meta.glob("/src/assets/PublicContent/images/*", {
//   eager: true,
// });

// // Resolve image path by filename (handles spaces + multiple extensions)
// function resolveImagePath(name) {
//   const base = name.trim();

//   const candidates = [
//     base,
//     base + ".png",
//     base + ".jpg",
//     base + ".jpeg",
//     base + ".svg",
//     base.replace(/ /g, "%20") + ".png", // if vite encodes spaces
//     base.replace(/ /g, "_") + ".png", // if renamed with underscores
//   ];

//   for (let candidate of candidates) {
//     const match = Object.keys(images).find((key) => key.includes(candidate));
//     if (match) return images[match].default;
//   }
//   return null;
// }

// // Preprocess markdown: convert ![[filename]] → ![](resolvedPath)
// function preprocessMarkdown(md) {
//   return md.replace(/!\[\[(.*?)\]\]/g, (_, filename) => {
//     const src = resolveImagePath(filename.trim());
//     return src ? `![](${src})` : `⚠️ Missing image: ${filename}`;
//   });
// }

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
//   const processedContent = content ? preprocessMarkdown(content) : "";

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

//       {/* Main content area */}
//       <div className="flex flex-1 h-[calc(100vh-4rem)] overflow-hidden">
//         {/* Sidebar */}
//         {selectedPath.length > 0 && (
//           <div
//             className={`transition-all duration-300 ease-in-out
//               ${sidebarVisible ? "w-1/3 lg:w-1/4" : "w-0"}
//               ${
//                 darkMode
//                   ? "bg-[#0a0f1a] border-r border-gray-700"
//                   : "bg-gray-50 border-r border-gray-300"
//               }
//               overflow-y-auto`}
//             style={{ maxHeight: "calc(100vh - 4rem)" }}
//           >
//             {sidebarVisible &&
//               renderTree(notesData[selectedPath[0]], [selectedPath[0]])}
//           </div>
//         )}

//         {/* Toggle Button (inline, no overlap) */}
//         {selectedPath.length > 0 && (
//           <div className="flex items-start">
//             <button
//               onClick={() => setSidebarVisible(!sidebarVisible)}
//               className={`z-40 p-2 transition-colors rounded-r-lg shadow-md
//                 ${darkMode ? "bg-purple-600 text-white" : "bg-purple-500 text-white"}`}
//               style={{ marginTop: "1rem" }}
//             >
//               {sidebarVisible ? (
//                 <PanelLeftClose size={18} />
//               ) : (
//                 <PanelLeftOpen size={18} />
//               )}
//             </button>
//           </div>
//         )}

//         {/* Content Viewer */}
//         <div
//           className={`flex-1 p-6 overflow-y-auto transition-all duration-300
//             ${darkMode ? "border-l border-gray-700" : "border-l border-gray-300"}
//             rounded-tl-lg rounded-bl-lg`}
//           style={{ maxHeight: "calc(100vh - 4rem)" }}
//         >
//           {processedContent ? (
//             <div
//               className={`${
//                 darkMode ? "prose prose-invert max-w-none" : "prose max-w-none"
//               }`}
//             >
//               <ReactMarkdown
//                 remarkPlugins={[remarkGfm]}
//                 components={{
//                   img: (props) => (
//                     <img
//                       {...props}
//                       className="rounded-lg mx-auto my-4 shadow-md"
//                       style={{ maxWidth: "100%", height: "auto" }}
//                       alt={props.alt}
//                     />
//                   ),
//                 }}
//               >
//                 {processedContent}
//               </ReactMarkdown>
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
//       </div>
//     </div>
//   );
// };

// export default Notes;


// src/components/Notes.jsx
// import { useState } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { notesData } from "../constants/public_notes";
// import {
//   ChevronRight,
//   ChevronDown,
//   PanelLeftClose,
//   PanelLeftOpen,
// } from "lucide-react";

// // 🔹 Syntax highlighter
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// // 🔹 Import all images from /images folder
// const images = import.meta.glob("/src/assets/PublicContent/images/*", {
//   eager: true,
// });

// // Resolve image path by filename (handles spaces + multiple extensions)
// function resolveImagePath(name) {
//   const base = name.trim();

//   const candidates = [
//     base,
//     base + ".png",
//     base + ".jpg",
//     base + ".jpeg",
//     base + ".svg",
//     base.replace(/ /g, "%20") + ".png", // if vite encodes spaces
//     base.replace(/ /g, "_") + ".png", // if renamed with underscores
//   ];

//   for (let candidate of candidates) {
//     const match = Object.keys(images).find((key) => key.includes(candidate));
//     if (match) return images[match].default;
//   }
//   return null;
// }

// // Preprocess markdown: convert ![[filename]] → ![](resolvedPath)
// function preprocessMarkdown(md) {
//   return md.replace(/!\[\[(.*?)\]\]/g, (_, filename) => {
//     const src = resolveImagePath(filename.trim());
//     return src ? `![](${src})` : `⚠️ Missing image: ${filename}`;
//   });
// }

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
//   const processedContent = content ? preprocessMarkdown(content) : "";

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

//       {/* Main content area */}
//       <div className="flex flex-1 h-[calc(100vh-4rem)] overflow-hidden">
//         {/* Sidebar */}
//         {selectedPath.length > 0 && (
//           <div
//             className={`transition-all duration-300 ease-in-out
//               ${sidebarVisible ? "w-1/3 lg:w-1/4" : "w-0"}
//               ${
//                 darkMode
//                   ? "bg-[#0a0f1a] border-r border-gray-700"
//                   : "bg-gray-50 border-r border-gray-300"
//               }
//               overflow-y-auto`}
//             style={{ maxHeight: "calc(100vh - 4rem)" }}
//           >
//             {sidebarVisible &&
//               renderTree(notesData[selectedPath[0]], [selectedPath[0]])}
//           </div>
//         )}

//         {/* Toggle Button */}
//         {selectedPath.length > 0 && (
//           <div className="flex items-start">
//             <button
//               onClick={() => setSidebarVisible(!sidebarVisible)}
//               className={`z-40 p-2 transition-colors rounded-r-lg shadow-md
//                 ${darkMode ? "bg-purple-600 text-white" : "bg-purple-500 text-white"}`}
//               style={{ marginTop: "1rem" }}
//             >
//               {sidebarVisible ? (
//                 <PanelLeftClose size={18} />
//               ) : (
//                 <PanelLeftOpen size={18} />
//               )}
//             </button>
//           </div>
//         )}

//         {/* Content Viewer */}
//         <div
//           className={`flex-1 p-6 overflow-y-auto transition-all duration-300
//             ${darkMode ? "border-l border-gray-700" : "border-l border-gray-300"}
//             rounded-tl-lg rounded-bl-lg`}
//           style={{ maxHeight: "calc(100vh - 4rem)" }}
//         >
//           {processedContent ? (
//             <div
//               className={`${
//                 darkMode ? "prose prose-invert max-w-none" : "prose max-w-none"
//               }`}
//             >
//               <ReactMarkdown
//                 remarkPlugins={[remarkGfm]}
//                 components={{
//                   img: (props) => (
//                     <img
//                       {...props}
//                       className="rounded-lg mx-auto my-4 shadow-md"
//                       style={{ maxWidth: "100%", height: "auto" }}
//                       alt={props.alt}
//                     />
//                   ),
//                   code({ inline, className, children, ...props }) {
//                     const match = /language-(\w+)/.exec(className || "");
//                     return !inline && match ? (
//                       <div className="my-4 overflow-x-auto rounded-lg">
//                         <SyntaxHighlighter
//                           style={oneDark}
//                           language={match[1]}
//                           PreTag="div"
//                           customStyle={{
//                             margin: 0,
//                             background: "transparent",
//                             padding: "1rem",
//                             minWidth: "100%",
//                             whiteSpace: "pre",
//                           }}
//                           {...props}
//                         >
//                           {String(children).replace(/\n$/, "")}
//                         </SyntaxHighlighter>
//                       </div>
//                     ) : (
//                       <code
//                         className={`${className} px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-800`}
//                         {...props}
//                       >
//                         {children}
//                       </code>
//                     );
//                   },
//                 }}
//               >
//                 {processedContent}
//               </ReactMarkdown>
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
//       </div>
//     </div>
//   );
// };

// export default Notes;



// src/components/Notes.jsx
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notesData } from "../constants/public_notes";
import {
  ChevronRight,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// 🔹 Import all images from /images folder
const images = import.meta.glob("/src/assets/PublicContent/images/*", {
  eager: true,
});

// Resolve image path by filename (handles spaces + multiple extensions)
function resolveImagePath(name) {
  const base = name.trim();

  const candidates = [
    base,
    base + ".png",
    base + ".jpg",
    base + ".jpeg",
    base + ".svg",
    base.replace(/ /g, "%20") + ".png", // if vite encodes spaces
    base.replace(/ /g, "_") + ".png", // if renamed with underscores
  ];

  for (let candidate of candidates) {
    const match = Object.keys(images).find((key) => key.includes(candidate));
    if (match) return images[match].default;
  }
  return null;
}

// Preprocess markdown: convert ![[filename]] → ![](resolvedPath)
function preprocessMarkdown(md) {
  return md.replace(/!\[\[(.*?)\]\]/g, (_, filename) => {
    const src = resolveImagePath(filename.trim());
    return src ? `![](${src})` : `⚠️ Missing image: ${filename}`;
  });
}

// 🔹 Separate component for block code
const CodeBlock = ({ language, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative my-4 rounded-lg border border-gray-700 dark:border-gray-600 overflow-hidden">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className={`absolute top-2 right-2 px-3 py-1 text-xs font-medium rounded-md transition-colors
          ${
            copied
              ? "bg-green-600 text-white"
              : "bg-purple-600 text-white hover:bg-purple-500"
          }`}
      >
        {copied ? "Copied!" : "Copy"}
      </button>

      {/* Code Block */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          style={oneDark}
          language={language}
          PreTag="div"
          customStyle={{
            margin: 0,
            background: "transparent",
            padding: "1rem",
            whiteSpace: "pre",
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

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
  const processedContent = content ? preprocessMarkdown(content) : "";

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

      {/* Main content area */}
      <div className="flex flex-1 h-[calc(100vh-4rem)] overflow-hidden">
        {/* Sidebar */}
        {selectedPath.length > 0 && (
          <div
            className={`transition-all duration-300 ease-in-out
              ${sidebarVisible ? "w-1/3 lg:w-1/4" : "w-0"}
              ${
                darkMode
                  ? "bg-[#0a0f1a] border-r border-gray-700"
                  : "bg-gray-50 border-r border-gray-300"
              }
              overflow-y-auto`}
            style={{ maxHeight: "calc(100vh - 4rem)" }}
          >
            {sidebarVisible &&
              renderTree(notesData[selectedPath[0]], [selectedPath[0]])}
          </div>
        )}

        {/* Toggle Button (inline, no overlap) */}
        {selectedPath.length > 0 && (
          <div className="flex items-start">
            <button
              onClick={() => setSidebarVisible(!sidebarVisible)}
              className={`z-40 p-2 transition-colors rounded-r-lg shadow-md
                ${darkMode ? "bg-purple-600 text-white" : "bg-purple-500 text-white"}`}
              style={{ marginTop: "1rem" }}
            >
              {sidebarVisible ? (
                <PanelLeftClose size={18} />
              ) : (
                <PanelLeftOpen size={18} />
              )}
            </button>
          </div>
        )}

        {/* Content Viewer */}
        <div
          className={`flex-1 p-6 overflow-y-auto transition-all duration-300
            ${darkMode ? "border-l border-gray-700" : "border-l border-gray-300"}
            rounded-tl-lg rounded-bl-lg`}
          style={{ maxHeight: "calc(100vh - 4rem)" }}
        >
          {processedContent ? (
            <div
              className={`${
                darkMode ? "prose prose-invert max-w-none" : "prose max-w-none"
              } prose-pre:bg-transparent prose-pre:shadow-none prose-pre:border-0`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  img: (props) => (
                    <img
                      {...props}
                      className="rounded-lg mx-auto my-4 shadow-md"
                      style={{ maxWidth: "100%", height: "auto" }}
                      alt={props.alt}
                    />
                  ),
                  code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const codeString = String(children).replace(/\n$/, "");

                    // Block code
                    if (!inline && match) {
                      return (
                        <CodeBlock language={match[1]} value={codeString} />
                      );
                    }

                    // Inline code
                    return (
                      <code
                        className={`${className} px-1 py-0.5 rounded text-purple-500 font-mono`}
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {processedContent}
              </ReactMarkdown>
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
