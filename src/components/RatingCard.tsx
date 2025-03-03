import React, { useState, useRef } from 'react';
import { Star, Copy, Check } from 'lucide-react';
import { RatingItem } from '../types';

interface RatingCardProps {
  item: RatingItem;
}

const RatingCard: React.FC<RatingCardProps> = ({ item }) => {
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleRating = (rating: number) => {
    setUserRating(rating);
  };
  
  const renderStars = () => {
    return Array(5).fill(0).map((_, index) => {
      const starValue = index + 1;
      const isFilled = (hoverRating !== null ? hoverRating >= starValue : userRating !== null ? userRating >= starValue : item.rating >= starValue);
      
      return (
        <Star 
          key={index}
          className={`h-6 w-6 cursor-pointer ${isFilled ? 'text-yellow-400 dark:text-dracula-yellow fill-current' : 'text-gray-300 dark:text-dracula-comment'}`}
          onMouseEnter={() => setHoverRating(starValue)}
          onMouseLeave={() => setHoverRating(null)}
          onClick={() => handleRating(starValue)}
        />
      );
    });
  };
  
  const copyToClipboard = () => {
    if (!cardRef.current) return;
    
    const content = `
Name: ${item.name}
Category: ${item.category === 'language' ? 'Programming Language' : item.category === 'framework' ? 'Framework' : 'Tool'}
Rating: ${item.rating}/5
Description: ${item.description}
    `.trim();
    
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  return (
    <div ref={cardRef} className="bg-white dark:bg-dracula-background rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-dracula-foreground">{item.name}</h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            item.category === 'language' ? 'bg-blue-100 text-blue-800 dark:bg-dracula-purple/20 dark:text-dracula-purple' : 
            item.category === 'framework' ? 'bg-purple-100 text-purple-800 dark:bg-dracula-pink/20 dark:text-dracula-pink' : 
            'bg-green-100 text-green-800 dark:bg-dracula-green/20 dark:text-dracula-green'
          }`}>
            {item.category === 'language' ? 'Language' : 
             item.category === 'framework' ? 'Framework' : 'Tool'}
          </span>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="flex mr-2">
            {renderStars()}
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-dracula-foreground mb-4">{item.description}</p>
        
        <div className="flex justify-end">
          <button 
            onClick={copyToClipboard}
            className="flex items-center text-gray-500 dark:text-dracula-comment hover:text-blue-600 dark:hover:text-dracula-cyan px-3 py-1 border border-gray-200 dark:border-dracula-currentLine rounded-md"
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                <span className="text-sm">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                <span className="text-sm">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingCard;