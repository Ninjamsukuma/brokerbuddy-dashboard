
import React, { useState } from 'react';
import { Search, Phone, Video, ChevronRight } from 'lucide-react';
import NavigationBar from '../components/ui/NavigationBar';
import BottomTabs from '../components/ui/BottomTabs';

interface ChatItem {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

const chats: ChatItem[] = [
  {
    id: '1',
    name: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'I found a nice apartment that matches your requirements in Kinondoni. Would you like to schedule a viewing?',
    timestamp: '10:23 AM',
    unread: 3,
    online: true
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'The Toyota Land Cruiser inspection is scheduled for tomorrow at 2 PM. Please confirm if that works for you.',
    timestamp: 'Yesterday',
    unread: 0,
    online: true
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'The valuation report for your property in Mikocheni is ready. I\'ve attached it to this message.',
    timestamp: 'Jun 15',
    unread: 0,
    online: false
  },
  {
    id: '4',
    name: 'Emily Davis',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'Thank you for your interest. I have several properties available in the area you mentioned.',
    timestamp: 'Jun 12',
    unread: 0,
    online: false
  },
  {
    id: '5',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'I can help you sell your Honda Accord. Let\'s discuss the pricing and marketing strategy.',
    timestamp: 'Jun 10',
    unread: 1,
    online: true
  }
];

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <NavigationBar title="Messages" showSearch={false} />
      
      <main className="px-4 pb-4">
        {/* Search input */}
        <div className="pt-4 pb-2 sticky top-[61px] z-30 bg-background animate-fade-in">
          <div className="relative mb-3">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-dalali-500/50 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Chat list */}
        <div className="mt-3 space-y-1 animate-slide-up">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat, index) => (
              <div 
                key={chat.id} 
                className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center space-x-3 card-hover"
                style={{ animationDelay: `${0.05 * index}s` }}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm">
                    <img 
                      src={chat.avatar} 
                      alt={chat.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-dalali-800">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.timestamp}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {chat.unread > 0 && (
                    <div className="w-6 h-6 rounded-full bg-dalali-600 text-white text-xs font-medium flex items-center justify-center">
                      {chat.unread}
                    </div>
                  )}
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-1">No messages found</h3>
              <p className="text-gray-500">Start a conversation with a broker</p>
            </div>
          )}
        </div>
        
        {/* Quick actions */}
        <div className="fixed left-0 right-0 bottom-20 px-4 pb-2">
          <div className="flex justify-around py-3 glassmorphism rounded-xl shadow-sm animate-slide-up">
            <button className="flex flex-col items-center space-y-1">
              <div className="w-10 h-10 rounded-full bg-dalali-50 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-700">New Chat</span>
            </button>
            
            <button className="flex flex-col items-center space-y-1">
              <div className="w-10 h-10 rounded-full bg-dalali-50 flex items-center justify-center">
                <Phone size={20} />
              </div>
              <span className="text-xs font-medium text-gray-700">Call</span>
            </button>
            
            <button className="flex flex-col items-center space-y-1">
              <div className="w-10 h-10 rounded-full bg-dalali-50 flex items-center justify-center">
                <Video size={20} />
              </div>
              <span className="text-xs font-medium text-gray-700">Video</span>
            </button>
          </div>
        </div>
      </main>
      
      <BottomTabs />
    </div>
  );
};

export default Messages;
