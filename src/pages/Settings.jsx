// Settings.jsx
import React, { useState, useEffect } from 'react';
import { Save, Moon, Sun, RefreshCw, Archive, Trash2, Download, Shield, Paintbrush } from 'lucide-react';

// Reusing the same custom styles from Home.jsx
const styles = {
  gradientText: "bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300",
  card: "relative bg-gray-800 border border-gray-700 rounded-lg overflow-hidden transition-all duration-300 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-900/20",
  cardHoverEffect: "before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-500/0 before:to-cyan-500/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity",
  glowEffect: "relative after:absolute after:inset-0 after:rounded-lg after:shadow-[0_0_15px_rgba(34,211,238,0.1)] after:opacity-0 hover:after:opacity-100 after:transition-opacity",
  neonBorder: "border border-gray-700 hover:border-cyan-400 transition-colors duration-300",
  buttonPrimary: "flex items-center justify-center p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all duration-300 shadow-md hover:shadow-cyan-900/20",
  switchTrack: "bg-gray-700 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
  switchActive: "bg-cyan-600",
  switchKnob: "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
  switchKnobActive: "translate-x-5"
};

export default function Settings() {
  // State for user settings
  const [settings, setSettings] = useState({
    darkMode: true,
    autoSave: true,
    saveInterval: 30,
    defaultCategory: '',
    categories: [],
    sortOrder: 'newest',
    fontFamily: 'Inter',
    fontSize: 'medium',
    compactMode: false,
    accentColor: 'cyan',
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const storedSettings = localStorage.getItem('nexusSettings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    } else {
      // Initialize default settings in localStorage
      localStorage.setItem('nexusSettings', JSON.stringify(settings));
    }
    
    // Load any categories from notes
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      const notes = JSON.parse(storedNotes);
      const categoriesFromNotes = [...new Set(notes.map(note => note.category || 'Uncategorized').filter(Boolean))];
      setSettings(prev => ({
        ...prev,
        categories: categoriesFromNotes
      }));
    }
  }, []);

  // Save settings to localStorage when they change
  const saveSettings = () => {
    localStorage.setItem('nexusSettings', JSON.stringify(settings));
    // Show success message (could be implemented with a toast notification)
    setShowSaveConfirmation(true);
    setTimeout(() => setShowSaveConfirmation(false), 3000);
  };

  // State for new category input
  const [newCategory, setNewCategory] = useState('');
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  // Toggle switches
  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Update settings
  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Add new category
  const addCategory = () => {
    if (newCategory && !settings.categories.includes(newCategory)) {
      setSettings(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory]
      }));
      setNewCategory('');
    }
  };

  // Remove category
  const removeCategory = (category) => {
    setSettings(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category)
    }));
  };

  // Data export function
  const exportData = () => {
    const notes = localStorage.getItem('notes') || '[]';
    const settings = localStorage.getItem('nexusSettings') || '{}';
    
    const exportData = {
      notes: JSON.parse(notes),
      settings: JSON.parse(settings),
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `nexus_notes_backup_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Reset all settings to default
  const resetSettings = () => {
    if (window.confirm('Reset all settings to default values? This cannot be undone.')) {
      const defaultSettings = {
        darkMode: true,
        autoSave: true,
        saveInterval: 30,
        defaultCategory: '',
        categories: settings.categories, // keep existing categories
        sortOrder: 'newest',
        fontFamily: 'Inter',
        fontSize: 'medium',
        compactMode: false,
        accentColor: 'cyan',
      };
      setSettings(defaultSettings);
      localStorage.setItem('nexusSettings', JSON.stringify(defaultSettings));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header section */}
        <section className="mb-10">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
              <div className="w-full h-full bg-gradient-to-bl from-cyan-500 to-transparent"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-100 mb-2">System Settings</h2>
            <p className="text-gray-400 max-w-2xl mb-0">Configure your Nexus Notes experience with personalized preferences.</p>
          </div>
        </section>

        {/* Save notification */}
        {showSaveConfirmation && (
          <div className="fixed bottom-4 right-4 bg-green-900 text-green-100 px-4 py-2 rounded-lg shadow-lg border border-green-700 flex items-center">
            <span className="mr-2">✓</span> Settings saved successfully
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Appearance */}
          <div className="lg:col-span-1">
            <section className={`${styles.card} ${styles.glowEffect} p-6 mb-6`}>
              <div className="flex items-center mb-6">
                <Paintbrush className="text-cyan-400 mr-2" size={18} />
                <h2 className="text-xl font-semibold text-gray-200">APPEARANCE</h2>
              </div>
              
              <div className="space-y-6">
                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-gray-200 font-medium">Dark Mode</label>
                    <p className="text-gray-500 text-sm">Interface color scheme</p>
                  </div>
                  <button 
                    onClick={() => toggleSetting('darkMode')}
                    className={`${styles.switchTrack} ${settings.darkMode ? styles.switchActive : ''}`}
                  >
                    <span className="sr-only">Toggle Dark Mode</span>
                    <span
                      className={`${styles.switchKnob} ${settings.darkMode ? styles.switchKnobActive : ''}`}
                    >
                      {settings.darkMode ? 
                        <Moon className="h-3 w-3 text-cyan-800 absolute top-1 left-1" /> : 
                        <Sun className="h-3 w-3 text-amber-500 absolute top-1 left-1" />
                      }
                    </span>
                  </button>
                </div>
                
                {/* Font Family */}
                <div>
                  <label className="block text-gray-200 font-medium mb-2">Font Family</label>
                  <select
                    value={settings.fontFamily}
                    onChange={(e) => updateSetting('fontFamily', e.target.value)}
                    className="bg-gray-900 text-gray-300 w-full p-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="Inter">Inter (Default)</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="OpenSans">Open Sans</option>
                    <option value="JetBrainsMono">JetBrains Mono</option>
                  </select>
                </div>
                
                {/* Font Size */}
                <div>
                  <label className="block text-gray-200 font-medium mb-2">Font Size</label>
                  <select
                    value={settings.fontSize}
                    onChange={(e) => updateSetting('fontSize', e.target.value)}
                    className="bg-gray-900 text-gray-300 w-full p-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium (Default)</option>
                    <option value="large">Large</option>
                  </select>
                </div>
                
                {/* Compact Mode */}
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-gray-200 font-medium">Compact Mode</label>
                    <p className="text-gray-500 text-sm">Reduce spacing and padding</p>
                  </div>
                  <button 
                    onClick={() => toggleSetting('compactMode')}
                    className={`${styles.switchTrack} ${settings.compactMode ? styles.switchActive : ''}`}
                  >
                    <span className="sr-only">Toggle Compact Mode</span>
                    <span
                      className={`${styles.switchKnob} ${settings.compactMode ? styles.switchKnobActive : ''}`}
                    />
                  </button>
                </div>
                
                {/* Accent Color */}
                <div>
                  <label className="block text-gray-200 font-medium mb-2">Accent Color</label>
                  <select
                    value={settings.accentColor}
                    onChange={(e) => updateSetting('accentColor', e.target.value)}
                    className="bg-gray-900 text-gray-300 w-full p-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="cyan">Cyan (Default)</option>
                    <option value="blue">Blue</option>
                    <option value="purple">Purple</option>
                    <option value="green">Green</option>
                    <option value="pink">Pink</option>
                  </select>
                </div>
              </div>
            </section>
          </div>
          
          {/* Middle column - Note Settings */}
          <div className="lg:col-span-1">
            <section className={`${styles.card} ${styles.glowEffect} p-6 mb-6`}>
              <div className="flex items-center mb-6">
                <Archive className="text-cyan-400 mr-2" size={18} />
                <h2 className="text-xl font-semibold text-gray-200">NOTE SETTINGS</h2>
              </div>
              
              <div className="space-y-6">
                {/* Auto Save */}
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-gray-200 font-medium">Auto Save</label>
                    <p className="text-gray-500 text-sm">Save notes while typing</p>
                  </div>
                  <button 
                    onClick={() => toggleSetting('autoSave')}
                    className={`${styles.switchTrack} ${settings.autoSave ? styles.switchActive : ''}`}
                  >
                    <span className="sr-only">Toggle Auto Save</span>
                    <span
                      className={`${styles.switchKnob} ${settings.autoSave ? styles.switchKnobActive : ''}`}
                    />
                  </button>
                </div>
                
                {/* Save Interval */}
                {settings.autoSave && (
                  <div>
                    <label className="block text-gray-200 font-medium mb-2">Save Interval (seconds)</label>
                    <input
                      type="number"
                      min="5"
                      max="300"
                      value={settings.saveInterval}
                      onChange={(e) => updateSetting('saveInterval', parseInt(e.target.value))}
                      className="bg-gray-900 text-gray-300 w-full p-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                )}
                
                {/* Default Sort Order */}
                <div>
                  <label className="block text-gray-200 font-medium mb-2">Default Sort Order</label>
                  <select
                    value={settings.sortOrder}
                    onChange={(e) => updateSetting('sortOrder', e.target.value)}
                    className="bg-gray-900 text-gray-300 w-full p-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="alphabetical">Alphabetical (A-Z)</option>
                    <option value="reverseAlphabetical">Alphabetical (Z-A)</option>
                  </select>
                </div>
                
                {/* Default Category */}
                <div>
                  <label className="block text-gray-200 font-medium mb-2">Default Category</label>
                  <select
                    value={settings.defaultCategory}
                    onChange={(e) => updateSetting('defaultCategory', e.target.value)}
                    className="bg-gray-900 text-gray-300 w-full p-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="">None</option>
                    {settings.categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </section>
          </div>
          
          {/* Right column - Categories & Data */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories Management */}
            <section className={`${styles.card} ${styles.glowEffect} p-6`}>
              <div className="flex items-center mb-6">
                <Shield className="text-cyan-400 mr-2" size={18} />
                <h2 className="text-xl font-semibold text-gray-200">CATEGORIES</h2>
              </div>
              
              <div className="space-y-4">
                {/* Add new category */}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New category name"
                    className="bg-gray-900 text-gray-300 flex-grow p-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                  <button
                    onClick={addCategory}
                    disabled={!newCategory}
                    className={`${styles.buttonPrimary} px-4 ${!newCategory ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Add
                  </button>
                </div>
                
                {/* Category list */}
                <div className="mt-4">
                  <h3 className="text-sm text-gray-400 mb-2">Current Categories</h3>
                  {settings.categories.length > 0 ? (
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                      {settings.categories.map(category => (
                        <div key={category} className="flex items-center justify-between bg-gray-750 p-2 rounded-lg border border-gray-700">
                          <span className="text-cyan-300">{category}</span>
                          <button
                            onClick={() => removeCategory(category)}
                            className="text-gray-400 hover:text-red-400"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-800">
                      <p className="text-gray-500">No categories created yet</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
            
            {/* Data Management */}
            <section className={`${styles.card} ${styles.glowEffect} p-6`}>
              <div className="flex items-center mb-6">
                <Download className="text-cyan-400 mr-2" size={18} />
                <h2 className="text-xl font-semibold text-gray-200">DATA MANAGEMENT</h2>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={exportData}
                  className={`${styles.buttonPrimary} w-full`}
                >
                  <Download className="text-cyan-400 mr-2" size={16} />
                  <span>Export All Data</span>
                </button>
                
                <button
                  onClick={resetSettings}
                  className={`${styles.buttonPrimary} w-full`}
                >
                  <RefreshCw className="text-yellow-400 mr-2" size={16} />
                  <span>Reset Settings</span>
                </button>
              </div>
            </section>
          </div>
        </div>
        
        {/* Save button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={saveSettings}
            className={`${styles.buttonPrimary} px-8 py-3`}
          >
            <Save className="text-cyan-400 mr-2" size={18} />
            <span className="font-medium">SAVE SETTINGS</span>
          </button>
        </div>
      </main>
    </div>
  );
}