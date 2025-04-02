import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { Calendar, Users, Bell, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import useStore from '../store/useStore';

const COLORS = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981'];

function Dashboard() {
  const { tasks, notifications } = useStore();
  
  const pendingTasksByPriority = [
    { name: 'High', value: tasks.filter(t => t.priority === 'High' && t.status === 'Pending').length },
    { name: 'Medium', value: tasks.filter(t => t.priority === 'Medium' && t.status === 'Pending').length },
    { name: 'Low', value: tasks.filter(t => t.priority === 'Low' && t.status === 'Pending').length },
  ];

  const notificationsByType = [
    { name: 'Mentions', value: notifications.filter(n => n.type === 'Mention').length },
    { name: 'Meetings', value: notifications.filter(n => n.type === 'Meeting').length },
    { name: 'Deadlines', value: notifications.filter(n => n.type === 'Deadline').length },
    { name: 'Updates', value: notifications.filter(n => n.type === 'Update').length },
  ];

  const performanceData = [
    { month: 'Jan', completed: 15, efficiency: 85 },
    { month: 'Feb', completed: 20, efficiency: 88 },
    { month: 'Mar', completed: 25, efficiency: 92 },
    { month: 'Apr', completed: 22, efficiency: 90 },
    { month: 'May', completed: 30, efficiency: 95 },
  ];

  const completedWorkData = [
    { month: 'Jan', Research: 10, Teaching: 15, Admin: 5 },
    { month: 'Feb', Research: 12, Teaching: 18, Admin: 8 },
    { month: 'Mar', Research: 15, Teaching: 20, Admin: 10 },
    { month: 'Apr', Research: 18, Teaching: 22, Admin: 12 },
    { month: 'May', Research: 20, Teaching: 25, Admin: 15 },
  ];

  return (
    <div className="p-8 grid grid-cols-12 gap-8">
      {/* Quick Stats */}
      <div className="col-span-12 grid grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Pending Tasks</p>
              <h3 className="text-2xl font-bold text-gray-200 mt-1">
                {tasks.filter(t => t.status === 'Pending').length}
              </h3>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Completed Tasks</p>
              <h3 className="text-2xl font-bold text-gray-200 mt-1">
                {tasks.filter(t => t.status === 'Completed').length}
              </h3>
            </div>
            <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-pink-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">High Priority</p>
              <h3 className="text-2xl font-bold text-gray-200 mt-1">
                {tasks.filter(t => t.priority === 'High').length}
              </h3>
            </div>
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Unread Notifications</p>
              <h3 className="text-2xl font-bold text-gray-200 mt-1">
                {notifications.filter(n => !n.read).length}
              </h3>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Pending Work Tracker */}
      <div className="col-span-6 bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-gray-200">Pending Work Tracker</h2>
          <p className="text-sm text-gray-400 mt-1">Tasks by priority level</p>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pendingTasksByPriority}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pendingTasksByPriority.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Improvement */}
      <div className="col-span-6 bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-gray-200">Performance Analysis</h2>
          <p className="text-sm text-gray-400 mt-1">Monthly efficiency trends</p>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="efficiency"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: '#8b5cf6' }}
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#ec4899"
                strokeWidth={2}
                dot={{ fill: '#ec4899' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Completed Work Overview */}
      <div className="col-span-8 bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-gray-200">Completed Work Overview</h2>
          <p className="text-sm text-gray-400 mt-1">Monthly completion by category</p>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={completedWorkData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              <Bar dataKey="Research" stackId="a" fill="#8b5cf6" />
              <Bar dataKey="Teaching" stackId="a" fill="#ec4899" />
              <Bar dataKey="Admin" stackId="a" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Notifications Overview */}
      <div className="col-span-4 bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-gray-200">Notifications</h2>
          <p className="text-sm text-gray-400 mt-1">Distribution by type</p>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={notificationsByType}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {notificationsByType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;