import React, { useState } from 'react';
import { GraduationCap, BarChart2, Bell, Calendar, Users } from 'lucide-react';
import ChatSystem from './components/ChatSystem';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-slate-800">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-16 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 flex items-center justify-between px-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {activeTab === 'dashboard' ? 'SNUC Faculty Dashboard' : 'SNUC Faculty Communication'}
            </h1>
            <span className="px-3 py-1 text-xs font-medium text-purple-400 bg-purple-400/10 rounded-full">
              Shiv Nadar University Chennai
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <button className="p-2 hover:bg-gray-700 rounded-xl transition-colors">
                <Bell className="w-5 h-5 text-purple-400" />
              </button>
              <span className="absolute top-0 right-0 w-2 h-2 bg-pink-500 rounded-full"></span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                F1
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-200">Faculty 1</p>
                <p className="text-gray-400">School of Computing</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[calc(100vh-4rem)] overflow-auto">
          {activeTab === 'dashboard' ? <Dashboard /> : <ChatSystem />}
        </div>
      </div>
    </div>
  );
}

export default App;