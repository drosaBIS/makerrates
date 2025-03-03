import React, { useState } from 'react';
import { FileDown, Check } from 'lucide-react';
import { RatingItem } from '../types';

interface ExportButtonProps {
  items: {
    languages: RatingItem[];
    frameworks: RatingItem[];
    tools: RatingItem[];
  };
}

const ExportButton: React.FC<ExportButtonProps> = ({ items }) => {
  const [isExporting, setIsExporting] = useState(false);
  
  const formatRatingStars = (rating: number) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };
  
  const exportToClipboard = () => {
    setIsExporting(true);
    
    const formatCategory = (title: string, items: RatingItem[]) => {
      if (items.length === 0) return '';
      
      return `
## ${title}

${items.map(item => `
### ${item.name} ${formatRatingStars(item.rating)} (${item.rating}/5)

**Category:** ${item.category === 'language' ? 'Programming Language' : item.category === 'framework' ? 'Framework' : 'Tool'}
**Description:** ${item.description}
`).join('\n')}
`;
    };
    
    const content = `
# Maker Rating Scales

${formatCategory('Programming Languages', items.languages)}
${formatCategory('Frameworks', items.frameworks)}
${formatCategory('Tools', items.tools)}
`.trim();
    
    navigator.clipboard.writeText(content).then(() => {
      setTimeout(() => {
        setIsExporting(false);
      }, 2000);
    });
  };
  
  return (
    <button
      onClick={exportToClipboard}
      className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-dracula-currentLine rounded-md text-sm font-medium text-gray-700 dark:text-dracula-foreground bg-white dark:bg-dracula-background hover:bg-gray-50 dark:hover:bg-dracula-currentLine"
      disabled={isExporting}
    >
      {isExporting ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          <span>Copied to clipboard</span>
        </>
      ) : (
        <>
          <FileDown className="h-4 w-4 mr-2" />
          <span>Export Ratings</span>
        </>
      )}
    </button>
  );
};

export default ExportButton;