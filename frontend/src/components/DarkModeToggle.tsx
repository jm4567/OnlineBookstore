import { useState, useEffect } from 'react';

function DarkModeToggle() {
  // Initialize dark mode from localStorage, default to false
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem('darkMode') === 'true'
  );

  // Use effect to apply dark mode based on the state
  useEffect(() => {
    const content = document.getElementById('bookCard');

    if (content) {
      // Toggle dark mode classes on the content container
      if (darkMode) {
        content.classList.add('bg-dark', 'text-light');
        content.classList.remove('bg-light');
      } else {
        content.classList.add('bg-light');
        content.classList.remove('bg-dark', 'text-light');
      }
    }

    // Save the current preference in localStorage
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <button
      className={`btn ${darkMode ? 'btn-light' : 'btn-dark'}`}
      onClick={() => setDarkMode(!darkMode)} // Toggle the dark mode state
    >
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}

export default DarkModeToggle;
