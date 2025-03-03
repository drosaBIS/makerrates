import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { RatingItem } from '../types';

interface RatingFormProps {
  onSubmit: (item: Omit<RatingItem, 'id'>) => void;
}

const RatingForm: React.FC<RatingFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'language' | 'framework' | 'tool'>('language');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem: Omit<RatingItem, 'id'> = {
      name,
      category,
      description,
      rating,
      ratingCount: 1,
      likes: 0,
      dislikes: 0,
      comments: 0,
      tags: []
    };
    
    onSubmit(newItem);
    
    // Reset form
    setName('');
    setCategory('language');
    setDescription('');
    setRating(0);
  };
  
  const renderStars = () => {
    return Array(5).fill(0).map((_, index) => {
      const starValue = index + 1;
      const isFilled = (hoverRating !== null ? hoverRating >= starValue : rating >= starValue);
      
      return (
        <Star 
          key={index}
          className={`h-8 w-8 cursor-pointer ${isFilled ? 'text-yellow-400 dark:text-dracula-yellow fill-current' : 'text-gray-300 dark:text-dracula-comment'}`}
          onMouseEnter={() => setHoverRating(starValue)}
          onMouseLeave={() => setHoverRating(null)}
          onClick={() => setRating(starValue)}
        />
      );
    });
  };
  
  return (
    <div className="bg-white dark:bg-dracula-background rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-dracula-foreground mb-6">Add New Rating</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-dracula-foreground mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-dracula-currentLine bg-white dark:bg-dracula-background text-gray-700 dark:text-dracula-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-dracula-purple"
            placeholder="e.g., JavaScript, React, VS Code"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-dracula-foreground mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as 'language' | 'framework' | 'tool')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-dracula-currentLine bg-white dark:bg-dracula-background text-gray-700 dark:text-dracula-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-dracula-purple"
            required
          >
            <option value="language">Programming Language</option>
            <option value="framework">Framework</option>
            <option value="tool">Tool</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-dracula-foreground mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-dracula-currentLine bg-white dark:bg-dracula-background text-gray-700 dark:text-dracula-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-dracula-purple"
            rows={4}
            placeholder="Describe the language, framework, or tool..."
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-dracula-foreground mb-1">
            Rating
          </label>
          <div className="flex space-x-1">
            {renderStars()}
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 dark:bg-dracula-purple text-white py-2 px-4 rounded-md hover:bg-blue-700 dark:hover:bg-dracula-purple/80 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-dracula-purple focus:ring-offset-2"
        >
          Submit Rating
        </button>
      </form>
    </div>
  );
};

export default RatingForm;