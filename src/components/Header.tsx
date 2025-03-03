import React from 'react';
import { Star, Github } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="bg-white dark:bg-dracula-background shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="flex items-center text-blue-600 dark:text-dracula-purple">
              <Star className="h-6 w-6 fill-current" />
              <span className="ml-2 text-xl font-bold">MakerRates</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/drosaBIS/makerrates" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 dark:text-dracula-foreground hover:text-blue-600 dark:hover:text-dracula-cyan"
              aria-label="GitHub repository"
            >
              <Github className="h-5 w-5" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;