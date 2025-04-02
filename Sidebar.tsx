import React from 'react';
import { MessageSquare, BarChart2, Calendar, Users, Settings, GraduationCap, BookOpen, FileText } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-20 bg-gradient-to-b from-gray-800 via-gray-900 to-slate-900 flex flex-col items-center py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-5"></div>
      <div className="relative">
        <div className="mb-12">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
        </div>
        <nav className="flex flex-col items-center space-y-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`group relative p-3 rounded-xl transition-all duration-300 ${
              activeTab === 'dashboard'
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            <BarChart2 className="w-6 h-6" />
            <span className={`absolute left-14 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${
              activeTab === 'dashboard'
                ? 'bg-purple-500 text-white opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-2'
            } group-hover:opacity-100 group-hover:translate-x-0`}>
              Dashboard
            </span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`group relative p-3 rounded-xl transition-all duration-300 ${
              activeTab === 'chat'
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            <MessageSquare className="w-6 h-6" />
            <span className={`absolute left-14 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${
              activeTab === 'chat'
                ? 'bg-purple-500 text-white opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-2'
            } group-hover:opacity-100 group-hover:translate-x-0`}>
              Department Chat
            </span>
          </button>
          <button
            className="group relative p-3 rounded-xl transition-all duration-300 text-gray-400 hover:bg-gray-700"
          >
            <BookOpen className="w-6 h-6" />
            <span className="absolute left-14 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 bg-purple-500 text-white">
              Courses
            </span>
          </button>
          <button
            className="group relative p-3 rounded-xl transition-all duration-300 text-gray-400 hover:bg-gray-700"
          >
            <FileText className="w-6 h-6" />
            <span className="absolute left-14 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 bg-purple-500 text-white">
              Research
            </span>
          </button>
        </nav>
      </div>
      <div className="mt-auto">
        <button className="p-3 rounded-xl text-gray-400 hover:bg-gray-700 transition-all duration-300">
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;