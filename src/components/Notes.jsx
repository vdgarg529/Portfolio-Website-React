// src/components/Notes.jsx
import React, { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notesCatalog, CATEGORY_META } from "../constants/public_notes";
import {
  ChevronRight,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  GraduationCap,
  FolderGit2,
  Wrench,
  Home,
  ArrowRight,
  Check,
  Copy,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Icon resolver — maps string names from CATEGORY_META to Lucide components
// ─────────────────────────────────────────────────────────────────────────────
const ICON_MAP = { GraduationCap, FolderGit2, Wrench };

function getCategoryIcon(name, size = 24) {
  const iconName = CATEGORY_META[name]?.icon;
  const Icon = ICON_MAP[iconName];
  return Icon ? <Icon size={size} /> : null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Image resolution (unchanged from original)
// ─────────────────────────────────────────────────────────────────────────────
const images = import.meta.glob("/src/assets/PublicContent/images/*", {
  eager: true,
});

function resolveImagePath(name) {
  const base = name.trim();
  const candidates = [
    base,
    base + ".png",
    base + ".jpg",
    base + ".jpeg",
    base + ".svg",
    base.replace(/ /g, "%20") + ".png",
    base.replace(/ /g, "_") + ".png",
  ];
  for (let candidate of candidates) {
    const match = Object.keys(images).find((key) => key.includes(candidate));
    if (match) return images[match].default;
  }
  return null;
}

function preprocessMarkdown(md) {
  return md.replace(/!\[\[(.*?)\]\]/g, (_, filename) => {
    const src = resolveImagePath(filename.trim());
    return src ? `![](${src})` : `⚠️ Missing image: ${filename}`;
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Code block with copy button (unchanged from original)
// ─────────────────────────────────────────────────────────────────────────────
const CodeBlock = ({ language, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-[#1e1e1e] shadow-lg overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#2d2d2d] border-b border-gray-700/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/90 shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/90 shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/90 shadow-sm"></div>
          </div>
          {language && (
            <span className="ml-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center justify-center p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Copy code"
        >
          {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
        </button>
      </div>
      <div className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="text-gray-100 font-mono whitespace-pre block">
          {value}
        </code>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Helper: walk the catalog tree to the node at a given path
// ─────────────────────────────────────────────────────────────────────────────
function getNodeAtPath(path) {
  let node = notesCatalog;
  for (const key of path) {
    if (node == null || typeof node !== "object") return undefined;
    node = node[key];
  }
  return node;
}

// Check if a node is a "leaf" (has `content`)
function isLeafNode(node) {
  return node != null && typeof node === "object" && "content" in node;
}

// Check if a node's direct children are all leaves (i.e. this is the last
// branch level before content — we should show the sidebar at this point)
function hasOnlyLeafChildren(node) {
  if (node == null || typeof node !== "object" || isLeafNode(node)) return false;
  const values = Object.values(node);
  if (values.length === 0) return false;
  return values.every((v) => isLeafNode(v));
}

// Check if a node has ANY leaf descendant at any depth (i.e. it eventually
// leads to content). We use this to decide whether reaching a node means
// we should show the sidebar tree.
function hasLeafDescendants(node) {
  if (node == null || typeof node !== "object") return false;
  if (isLeafNode(node)) return true;
  return Object.values(node).some((child) => hasLeafDescendants(child));
}

// Determine if a node should show the sidebar+content view.
// A node shows sidebar when it contains leaf children directly OR
// contains a mix of branches and leaves (like DBMS which has both
// leaf "1. Syllabus" and branch "3. Introduction").
function shouldShowSidebar(node) {
  if (node == null || typeof node !== "object" || isLeafNode(node)) return false;
  const values = Object.values(node);
  // If any direct child is a leaf, show sidebar
  return values.some((v) => isLeafNode(v)) || hasOnlyLeafChildren(node);
}

// More nuanced: check if the node is a "content node" — meaning it has
// a mix of leaves and branches, or all leaves. Basically: should we render
// sidebar tree here rather than drill-down cards?
function isContentNode(node) {
  if (node == null || typeof node !== "object" || isLeafNode(node)) return false;
  const values = Object.values(node);
  const hasLeaf = values.some((v) => isLeafNode(v));
  const hasBranch = values.some(
    (v) => typeof v === "object" && !isLeafNode(v)
  );
  // If it has leaves (possibly mixed with branches), it's a content node
  if (hasLeaf) return true;
  // If ALL children themselves are content nodes (e.g. HLD > Security, Load Balancing),
  // then this is still a drill-down level — return false.
  // But if children are leaf-only, return true.
  if (!hasBranch && values.length > 0) return true;
  return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const Notes = ({ darkMode }) => {
  // navigationPath tracks where we are in the catalog hierarchy.
  // e.g. [] = nothing selected, ["Tools"] = top tab, ["Tools", "Python Libraries"] = subcategory
  const [navigationPath, setNavigationPath] = useState([]);
  // selectedLeafPath is the full path to the currently selected leaf note
  const [selectedLeafPath, setSelectedLeafPath] = useState([]);
  const [openNodes, setOpenNodes] = useState(new Set());
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Current node at the navigation path
  const currentNode = useMemo(
    () => getNodeAtPath(navigationPath),
    [navigationPath]
  );

  // Determine if we've drilled deep enough to show sidebar+content.
  // Rule: show sidebar when the current node has at least one DIRECT leaf child.
  // If all direct children are branches, keep showing drill-down cards so the
  // user can pick which branch to explore next.
  const showContentView = useMemo(() => {
    if (currentNode == null || typeof currentNode !== "object") return false;
    if (isLeafNode(currentNode)) return false;
    const values = Object.values(currentNode);
    return values.some((v) => isLeafNode(v));
  }, [currentNode]);

  // ─── Navigation helpers ──────────────────────────────────────────────────
  const navigateTo = (path) => {
    setNavigationPath(path);
    setSelectedLeafPath([]);
    setOpenNodes(new Set());
    setSidebarVisible(true);
  };

  const selectTopCategory = (category) => {
    navigateTo([category]);
  };

  const drillInto = (key) => {
    navigateTo([...navigationPath, key]);
  };

  const navigateToBreadcrumb = (index) => {
    // index is the breadcrumb segment index (0 = first path element)
    navigateTo(navigationPath.slice(0, index + 1));
  };

  // ─── Sidebar tree toggle ────────────────────────────────────────────────
  const toggleNode = (pathKey) => {
    setOpenNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(pathKey)) newSet.delete(pathKey);
      else newSet.add(pathKey);
      return newSet;
    });
  };

  // ─── Recursive sidebar tree (same logic as before) ─────────────────────
  const renderTree = (node, path = []) => (
    <ul className="ml-2 space-y-1">
      {Object.keys(node).map((key) => {
        const newPath = [...path, key];
        const child = node[key];
        const leaf = isLeafNode(child);
        const pathKey = newPath.join(">");
        const isOpen = openNodes.has(pathKey);

        return (
          <li key={pathKey}>
            <div className="flex items-center">
              {!leaf && (
                <button
                  onClick={() => toggleNode(pathKey)}
                  className="mr-1 text-xs flex-shrink-0"
                >
                  {isOpen ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
              )}

              <button
                className={`flex-1 text-left px-2 py-1.5 rounded-md transition-all duration-200 text-sm ${
                  JSON.stringify(selectedLeafPath) ===
                  JSON.stringify(newPath)
                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/30 font-medium"
                    : darkMode
                    ? "hover:bg-white/5 text-gray-300 hover:text-white"
                    : "hover:bg-gray-200 text-gray-700 hover:text-gray-900"
                }`}
                onClick={() => {
                  if (leaf) setSelectedLeafPath(newPath);
                  else toggleNode(pathKey);
                }}
              >
                {key}
              </button>
            </div>

            {!leaf && isOpen && renderTree(child, newPath)}
          </li>
        );
      })}
    </ul>
  );

  // ─── Content resolution ─────────────────────────────────────────────────
  const leafContent = useMemo(() => {
    if (selectedLeafPath.length === 0) return null;
    const node = getNodeAtPath(selectedLeafPath);
    return node?.content ?? null;
  }, [selectedLeafPath]);

  const processedContent = leafContent ? preprocessMarkdown(leafContent) : "";

  // ─── Top-level categories ───────────────────────────────────────────────
  const categories = Object.keys(notesCatalog);
  const activeCategory = navigationPath[0] || null;

  // ─── Render ─────────────────────────────────────────────────────────────
  return (
    <div
      className={`min-h-screen pt-16 relative flex flex-col ${
        darkMode ? "bg-[#050816] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* ══════════════════════════════════════════════════════════════════════
          TOP CATEGORY TABS
          ══════════════════════════════════════════════════════════════════════ */}
      <div
        className={`flex overflow-x-auto sticky top-16 z-10 ${
          darkMode
            ? "bg-[#050816]/95 backdrop-blur-sm border-b border-gray-700/50"
            : "bg-white/95 backdrop-blur-sm border-b border-gray-200"
        }`}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            className={`flex items-center gap-2 px-6 py-3.5 font-semibold whitespace-nowrap transition-all duration-200 ${
              activeCategory === cat
                ? "border-b-[3px] border-purple-500 text-purple-400"
                : darkMode
                ? "hover:text-purple-400 text-gray-400 hover:bg-white/5"
                : "hover:text-purple-600 text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => selectTopCategory(cat)}
          >
            {getCategoryIcon(cat, 18)}
            {cat}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          BREADCRUMB TRAIL
          ══════════════════════════════════════════════════════════════════════ */}
      {navigationPath.length > 0 && (
        <div
          className={`flex items-center gap-1 px-6 py-2.5 text-sm overflow-x-auto ${
            darkMode
              ? "bg-[#0a0f1a]/80 border-b border-gray-800"
              : "bg-gray-100 border-b border-gray-200"
          }`}
        >
          <button
            onClick={() => navigateTo([])}
            className={`flex items-center gap-1 transition-colors hover:text-purple-400 flex-shrink-0 ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            <Home size={14} />
          </button>

          {navigationPath.map((segment, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight
                size={14}
                className={`flex-shrink-0 ${
                  darkMode ? "text-gray-600" : "text-gray-400"
                }`}
              />
              <button
                onClick={() => navigateToBreadcrumb(idx)}
                className={`whitespace-nowrap transition-colors flex-shrink-0 ${
                  idx === navigationPath.length - 1
                    ? "text-purple-400 font-medium"
                    : darkMode
                    ? "text-gray-400 hover:text-purple-400"
                    : "text-gray-500 hover:text-purple-600"
                }`}
              >
                {segment}
              </button>
            </React.Fragment>
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MAIN CONTENT AREA
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 7.5rem)" }}>
        {/* ── STATE 1: No category selected — show landing ──────────────── */}
        {navigationPath.length === 0 && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-2xl">
              <h2
                className={`text-3xl font-bold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                📚 Knowledge Base
              </h2>
              <p
                className={`text-lg mb-10 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Select a category above to explore notes, cheatsheets, and
                documentation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => selectTopCategory(cat)}
                    className={`group relative p-6 rounded-xl border transition-all duration-300 text-left
                      hover:scale-[1.03] hover:shadow-xl
                      ${
                        darkMode
                          ? "bg-white/[0.03] border-white/10 hover:border-purple-500/40 hover:bg-white/[0.06]"
                          : "bg-white border-gray-200 hover:border-purple-300 hover:shadow-purple-100"
                      }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-2 rounded-lg ${
                          darkMode
                            ? "bg-purple-500/10 text-purple-400"
                            : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {getCategoryIcon(cat, 22)}
                      </div>
                      <h3 className="font-semibold text-lg">{cat}</h3>
                    </div>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      {CATEGORY_META[cat]?.description}
                    </p>
                    <ArrowRight
                      size={16}
                      className={`absolute top-6 right-5 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-1 ${
                        darkMode ? "text-purple-400" : "text-purple-500"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── STATE 2: Drill-down cards (subcategory selection) ─────────── */}
        {navigationPath.length > 0 &&
          currentNode &&
          !isLeafNode(currentNode) &&
          !showContentView && (
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <div className="max-w-4xl mx-auto">
                <h2
                  className={`text-2xl font-bold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {navigationPath[navigationPath.length - 1]}
                </h2>
                <p
                  className={`text-sm mb-8 ${
                    darkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Choose a topic to explore
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.keys(currentNode).map((key) => {
                    const child = currentNode[key];
                    const childIsLeaf = isLeafNode(child);
                    const childCount = childIsLeaf
                      ? null
                      : Object.keys(child).length;

                    return (
                      <button
                        key={key}
                        onClick={() => {
                          if (childIsLeaf) {
                            // Directly select this leaf
                            setSelectedLeafPath([...navigationPath, key]);
                          } else {
                            drillInto(key);
                          }
                        }}
                        className={`group relative p-5 rounded-xl border text-left transition-all duration-300
                          hover:scale-[1.02] hover:shadow-lg
                          ${
                            darkMode
                              ? "bg-white/[0.02] border-white/[0.08] hover:border-purple-500/30 hover:bg-white/[0.05]"
                              : "bg-white border-gray-200 hover:border-purple-300 hover:shadow-purple-100/50"
                          }`}
                      >
                        <h3
                          className={`font-semibold mb-1.5 ${
                            darkMode ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          {key}
                        </h3>
                        {childCount !== null && (
                          <p
                            className={`text-xs ${
                              darkMode ? "text-gray-500" : "text-gray-400"
                            }`}
                          >
                            {childCount}{" "}
                            {childCount === 1 ? "item" : "items"}
                          </p>
                        )}
                        <ArrowRight
                          size={14}
                          className={`absolute top-5 right-4 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-1 ${
                            darkMode ? "text-purple-400" : "text-purple-500"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        {/* ── STATE 3: Sidebar + Content viewer ────────────────────────── */}
        {navigationPath.length > 0 && showContentView && (
          <>
            {/* Sidebar */}
            <div
              className={`transition-all duration-300 ease-in-out flex-shrink-0
                ${sidebarVisible ? "w-72 lg:w-80" : "w-0"}
                ${
                  darkMode
                    ? "bg-[#0a0f1a] border-r border-gray-800"
                    : "bg-gray-50 border-r border-gray-200"
                }
                overflow-hidden`}
            >
              <div
                className="overflow-y-auto p-4"
                style={{ height: "100%" }}
              >
                {sidebarVisible && currentNode && renderTree(currentNode, navigationPath)}
              </div>
            </div>

            {/* Toggle sidebar button */}
            <div className="flex items-start flex-shrink-0">
              <button
                onClick={() => setSidebarVisible(!sidebarVisible)}
                className={`z-40 p-2 transition-all duration-200 rounded-r-lg shadow-md
                  ${
                    darkMode
                      ? "bg-purple-600 text-white hover:bg-purple-500"
                      : "bg-purple-500 text-white hover:bg-purple-400"
                  }`}
                style={{ marginTop: "1rem" }}
              >
                {sidebarVisible ? (
                  <PanelLeftClose size={18} />
                ) : (
                  <PanelLeftOpen size={18} />
                )}
              </button>
            </div>

            {/* Content viewer */}
            <div
              className={`flex-1 p-6 overflow-y-auto transition-all duration-300
                ${
                  darkMode
                    ? "border-l border-gray-800"
                    : "border-l border-gray-200"
                }
                rounded-tl-lg rounded-bl-lg`}
            >
              {processedContent ? (
                <div
                  className={`${
                    darkMode
                      ? "prose prose-invert max-w-none"
                      : "prose max-w-none"
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
                        const codeString = String(children).replace(
                          /\n$/,
                          ""
                        );

                        if (!inline && match) {
                          return (
                            <CodeBlock
                              language={match[1]}
                              value={codeString}
                            />
                          );
                        }

                        return (
                          <code
                            className={`px-1.5 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono text-[0.875em] ${className || ""}`}
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
                  <div className="text-center">
                    <p
                      className={`text-lg italic ${
                        darkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      📖 Select a topic from the sidebar to view notes.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Notes;
