import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, Plus, Hash, Smile, Paperclip, Image, Calendar, Video, Users, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import useStore from '../store/useStore';
import * as tf from '@tensorflow/tfjs';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  priority: 'urgent' | 'normal';
  mentions: string[];
  attachments?: string[];
  reactions?: { emoji: string; count: number }[];
}

interface Room {
  id: string;
  name: string;
  type: 'private' | 'group';
  participants: string[];
}

function ChatSystem() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isScheduling, setIsScheduling] = useState(false);
  const [attentionModel, setAttentionModel] = useState<tf.LayersModel | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize attention monitoring
  useEffect(() => {
    const loadModel = async () => {
      const model = await tf.loadLayersModel('https://tfhub.dev/google/tfjs-model/blazeface/1/default/1');
      setAttentionModel(model);
    };
    loadModel();
  }, []);

  // Simulate attention monitoring
  const monitorAttention = async () => {
    if (attentionModel && videoRef.current) {
      const video = tf.browser.fromPixels(videoRef.current);
      const prediction = await attentionModel.predict(video);
      // Process prediction to determine attention level
      video.dispose();
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const mentions = newMessage.match(/@(\w+)/g) || [];
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'Faculty 1',
      content: newMessage,
      timestamp: new Date(),
      priority: newMessage.includes('!urgent') ? 'urgent' : 'normal',
      mentions: mentions.map(m => m.substring(1)),
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
  };

  const scheduleRoom = () => {
    setIsScheduling(true);
    // Room scheduling logic
  };

  return (
    <div className="flex h-full bg-gray-900">
      {/* Channels Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations"
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-2 flex space-x-2">
          <button
            onClick={() => setIsScheduling(true)}
            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-purple-500 hover:bg-purple-600 rounded-xl text-white text-sm transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl text-gray-200 text-sm transition-colors">
            <Video className="w-4 h-4" />
            <span>Meet</span>
          </button>
        </div>

        <div className="px-4 mt-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Direct Messages
          </h3>
          <div className="space-y-1">
            {['Faculty 2', 'Faculty 3', 'Faculty 4'].map((faculty) => (
              <button
                key={faculty}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-700 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium">
                  {faculty[0]}
                </div>
                <span className="text-gray-300 text-sm">{faculty}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 mt-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Channels
          </h3>
          <div className="space-y-1">
            {['announcements', 'general', 'research', 'teaching'].map((channel) => (
              <button
                key={channel}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-gray-700 transition-colors"
              >
                <Hash className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">{channel}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
              F2
            </div>
            <div>
              <h2 className="text-gray-200 font-medium">Faculty 2</h2>
              <p className="text-gray-400 text-sm">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-xl transition-colors">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-xl transition-colors">
              <Users className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-xl transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.priority === 'urgent' ? 'bg-red-500/10 p-4 rounded-xl' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
                {message.sender[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-200">{message.sender}</span>
                  <span className="text-sm text-gray-500">
                    {format(message.timestamp, 'h:mm a')}
                  </span>
                  {message.priority === 'urgent' && (
                    <span className="flex items-center space-x-1 px-2 py-0.5 bg-red-500/20 text-red-500 text-xs rounded-full">
                      <AlertCircle className="w-3 h-3" />
                      <span>Urgent</span>
                    </span>
                  )}
                </div>
                <p className="text-gray-300 mt-1">{message.content}</p>
                {message.mentions.length > 0 && (
                  <div className="flex items-center space-x-2 mt-2">
                    {message.mentions.map((mention) => (
                      <span
                        key={mention}
                        className="px-2 py-0.5 bg-purple-500/20 text-purple-500 text-xs rounded-full"
                      >
                        @{mention}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-xl transition-colors">
                <Plus className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-xl transition-colors">
                <Image className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-xl transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
            </div>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message... Use @mention for notifications or !urgent for priority"
              className="flex-1 px-4 py-2 bg-gray-700 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="p-2 text-white bg-purple-500 rounded-xl hover:bg-purple-600 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Hidden video element for attention monitoring */}
      <video
        ref={videoRef}
        style={{ display: 'none' }}
        autoPlay
        playsInline
      />
    </div>
  );
}

export default ChatSystem;