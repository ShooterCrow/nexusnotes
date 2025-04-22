import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Trash2, Tag, SortDesc, Grid, List as ListIcon } from 'lucide-react';

// Custom styles for our futuristic application (matching home page)
const styles = {
  gradientText: "bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300",
  card: "relative bg-gray-800 border border-gray-700 rounded-lg overflow-hidden transition-all duration-300 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-900/20",
  cardHoverEffect: "before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-500/0 before:to-cyan-500/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity",
  glowEffect: "relative after:absolute after:inset-0 after:rounded-lg after:shadow-[0_0_15px_rgba(34,211,238,0.1)] after:opacity-0 hover:after:opacity-100 after:transition-opacity",
  neonBorder: "border border-gray-700 hover:border-cyan-400 transition-colors duration-300",
  buttonPrimary: "flex items-center justify-center p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all duration-300 shadow-md hover:shadow-cyan-900/20",
  inputField: "w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-cyan-500 transition-colors",
};

export default function AllNotes() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [categories, setCategories] = useState(['all']);
  const [showFilters, setShowFilters] = useState(false);
  
  // Load notes from localStorage
  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      const parsedNotes = JSON.parse(storedNotes);
      setNotes(parsedNotes);
      
      // Extract unique categories
      const uniqueCategories = ['all', ...new Set(parsedNotes
        .map(note => note.category || 'uncategorized')
        .filter(Boolean))];
      setCategories(uniqueCategories);
    }
  }, []);
  
  // Apply filters and search
  useEffect(() => {
    let results = [...notes];
    
    // Filter by category
    if (activeCategory !== 'all') {
      if (activeCategory === 'uncategorized') {
        results = results.filter(note => !note.category);
      } else {
        results = results.filter(note => note.category === activeCategory);
      }
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(note => 
        note.title.toLowerCase().includes(query) || 
        note.content.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    results.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      if (sortOrder === 'newest') {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
    
    setFilteredNotes(results);
  }, [notes, activeCategory, searchQuery, sortOrder]);
  
  const handleDeleteNote = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this note?')) {
      const updatedNotes = notes.filter(note => note.id !== id);
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }
  };
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest');
  };
  
  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Title and Controls */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-100">
            ALL <span className={styles.gradientText}>NOTES</span>
          </h1>
          
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={toggleViewMode}
              className="p-2 rounded-lg border border-gray-700 hover:border-cyan-400 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              {viewMode === 'grid' ? <ListIcon size={20} /> : <Grid size={20} />}
            </button>
            <button 
              onClick={toggleSortOrder}
              className="p-2 rounded-lg border border-gray-700 hover:border-cyan-400 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <SortDesc size={20} />
            </button>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg border ${
                showFilters ? 'border-cyan-500 text-cyan-400' : 'border-gray-700 text-gray-400 hover:text-cyan-400 hover:border-cyan-400'
              } transition-colors`}
            >
              <Filter size={20} />
            </button>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input 
              type="text" 
              className="bg-gray-800 text-gray-300 w-full pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="Search notes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Expandable Filters */}
          {showFilters && (
            <div className={`${styles.card} mt-4 p-4`}>
              <h3 className="text-sm uppercase text-gray-400 mb-2">Filter by Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeCategory === category
                        ? 'bg-cyan-500 bg-opacity-20 text-cyan-300 border border-cyan-500'
                        : 'bg-gray-900 border border-gray-700 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    {category === 'all' ? 'All Notes' : category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Notes Grid or List */}
        {filteredNotes.length > 0 ? (
          <>
            <div className="text-sm text-gray-500 mb-4">
              {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'} found
            </div>
            
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' 
                : 'flex flex-col gap-3'
            }`}>
              {filteredNotes.map(note => (
                <Link 
                  to={`/note/${note.id}`} 
                  key={note.id}
                  className={`${styles.card} ${styles.cardHoverEffect} relative group ${
                    viewMode === 'grid' ? 'p-4' : 'p-4 flex items-start'
                  }`}
                >
                  {viewMode === 'list' && (
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-750 rounded-lg flex items-center justify-center mr-4">
                      <Tag className="text-cyan-400" size={20} />
                    </div>
                  )}
                  
                  <div className={viewMode === 'list' ? 'flex-grow' : ''}>
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-200 text-lg">{note.title}</h3>
                      {note.isPinned && <Star className="text-cyan-400 w-4 h-4 flex-shrink-0" />}
                    </div>
                    
                    <p className={`text-gray-400 text-sm mt-2 ${viewMode === 'grid' ? 'line-clamp-2' : 'line-clamp-1'}`}>
                      {note.content}
                    </p>
                    
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs text-gray-500">{note.date}</span>
                      {note.category && (
                        <span className="text-xs bg-gray-700 text-cyan-300 px-2 py-1 rounded-full">
                          {note.category}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Delete button (shown on hover) */}
                  <button
                    onClick={(e) => handleDeleteNote(note.id, e)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-gray-800 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-red-400 hover:bg-gray-750 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className={`${styles.card} p-8 text-center`}>
            <p className="text-gray-400 mb-4">
              {searchQuery || activeCategory !== 'all' 
                ? 'No notes match your current filters.' 
                : 'No notes yet. Start capturing your thoughts!'}
            </p>
            <Link to="/new" className={`${styles.buttonPrimary} inline-flex px-6`}>
              <span>CREATE FIRST NOTE</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}