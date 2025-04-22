import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Clock, Tag, Star, Edit, Trash2 } from 'lucide-react';

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

export default function NoteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  
  // Load notes and find the current note
  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      const parsedNotes = JSON.parse(storedNotes);
      setNotes(parsedNotes);
      
      // Find the note with matching ID
      const foundNote = parsedNotes.find(note => note.id === parseInt(id));
      if (foundNote) {
        setNote(foundNote);
        setTitle(foundNote.title);
        setContent(foundNote.content);
        setCategory(foundNote.category || '');
        setIsPinned(foundNote.isPinned || false);
      } else {
        // Note not found, redirect to home
        navigate('/');
      }
      
      // Extract unique categories
      const uniqueCategories = [...new Set(parsedNotes
        .map(note => note.category)
        .filter(category => category))];
      setCategories(uniqueCategories);
    }
  }, [id, navigate]);
  
  const handleSave = () => {
    if (!title.trim()) {
      alert('Please add a title for your note');
      return;
    }
    
    // Create updated note object
    const updatedNote = {
      ...note,
      title: title.trim(),
      content: content.trim(),
      isPinned,
      category: category || null,
      lastEdited: new Date().toISOString().split('T')[0]
    };
    
    // Update notes array and save to localStorage
    const updatedNotes = notes.map(n => n.id === parseInt(id) ? updatedNote : n);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
    setNote(updatedNote);
    setIsEditing(false);
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      const updatedNotes = notes.filter(n => n.id !== parseInt(id));
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      navigate('/');
    }
  };
  
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory.trim()]);
      setCategory(newCategory.trim());
      setNewCategory('');
      setShowCategoryInput(false);
    }
  };
  
  const togglePin = () => {
    setIsPinned(!isPinned);
    if (!isEditing) {
      // If not editing, save the pin state immediately
      const updatedNote = {
        ...note,
        isPinned: !isPinned
      };
      const updatedNotes = notes.map(n => n.id === parseInt(id) ? updatedNote : n);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
      setNote(updatedNote);
    }
  };
  
  if (!note) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 p-4 flex items-center justify-center">
        <div className="text-gray-400">Loading note...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Page Title and Controls */}
        <div className="mb-6 flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft size={20} className="mr-1" />
            <span>Back</span>
          </button>
          
          <div className="flex space-x-2">
            <button 
              onClick={togglePin}
              className={`p-2 rounded-lg border ${
                isPinned 
                ? 'border-cyan-500 text-cyan-400' 
                : 'border-gray-700 text-gray-400 hover:text-cyan-400 hover:border-cyan-400'
              } transition-colors`}
            >
              <Star size={20} />
            </button>
            
            {isEditing ? (
              <button 
                onClick={handleSave}
                className="p-2 rounded-lg border border-gray-700 hover:border-cyan-400 text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Save size={20} />
              </button>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-lg border border-gray-700 hover:border-cyan-400 text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Edit size={20} />
              </button>
            )}
            
            <button 
              onClick={handleDelete}
              className="p-2 rounded-lg border border-gray-700 hover:border-red-400 text-gray-400 hover:text-red-400 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
        
        {/* Note Content */}
        <div className={`${styles.card} p-6`}>
          {/* Title */}
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`${styles.inputField} text-xl font-medium mb-6`}
            />
          ) : (
            <h1 className="text-2xl font-bold text-gray-100 mb-6">{note.title}</h1>
          )}
          
          {/* Meta Information */}
          <div className="flex flex-wrap gap-4 mb-6">
            {/* Date Display */}
            <div className="flex items-center text-gray-400 text-sm">
              <Clock size={16} className="mr-2" />
              <span>Created: {note.date}</span>
              {note.lastEdited && note.lastEdited !== note.date && (
                <span className="ml-2 text-gray-500">(Edited: {note.lastEdited})</span>
              )}
            </div>
            
            {/* Category */}
            {isEditing ? (
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
            ) : note.category ? (
              <div className="flex items-center text-sm">
                <Tag size={16} className="mr-2 text-gray-400" />
                <span className="px-2 py-1 bg-gray-900 text-cyan-300 rounded-lg">
                  {note.category}
                </span>
              </div>
            ) : null}
          </div>
          
          {/* Divider */}
          <div className="h-px bg-gray-700 mb-6"></div>
          
          {/* Content */}
          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`${styles.inputField} h-64 resize-none`}
            />
          ) : (
            <div className="text-gray-300 whitespace-pre-wrap">
              {note.content || <span className="text-gray-500 italic">No content</span>}
            </div>
          )}
          
          {/* Word Count (shown in edit mode) */}
          {isEditing && (
            <div className="text-right text-sm text-gray-500 mt-4">
              {content.trim() ? content.trim().split(/\s+/).length : 0} words
            </div>
          )}
        </div>
        
        {/* Edit/Save Button */}
        {isEditing && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 flex items-center"
            >
              <Save size={18} className="mr-2" />
              SAVE CHANGES
            </button>
          </div>
        )}
      </div>
    </div>
  );
}