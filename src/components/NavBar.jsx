import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Menu } from 'lucide-react';

const styles = {
  gradientText: "bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300",
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold">
              <Link to={"/"}><span className='text-white'>NEXUS</span><span className={styles.gradientText}>NOTES</span></Link>
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/new" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 px-3 py-2">CREATE</Link>
            <Link to="/notes" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 px-3 py-2">ALL NOTES</Link>
            <Link to="/settings" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 p-2 rounded-full">
              <Settings className="w-5 h-5" />
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/new" className="block px-3 py-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300">CREATE</Link>
            <Link to="/notes" className="block px-3 py-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300">ALL NOTES</Link>
            <Link to="/settings" className="block px-3 py-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300">SETTINGS</Link>
          </div>
        </div>
      )}
    </nav>
  );
}