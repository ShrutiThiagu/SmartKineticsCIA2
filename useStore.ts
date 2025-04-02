import { create } from 'zustand';

interface Task {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Completed';
  category: string;
  dueDate: Date;
}

interface Notification {
  id: string;
  type: 'Mention' | 'Meeting' | 'Deadline' | 'Update';
  message: string;
  timestamp: Date;
  read: boolean;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  priority: 'urgent' | 'normal';
  mentions: string[];
}

interface StoreState {
  tasks: Task[];
  notifications: Notification[];
  messages: Message[];
  addTask: (task: Task) => void;
  addNotification: (notification: Notification) => void;
  addMessage: (message: Message) => void;
  markNotificationAsRead: (id: string) => void;
}

const useStore = create<StoreState>((set) => ({
  tasks: [],
  notifications: [],
  messages: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  addNotification: (notification) =>
    set((state) => ({ notifications: [...state.notifications, notification] })),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
}));

export default useStore;