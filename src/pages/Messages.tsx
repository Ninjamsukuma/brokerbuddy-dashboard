import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Phone, Video, ChevronRight, MessageSquare, X, ArrowLeft, Send, Mic, 
         Image, Smile, Paperclip, Home, Car, Shield, Shirt } from 'lucide-react';
import NavigationBar from '../components/ui/NavigationBar';
import BottomTabs from '../components/ui/BottomTabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from '@/hooks/useLanguage';

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

interface ChatMessage {
  id: string;
  sender: 'user' | 'other';
  text: string;
  timestamp: string;
  read: boolean;
}

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  
  const [newMessage, setNewMessage] = useState('');
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'other',
      text: 'Hello! How can I help you today?',
      timestamp: '10:01 AM',
      read: true
    },
    {
      id: '2',
      sender: 'user',
      text: 'I\'m looking for a 3-bedroom apartment in Mikocheni.',
      timestamp: '10:02 AM',
      read: true
    },
    {
      id: '3',
      sender: 'other',
      text: 'Great! I have several options available. What\'s your budget range?',
      timestamp: '10:05 AM',
      read: true
    },
    {
      id: '4',
      sender: 'user',
      text: 'Around $800-1000 per month.',
      timestamp: '10:07 AM',
      read: true
    },
    {
      id: '5',
      sender: 'other',
      text: 'Perfect. I\'ll send you some listings shortly. Would you prefer furnished or unfurnished?',
      timestamp: '10:10 AM',
      read: false
    }
  ]);
  
  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const activeChat = chats.find(chat => chat.id === activeChatId);
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      read: false
    };
    
    setChatMessages([...chatMessages, newMsg]);
    setNewMessage('');
    
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'other',
        text: 'Thanks for your message. I\'ll get back to you shortly.',
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        read: false
      };
      
      setChatMessages(prev => [...prev, replyMsg]);
    }, 2000);
  };
  
  const handleNewChat = () => {
    toast({
      title: "New Chat Started",
      description: "You can now select a broker to chat with",
      duration: 3000,
    });
    setIsNewChatOpen(false);
    navigate('/find-broker');
  };
  
  const handleCall = (chatId: string) => {
    const chat = chats.find(c => c.id === chatId);
    
    setIsCallDialogOpen(true);
    
    setTimeout(() => {
      toast({
        title: "Call Connected",
        description: `You are now in a call with ${chat?.name}`,
        duration: 3000,
      });
    }, 2000);
  };
  
  const handleVideoCall = (chatId: string) => {
    const chat = chats.find(c => c.id === chatId);
    
    setIsVideoDialogOpen(true);
    
    setTimeout(() => {
      toast({
        title: "Video Call Connected",
        description: `You are now in a video call with ${chat?.name}`,
        duration: 3000,
      });
    }, 2000);
  };
  
  const handleChatClick = (chatId: string) => {
    setActiveChatId(chatId);
    
    setChatMessages(prev => 
      prev.map(msg => ({
        ...msg,
        read: true
      }))
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <NavigationBar title="Messages" showSearch={false} />
      
      <main className="px-4 pb-4">
        {activeChatId ? (
          <div className="flex flex-col h-[calc(100vh-180px)]">
            <div className="flex items-center justify-between py-3 border-b mb-2">
              <div className="flex items-center">
                <button 
                  className="mr-2 p-1 rounded-full hover:bg-gray-100"
                  onClick={() => setActiveChatId(null)}
                >
                  <ArrowLeft size={20} />
                </button>
                
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img 
                      src={activeChat?.avatar} 
                      alt={activeChat?.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {activeChat?.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                
                <div className="ml-2">
                  <h3 className="font-semibold">{activeChat?.name}</h3>
                  <p className="text-xs text-gray-500">
                    {activeChat?.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={() => handleCall(activeChatId)}
                >
                  <Phone size={18} />
                </button>
                <button 
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={() => handleVideoCall(activeChatId)}
                >
                  <Video size={18} />
                </button>
              </div>
            </div>
            
            <div className="flex-grow overflow-y-auto mb-4 space-y-4 p-2">
              {chatMessages.map(message => (
                <div 
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[75%] rounded-lg px-4 py-2 ${
                      message.sender === 'user' 
                        ? 'bg-dalali-600 text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p>{message.text}</p>
                    <div className="flex items-center justify-end mt-1 space-x-1">
                      <span className="text-xs opacity-70">{message.timestamp}</span>
                      {message.sender === 'user' && (
                        <span className="text-xs opacity-70">
                          {message.read ? '✓✓' : '✓'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center bg-white border rounded-full px-3 py-1">
              <button className="p-2 text-gray-500">
                <Smile size={20} />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-grow mx-2 py-2 bg-transparent border-none focus:outline-none"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button className="p-2 text-gray-500">
                <PaperClip size={20} />
              </button>
              <button 
                className="p-2 text-gray-500"
                onClick={handleSendMessage}
              >
                <Send size={20} className="text-dalali-600" />
              </button>
            </div>
          </div>
        ) : (
          <>
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
            
            <div className="mt-3 space-y-1 animate-slide-up">
              {filteredChats.length > 0 ? (
                filteredChats.map((chat, index) => (
                  <div 
                    key={chat.id} 
                    className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center space-x-3 card-hover cursor-pointer"
                    style={{ animationDelay: `${0.05 * index}s` }}
                    onClick={() => handleChatClick(chat.id)}
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
            
            <div className="fixed left-0 right-0 bottom-20 px-4 pb-2">
              <div className="flex justify-around py-3 glassmorphism rounded-xl shadow-sm animate-slide-up">
                <button 
                  className="flex flex-col items-center space-y-1"
                  onClick={() => setIsNewChatOpen(true)}
                >
                  <div className="w-10 h-10 rounded-full bg-dalali-50 flex items-center justify-center">
                    <MessageSquare size={20} />
                  </div>
                  <span className="text-xs font-medium text-gray-700">New Chat</span>
                </button>
                
                <button 
                  className="flex flex-col items-center space-y-1"
                  onClick={() => {
                    toast({
                      title: "Call Feature",
                      description: "Please select a chat first to make a call",
                      duration: 3000,
                    });
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-dalali-50 flex items-center justify-center">
                    <Phone size={20} />
                  </div>
                  <span className="text-xs font-medium text-gray-700">Call</span>
                </button>
                
                <button 
                  className="flex flex-col items-center space-y-1"
                  onClick={() => {
                    toast({
                      title: "Video Call Feature",
                      description: "Please select a chat first to make a video call",
                      duration: 3000,
                    });
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-dalali-50 flex items-center justify-center">
                    <Video size={20} />
                  </div>
                  <span className="text-xs font-medium text-gray-700">Video</span>
                </button>
              </div>
            </div>
          </>
        )}
      </main>
      
      <Dialog open={isNewChatOpen} onOpenChange={setIsNewChatOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('newChat')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Start a conversation with a broker who can help you with:</p>
            <div className="grid grid-cols-2 gap-2">
              <button 
                className="p-3 border rounded-lg hover:bg-gray-50 flex items-center space-x-2"
                onClick={handleNewChat}
              >
                <Home size={18} />
                <span>Real Estate</span>
              </button>
              <button 
                className="p-3 border rounded-lg hover:bg-gray-50 flex items-center space-x-2"
                onClick={handleNewChat}
              >
                <Car size={18} />
                <span>Car Sales</span>
              </button>
              <button 
                className="p-3 border rounded-lg hover:bg-gray-50 flex items-center space-x-2"
                onClick={handleNewChat}
              >
                <Shield size={18} />
                <span>Insurance</span>
              </button>
              <button 
                className="p-3 border rounded-lg hover:bg-gray-50 flex items-center space-x-2"
                onClick={handleNewChat}
              >
                <Shirt size={18} />
                <span>Clothing</span>
              </button>
            </div>
            <button 
              className="w-full py-2 bg-dalali-600 text-white rounded-lg mt-4"
              onClick={() => navigate('/find-broker')}
            >
              Browse All Brokers
            </button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isCallDialogOpen} onOpenChange={setIsCallDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="py-8 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-dalali-100">
              <img 
                src={activeChat?.avatar || chats[0].avatar} 
                alt="Caller" 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold mb-1">{activeChat?.name || chats[0].name}</h2>
            <p className="text-gray-500 mb-8">Calling...</p>
            
            <div className="flex space-x-4">
              <button 
                className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white"
                onClick={() => {
                  setIsCallDialogOpen(false);
                  toast({
                    title: "Call Ended",
                    description: "The call has been ended",
                    duration: 3000,
                  });
                }}
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="py-4 flex flex-col items-center">
            <div className="relative w-full h-64 bg-gray-200 rounded-lg mb-4 overflow-hidden">
              <img 
                src={activeChat?.avatar || chats[0].avatar} 
                alt="Video feed" 
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
              <div className="absolute bottom-4 right-4 w-20 h-20 bg-dalali-600 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Your video" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <h2 className="text-lg font-semibold mb-1">{activeChat?.name || chats[0].name}</h2>
            <p className="text-gray-500 mb-4">Video call in progress</p>
            
            <div className="flex space-x-4">
              <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <Mic size={20} />
              </button>
              <button 
                className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white"
                onClick={() => {
                  setIsVideoDialogOpen(false);
                  toast({
                    title: "Video Call Ended",
                    description: "The video call has been ended",
                    duration: 3000,
                  });
                }}
              >
                <X size={20} />
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <Video size={20} />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <BottomTabs />
    </div>
  );
};

export default Messages;
