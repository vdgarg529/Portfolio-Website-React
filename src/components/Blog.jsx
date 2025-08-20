const Blog = ({ darkMode }) => {
  return (
    <div className={`min-h-screen flex items-center justify-center ${
      darkMode ? 'bg-[#050816] text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <h1 className="text-4xl font-bold">Blog - Coming Soon ✍️</h1>
    </div>
  );
};

export default Blog;
