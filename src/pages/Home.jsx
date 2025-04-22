// Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Star, Clock, List, Search } from 'lucide-react';

// Custom styles for our futuristic application
const styles = {
  gradientText: "bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300",
  card: "relative bg-gray-800 border border-gray-700 rounded-lg overflow-hidden transition-all duration-300 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-900/20",
  cardHoverEffect: "before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-500/0 before:to-cyan-500/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity",
  glowEffect: "relative after:absolute after:inset-0 after:rounded-lg after:shadow-[0_0_15px_rgba(34,211,238,0.1)] after:opacity-0 hover:after:opacity-100 after:transition-opacity",
  neonBorder: "border border-gray-700 hover:border-cyan-400 transition-colors duration-300",
  buttonPrimary: "flex items-center justify-center p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all duration-300 shadow-md hover:shadow-cyan-900/20",
};

export default function Home() {
  const [notes, setNotes] = useState([]);
  
  // Initialize notes from localStorage
  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    } else {
      // Sample data for first time users
      const initialNotes = [
        { 
          id: 1, 
          title: 'Welcome to NEXUS NOTES', 
          content: 'This is your personal digital thought space. Organized. Efficient. Futuristic.',
          date: new Date().toISOString().split('T')[0], 
          isPinned: true,
          category: 'System'
        },
        { 
          id: 2, 
          title: 'Getting Started Guide', 
          content: 'Create your first note using the + button on the dashboard. Organize with categories. Pin important thoughts.',
          date: new Date().toISOString().split('T')[0], 
          isPinned: false,
          category: 'Tutorial'
        },
      ];
      setNotes(initialNotes);
      localStorage.setItem('notes', JSON.stringify(initialNotes));
    }
  }, []);

  // Sort notes by date (newest first)
  const recentNotes = [...notes].sort((a, b) => new Date(b.date) - new Date(a.date));
  const pinnedNotes = notes.filter(note => note.isPinned);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero section */}
        <section className="mb-12">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
              <div className="w-full h-full bg-gradient-to-bl from-cyan-500 to-transparent"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-100 mb-2">Digital Thought Space</h2>
            <p className="text-gray-400 max-w-2xl mb-6">Organize your ideas, plans, and inspirations in a seamless digital environment.</p>
            <Link to="/new" className={`${styles.buttonPrimary} inline-flex px-6`}>
              <PlusCircle className="text-cyan-400 mr-2" size={18} />
              <span className="font-medium">NEW NOTE</span>
            </Link>
          </div>
        </section>
        
        {/* Quick stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className={`${styles.card} ${styles.glowEffect} p-4`}>
            <div className="flex justify-between items-center">
              <h3 className="text-lg text-gray-200">Total Notes</h3>
              <div className="bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center">
                <span className="text-cyan-400 font-medium">{notes.length}</span>
              </div>
            </div>
          </div>
          <div className={`${styles.card} ${styles.glowEffect} p-4`}>
            <div className="flex justify-between items-center">
              <h3 className="text-lg text-gray-200">Pinned</h3>
              <div className="bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center">
                <span className="text-cyan-400 font-medium">{pinnedNotes.length}</span>
              </div>
            </div>
          </div>
          <div className={`${styles.card} ${styles.glowEffect} p-4`}>
            <div className="flex justify-between items-center">
              <h3 className="text-lg text-gray-200">Categories</h3>
              <div className="bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center">
                <span className="text-cyan-400 font-medium">
                  {new Set(notes.map(note => note.category || 'Uncategorized')).size}
                </span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pinned notes */}
        {pinnedNotes.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center mb-4">
              <Star className="text-cyan-400 mr-2" size={18} />
              <h2 className="text-xl font-semibold text-gray-200">PINNED NOTES</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pinnedNotes.map(note => (
                <Link to={`/note/${note.id}`} key={note.id} className={`${styles.card} ${styles.cardHoverEffect} ${styles.glowEffect} p-4`}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-200 text-lg">{note.title}</h3>
                    <Star className="text-cyan-400 w-4 h-4 flex-shrink-0" />
                  </div>
                  <p className="text-gray-400 text-sm mt-2 line-clamp-2">{note.content}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-gray-500">{note.date}</span>
                    {note.category && (
                      <span className="text-xs bg-gray-700 text-cyan-300 px-2 py-1 rounded-full">
                        {note.category}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
        
        {/* Recent notes */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Clock className="text-cyan-400 mr-2" size={18} />
              <h2 className="text-xl font-semibold text-gray-200">RECENT NOTES</h2>
            </div>
            <Link to="/notes" className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center">
              <span>VIEW ALL</span>
              <div className="h-px w-0 bg-cyan-400 group-hover:w-full transition-all duration-300 mt-1"></div>
            </Link>
          </div>
          
          {recentNotes.length > 0 ? (
            <div className={`${styles.card} overflow-hidden`}>
              {recentNotes.slice(0, 5).map((note, index) => (
                <Link 
                  to={`/note/${note.id}`} 
                  key={note.id} 
                  className={`block p-4 border-b border-gray-700 last:border-b-0 hover:bg-gray-750 transition duration-300 ${
                    index === 0 ? 'border-l-4 border-l-cyan-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-200">{note.title}</h3>
                      <p className="text-gray-400 text-sm mt-1 line-clamp-1">{note.content}</p>
                    </div>
                    <div className="flex items-center">
                      {note.isPinned && <Star className="text-cyan-400 w-4 h-4 ml-2" />}
                      {note.category && (
                        <span className="text-xs bg-gray-700 text-cyan-300 px-2 py-1 rounded-full ml-2">
                          {note.category}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">{note.date}</div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={`${styles.card} p-8 text-center`}>
              <p className="text-gray-400 mb-4">No notes yet. Start capturing your thoughts!</p>
              <Link to="/new" className={`${styles.buttonPrimary} inline-flex px-6`}>
                <PlusCircle className="text-cyan-400 mr-2" size={18} />
                <span>CREATE FIRST NOTE</span>
              </Link>
            </div>
          )}
        </section>
        
        {/* Search and quick actions */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`${styles.card} p-6`}>
            <h3 className="text-lg font-medium text-gray-200 mb-4">Quick Search</h3>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input 
                type="text" 
                className="bg-gray-900 text-gray-300 w-full pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="Search notes..." 
              />
            </div>
          </div>
          
          <div className={`${styles.card} p-6`}>
            <h3 className="text-lg font-medium text-gray-200 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/new" className={`${styles.buttonPrimary}`}>
                <PlusCircle className="text-cyan-400 mr-2" size={16} />
                <span>New Note</span>
              </Link>
              <Link to="/notes" className={`${styles.buttonPrimary}`}>
                <List className="text-cyan-400 mr-2" size={16} />
                <span>All Notes</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}