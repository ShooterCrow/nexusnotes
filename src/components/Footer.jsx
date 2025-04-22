// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
    gradientText: "bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300",
};

export default function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 py-6">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-xl font-bold">
                            <Link to={"/"}><span className='text-white'>NEXUS</span><span className={styles.gradientText}>NOTES</span></Link>
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">Streamlined thought capture. Enhanced organization.</p>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
                        <div className="flex flex-row space-x-4">
                            <Link to="/notes" className="text-gray-400 hover:text-cyan-400 transition-colors">All Notes</Link>
                            <Link to="/new" className="text-gray-400 hover:text-cyan-400 transition-colors">Create</Link>
                            <Link to="/settings" className="text-gray-400 hover:text-cyan-400 transition-colors">Settings</Link>
                        </div>
                        <a href="https://github.com/ShooterCrow" target="_blank" rel="noopener noreferrer" class="font-bold text-white mt-4 md:mt-0">Victor - Github</a>
                    </div>

                </div>
            </div>
        </footer>
    );
}

