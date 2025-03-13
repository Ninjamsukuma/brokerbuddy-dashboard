
import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Search, Send } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Mock messages data
const mockConversations = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'Is the apartment still available?',
    time: '10:30 AM',
    unread: true,
    propertyTitle: '2BR Apartment in Kinondoni',
  },
  {
    id: '2',
    name: 'Bob Smith',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'I would like to schedule a viewing',
    time: 'Yesterday',
    unread: false,
    propertyTitle: 'Toyota Hilux 2020',
  },
  {
    id: '3',
    name: 'Carol White',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'Can you provide more photos?',
    time: 'Yesterday',
    unread: false,
    propertyTitle: 'Commercial Space in CBD',
  },
  {
    id: '4',
    name: 'David Brown',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'What are the payment terms?',
    time: 'Wed',
    unread: false,
    propertyTitle: 'Land in Mbezi Beach',
  },
];

// Mock chat messages
const mockChatMessages = [
  {
    id: '1',
    sender: 'client',
    message: 'Hello, I\'m interested in the 2BR apartment in Kinondoni.',
    time: '10:15 AM',
  },
  {
    id: '2',
    sender: 'broker',
    message: 'Hi Alice, thank you for your interest. The apartment is still available.',
    time: '10:17 AM',
  },
  {
    id: '3',
    sender: 'client',
    message: 'Great! What\'s the monthly rent and are utilities included?',
    time: '10:20 AM',
  },
  {
    id: '4',
    sender: 'broker',
    message: 'The rent is 500,000 TZS per month. Water is included, but electricity is separate.',
    time: '10:22 AM',
  },
  {
    id: '5',
    sender: 'client',
    message: 'Is the apartment fully furnished?',
    time: '10:25 AM',
  },
  {
    id: '6',
    sender: 'broker',
    message: 'Yes, it comes fully furnished with basic furniture, including beds, sofa, dining table, and kitchen appliances.',
    time: '10:28 AM',
  },
  {
    id: '7',
    sender: 'client',
    message: 'Is the apartment still available?',
    time: '10:30 AM',
  },
];

const BrokerMessages = () => {
  const { t } = useLanguage();
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState(mockChatMessages);
  
  const filteredConversations = mockConversations.filter(
    conv => conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            conv.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    const newMessage = {
      id: (messages.length + 1).toString(),
      sender: 'broker',
      message: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    setMessageText('');
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully",
      duration: 2000,
    });
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden h-[calc(100vh-200px)] flex flex-col sm:flex-row">
      {/* Conversation List */}
      <div className="w-full sm:w-1/3 border-r">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search messages..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-y-auto h-[calc(100vh-260px)]">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${
                selectedConversation?.id === conversation.id ? 'bg-dalali-50' : ''
              }`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={conversation.avatar} alt={conversation.name} />
                    <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {conversation.unread && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-dalali-600 rounded-full border border-white"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className={`font-medium truncate ${conversation.unread ? 'text-dalali-800' : 'text-gray-700'}`}>
                      {conversation.name}
                    </h4>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-1">{conversation.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{conversation.propertyTitle}</p>
                  <p className={`text-sm truncate mt-0.5 ${conversation.unread ? 'font-medium text-gray-800' : 'text-gray-600'}`}>
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-3 border-b flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                  <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-dalali-800">{selectedConversation.name}</h3>
                  <p className="text-xs text-gray-500">{selectedConversation.propertyTitle}</p>
                </div>
              </div>
              <div>
                <Button variant="outline" size="sm">View Profile</Button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'broker' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      msg.sender === 'broker' 
                        ? 'bg-dalali-600 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p>{msg.message}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'broker' ? 'text-dalali-100' : 'text-gray-500'
                    }`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message Input */}
            <div className="p-3 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-dalali-600 text-white hover:bg-dalali-700"
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default BrokerMessages;
