import React from 'react';
import { Star, Heart, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-dracula-currentLine text-gray-600 dark:text-dracula-foreground py-6">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center text-blue-600 dark:text-dracula-purple mb-2">
          <Star className="h-5 w-5 fill-current" />
          <span className="ml-2 text-lg font-medium">MakerRates</span>
        </div>
        <div className="max-w-md mx-auto mb-3">
          <p className="text-sm mb-2">
            Developed by Daniel De la rosa. Software and Hardware Developer.
          </p>
          <p className="text-sm flex items-center justify-center">
            With <Heart className="h-4 w-4 mx-1 fill-current text-red-500 dark:text-dracula-red" /> from Barranquilla, Colombia. Using AI bolt.new
          </p>
        </div>
        <div className="flex justify-center space-x-4 my-3">
          <a 
            href="https://github.com/drosaBIS/makerrates" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-dracula-foreground hover:text-blue-600 dark:hover:text-dracula-cyan"
            aria-label="GitHub repository"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
        <div className="text-xs text-gray-500 dark:text-dracula-comment mt-3">
          <p>Rate your favorite tech stack! 💻 🚀 🔧</p>
        </div>
        <p className="text-sm mt-3">&copy; {new Date().getFullYear()} MakerRates</p>
      </div>
    </footer>
  );
};

export default Footer;