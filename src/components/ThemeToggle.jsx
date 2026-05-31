import React, { useEffect, useState } from 'react';

export default function ThemeToggle({ collapsed = false }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(prev => !prev)}
      title={darkMode ? 'Light Mode' : 'Dark Mode'}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all w-full text-slate-400 hover:bg-white/10 hover:text-white"
    >
      <svg className="w-[18px] h-[18px] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {darkMode ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.36 6.36l-.7-.7M6.34 6.34l-.7-.7m12.02 0l-.7.7M6.34 17.66l-.7.7M12 8a4 4 0 100 8 4 4 0 000-8z" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        )}
      </svg>

      {!collapsed && (
        <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
      )}
    </button>
  );
}