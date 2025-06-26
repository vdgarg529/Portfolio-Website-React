import { useEffect, useState } from 'react';

const Footer = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();
  const [uniqueVisits, setUniqueVisits] = useState(null);
  const [totalVisits, setTotalVisits] = useState(null);

  useEffect(() => {
    const uniqueKey = 'vdgarg529-portfolio-uniquevisits';
    const totalKey = 'vdgarg529-portfolio-totalvisits';

    const hasVisited = localStorage.getItem(uniqueKey);

    // Increment total visits every page load
    fetch(`https://api.countapi.xyz/update/vdgarg529-portfolio/totalvisits/?amount=1`)
      .then(res => res.json())
      .then(data => setTotalVisits(data.value))
      .catch(() => setTotalVisits(null));

    // Increment unique visits only once per visitor
    if (!hasVisited) {
      fetch(`https://api.countapi.xyz/update/vdgarg529-portfolio/uniquevisits/?amount=1`)
        .then(res => res.json())
        .then(data => {
          setUniqueVisits(data.value);
          localStorage.setItem(uniqueKey, 'true');
        })
        .catch(() => setUniqueVisits(null));
    } else {
      fetch(`https://api.countapi.xyz/get/vdgarg529-portfolio/uniquevisits`)
        .then(res => res.json())
        .then(data => setUniqueVisits(data.value))
        .catch(() => setUniqueVisits(null));
    }
  }, []);

  return (
    <footer className={`py-12 ${darkMode ? 'bg-[#090325]' : 'bg-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a
              href="#hero"
              className="text-2xl font-bold bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 text-transparent"
            >
              Portfolio
            </a>
            <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Creating amazing digital experiences
            </p>
          </div>

          <div className="flex flex-col space-y-2 text-center mt-6 md:mt-0">
            {uniqueVisits !== null && (
              <div
                className={`px-4 py-2 rounded-lg font-medium ${
                  darkMode ? 'bg-gray-800 text-purple-300' : 'bg-gray-200 text-purple-600'
                }`}
              >
                Unique Visitors: <span className="font-bold">{uniqueVisits}</span>
              </div>
            )}
            {totalVisits !== null && (
              <div
                className={`px-4 py-2 rounded-lg font-medium ${
                  darkMode ? 'bg-gray-800 text-pink-300' : 'bg-gray-200 text-pink-600'
                }`}
              >
                Total Visits: <span className="font-bold">{totalVisits}</span>
              </div>
            )}
          </div>
        </div>

        <div
          className={`mt-8 pt-8 text-center ${
            darkMode ? 'border-t border-gray-800 text-gray-500' : 'border-t border-gray-200 text-gray-600'
          }`}
        >
          <p>© {currentYear} My Portfolio. All rights reserved.</p>
          <p className="mt-2">Designed and built with ❤️ by Vardan Garg</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
