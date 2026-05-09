import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Lock, Bell, Palette } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-darkBg overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <SettingsIcon className="text-indigo-600" /> Account Settings
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your account preferences and configurations.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Settings Sidebar */}
            <div className="w-full md:w-64 space-y-2">
              <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'}`}>
                <User size={18} /> Profile Information
              </button>
              <button onClick={() => setActiveTab('security')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'}`}>
                <Lock size={18} /> Security & Passwords
              </button>
              <button onClick={() => setActiveTab('notifications')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'notifications' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'}`}>
                <Bell size={18} /> Notifications
              </button>
              <button onClick={() => setActiveTab('appearance')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'appearance' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'}`}>
                <Palette size={18} /> Appearance
              </button>
            </div>

            {/* Settings Content */}
            <div className="flex-1 card max-w-3xl">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Profile Information</h2>
                  <form className="space-y-6">
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-700 dark:text-indigo-300 text-3xl font-bold border-2 border-indigo-200 dark:border-indigo-800">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <button type="button" className="btn-outline text-sm py-1.5 px-3">Change Avatar</button>
                        <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="label-text">Full Name</label>
                        <input type="text" className="input-field" defaultValue={user?.name} />
                      </div>
                      <div>
                        <label className="label-text">Email Address</label>
                        <input type="email" className="input-field" defaultValue={user?.email} disabled />
                        <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
                      </div>
                      <div>
                        <label className="label-text">Role</label>
                        <input type="text" className="input-field capitalize" defaultValue={user?.role} disabled />
                      </div>
                      <div>
                        <label className="label-text">Timezone</label>
                        <select className="input-field">
                          <option>Pacific Time (PT)</option>
                          <option>Eastern Time (ET)</option>
                          <option>Coordinated Universal Time (UTC)</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                      <button type="button" className="btn-primary">Save Changes</button>
                    </div>
                  </form>
                </div>
              )}
              
              {activeTab !== 'profile' && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 mb-4">
                    {activeTab === 'security' && <Lock size={24} />}
                    {activeTab === 'notifications' && <Bell size={24} />}
                    {activeTab === 'appearance' && <Palette size={24} />}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white capitalize">{activeTab} Settings</h3>
                  <p className="text-gray-500 max-w-sm mt-2">This configuration panel is available in the premium version of SalesVision Dashboard.</p>
                  <button className="btn-outline mt-6">Upgrade to Pro</button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
