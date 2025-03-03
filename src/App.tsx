import React, { useState } from 'react';
import { Code2, Code, Wrench, Search, Plus, X } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import RatingCard from './components/RatingCard';
import RatingForm from './components/RatingForm';
import ExportButton from './components/ExportButton';
import { programmingLanguages, tools, frameworks } from './data/ratingData';
import { RatingItem } from './types';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('languages');
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState({
    languages: [...programmingLanguages],
    frameworks: [...frameworks],
    tools: [...tools]
  });

  const handleAddRating = (newItem: Omit<RatingItem, 'id'>) => {
    const category = newItem.category === 'language' ? 'languages' : 
                    newItem.category === 'framework' ? 'frameworks' : 'tools';
    
    const newId = Math.max(...items[category].map(item => item.id), 0) + 1;
    const itemWithId = { ...newItem, id: newId };
    
    setItems(prev => ({
      ...prev,
      [category]: [...prev[category], itemWithId]
    }));
    
    setShowForm(false);
  };

  const filteredItems = () => {
    let currentItems = [];
    
    switch(activeTab) {
      case 'languages':
        currentItems = items.languages;
        break;
      case 'frameworks':
        currentItems = items.frameworks;
        break;
      case 'tools':
        currentItems = items.tools;
        break;
      default:
        currentItems = items.languages;
    }
    
    if (searchTerm.trim() === '') return currentItems;
    
    return currentItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-dracula-background flex flex-col">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <section className="mb-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-dracula-foreground mb-2">Maker Rating Scales</h1>
              <p className="text-gray-600 dark:text-dracula-comment max-w-2xl mx-auto">
                Rate and compare programming languages, frameworks, and tools
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between max-w-4xl mx-auto mb-6">
              <div className="relative w-full md:w-96 mb-4 md:mb-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 dark:text-dracula-comment" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-dracula-currentLine rounded-md leading-5 bg-white dark:bg-dracula-background text-gray-700 dark:text-dracula-foreground placeholder-gray-500 dark:placeholder-dracula-comment focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-dracula-purple focus:border-blue-500 dark:focus:border-dracula-purple sm:text-sm"
                  placeholder="Search languages, frameworks, or tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex space-x-2">
                <ExportButton items={items} />
                
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 dark:bg-dracula-purple hover:bg-blue-700 dark:hover:bg-dracula-purple/80"
                >
                  {showForm ? (
                    <>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Rating
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {showForm && (
              <div className="max-w-2xl mx-auto mb-6">
                <RatingForm onSubmit={handleAddRating} />
              </div>
            )}
            
            <div className="flex justify-center mb-6">
              <nav className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('languages')}
                  className={`px-4 py-2 rounded-md flex items-center ${
                    activeTab === 'languages' 
                      ? 'bg-blue-600 dark:bg-dracula-purple text-white' 
                      : 'bg-white dark:bg-dracula-currentLine text-gray-700 dark:text-dracula-foreground hover:bg-gray-100 dark:hover:bg-dracula-comment/30'
                  }`}
                >
                  <Code2 className="h-5 w-5 mr-2" />
                  Languages
                </button>
                <button
                  onClick={() => setActiveTab('frameworks')}
                  className={`px-4 py-2 rounded-md flex items-center ${
                    activeTab === 'frameworks' 
                      ? 'bg-blue-600 dark:bg-dracula-purple text-white' 
                      : 'bg-white dark:bg-dracula-currentLine text-gray-700 dark:text-dracula-foreground hover:bg-gray-100 dark:hover:bg-dracula-comment/30'
                  }`}
                >
                  <Code className="h-5 w-5 mr-2" />
                  Frameworks
                </button>
                <button
                  onClick={() => setActiveTab('tools')}
                  className={`px-4 py-2 rounded-md flex items-center ${
                    activeTab === 'tools' 
                      ? 'bg-blue-600 dark:bg-dracula-purple text-white' 
                      : 'bg-white dark:bg-dracula-currentLine text-gray-700 dark:text-dracula-foreground hover:bg-gray-100 dark:hover:bg-dracula-comment/30'
                  }`}
                >
                  <Wrench className="h-5 w-5 mr-2" />
                  Tools
                </button>
              </nav>
            </div>
          </section>
          
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems().map((item) => (
              <RatingCard key={item.id} item={item} />
            ))}
          </section>
          
          {filteredItems().length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-dracula-comment text-lg">No items found matching your search.</p>
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;