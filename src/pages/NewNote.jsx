import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, Clock, Tag, Star } from 'lucide-react';

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

export default function NewNote() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  
  // Load existing notes and extract categories
  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      const parsedNotes = JSON.parse(storedNotes);
      setNotes(parsedNotes);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(parsedNotes
        .map(note => note.category)
        .filter(category => category))];
      setCategories(uniqueCategories);
    }
  }, []);
  
  const handleSave = () => {
    if (!title.trim()) {
      // Use a more subtle notification approach
      alert('Please add a title for your note');
      return;
    }
    
    // Create new note object
    const newNote = {
      id: Date.now(), // Use timestamp as unique ID
      title: title.trim(),
      content: content.trim(),
      date: new Date().toISOString().split('T')[0],
      isPinned,
      category: category || null
    };
    
    // Add to existing notes and save to localStorage
    const updatedNotes = [...notes, newNote];
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    
    // Navigate back to home
    navigate('/');
  };
  
  const handleCancel = () => {
    navigate('/');
  };
  
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory.trim()]);
      setCategory(newCategory.trim());
      setNewCategory('');
      setShowCategoryInput(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-100">
            CREATE <span className={styles.gradientText}>NOTE</span>
          </h1>
          <div className="flex space-x-2">
            <button 
              onClick={handleCancel}
              className="p-2 rounded-lg border border-gray-700 hover:border-red-400 text-gray-400 hover:text-red-400 transition-colors"
            >
              <X size={20} />
            </button>
            <button 
              onClick={handleSave}
              className="p-2 rounded-lg border border-gray-700 hover:border-cyan-400 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Save size={20} />
            </button>
          </div>
        </div>
        
        {/* Note Form */}
        <div className={`${styles.card} p-6`}>
          {/* Title Input */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`${styles.inputField} text-xl font-medium`}
              autoFocus
            />
          </div>
          
          {/* Meta Controls */}
          <div className="flex flex-wrap gap-4 mb-6">
            {/* Date Display */}
            <div className="flex items-center text-gray-400 text-sm">
              <Clock size={16} className="mr-2" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            
            {/* Category Selector */}
            <div className="flex items-center">
              <Tag size={16} className="mr-2 text-gray-400" />
              
              {showCategoryInput ? (
                <div className="flex">
                  <input
                    type="text"
                    placeholder="New category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="bg-gray-900 border border-gray-700 rounded-l-lg px-3 py-1 text-sm text-gray-200 focus:outline-none focus:border-cyan-500"
                    autoFocus
                  />
                  <button 
                    onClick={handleAddCategory}
                    className="bg-gray-800 border border-l-0 border-gray-700 rounded-r-lg px-2 py-1 text-sm text-cyan-400 hover:bg-gray-750"
                  >
                    Add
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-1 text-sm text-gray-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="">No Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => setShowCategoryInput(true)}
                    className="ml-2 text-sm text-cyan-400 hover:text-cyan-300"
                  >
                    + New
                  </button>
                </div>
              )}
            </div>
            
            {/* Pin Toggle */}
            <button
              onClick={() => setIsPinned(!isPinned)}
              className={`flex items-center px-3 py-1 rounded-lg border ${
                isPinned 
                  ? 'border-cyan-500 text-cyan-400 bg-gray-900' 
                  : 'border-gray-700 text-gray-400 hover:border-gray-600'
              }`}
            >
              <Star size={16} className="mr-2" />
              <span className="text-sm">{isPinned ? 'Pinned' : 'Pin Note'}</span>
            </button>
          </div>
          
          {/* Content Textarea */}
          <div className="mb-4">
            <textarea
              placeholder="Write your note content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`${styles.inputField} h-64 resize-none`}
            />
          </div>
          
          {/* Word Count */}
          <div className="text-right text-sm text-gray-500">
            {content.trim() ? content.trim().split(/\s+/).length : 0} words
          </div>
        </div>
        
        {/* Save Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 flex items-center"
          >
            <Save size={18} className="mr-2" />
            SAVE NOTE
          </button>
        </div>
      </div>
    </div>
  );
}