
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  PhoneOff, 
  VideoOff,
  Mic,
  MicOff,
  Users,
  Search,
  MoreVertical
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'system';
  role?: 'admin' | 'teacher' | 'student' | 'parent';
}

interface Contact {
  id: string;
  name: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  status: 'online' | 'offline' | 'busy';
  lastMessage?: string;
  unreadCount?: number;
}

const ChatPage = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const userRole = (localStorage.getItem('userRole') || 'admin') as 'admin' | 'teacher' | 'student' | 'parent';
  const userEmail = localStorage.getItem('userEmail') || 'demo@school.com';

  // Mock contacts data
  const [contacts] = useState<Contact[]>([
    { id: '1', name: 'John Smith', role: 'teacher', status: 'online', lastMessage: 'See you in class tomorrow', unreadCount: 2 },
    { id: '2', name: 'Sarah Johnson', role: 'admin', status: 'online', lastMessage: 'Meeting at 3 PM' },
    { id: '3', name: 'Mike Wilson', role: 'student', status: 'offline', lastMessage: 'Thanks for the help!' },
    { id: '4', name: 'Lisa Davis', role: 'parent', status: 'busy', lastMessage: 'How is my child doing?', unreadCount: 1 },
    { id: '5', name: 'Robert Brown', role: 'teacher', status: 'online', lastMessage: 'Grade reports ready' },
  ]);

  // Mock messages for selected contact
  useEffect(() => {
    if (selectedContact) {
      setMessages([
        {
          id: '1',
          sender: selectedContact.name,
          content: 'Hello! How are you doing today?',
          timestamp: new Date(Date.now() - 3600000),
          type: 'text',
          role: selectedContact.role
        },
        {
          id: '2',
          sender: userEmail,
          content: 'Hi! I\'m doing well, thank you for asking.',
          timestamp: new Date(Date.now() - 3000000),
          type: 'text',
          role: userRole
        },
        {
          id: '3',
          sender: selectedContact.name,
          content: selectedContact.lastMessage || 'Great to hear!',
          timestamp: new Date(Date.now() - 1800000),
          type: 'text',
          role: selectedContact.role
        }
      ]);
    }
  }, [selectedContact, userEmail, userRole]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: userEmail,
      content: newMessage,
      timestamp: new Date(),
      type: 'text',
      role: userRole
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    toast.success('Message sent');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedContact) {
      const message: Message = {
        id: Date.now().toString(),
        sender: userEmail,
        content: `📎 ${file.name}`,
        timestamp: new Date(),
        type: 'file',
        role: userRole
      };

      setMessages(prev => [...prev, message]);
      toast.success('File uploaded');
    }
  };

  const startCall = (video: boolean = false) => {
    if (!selectedContact) return;
    
    setIsCallActive(true);
    setIsVideoCall(video);
    toast.success(`${video ? 'Video' : 'Voice'} call started with ${selectedContact.name}`);
  };

  const endCall = () => {
    setIsCallActive(false);
    setIsVideoCall(false);
    setIsMuted(false);
    setIsVideoEnabled(true);
    toast.info('Call ended');
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'teacher': return 'bg-blue-100 text-blue-800';
      case 'student': return 'bg-green-100 text-green-800';
      case 'parent': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout role={userRole} title="Chat & Communication">
      <div className="h-[calc(100vh-12rem)] flex gap-4">
        {/* Contacts Sidebar */}
        <Card className="w-80 flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Messages</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-full">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedContact?.id === contact.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(contact.status)}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900 truncate">{contact.name}</p>
                        {contact.unreadCount && (
                          <Badge variant="secondary" className="bg-blue-500 text-white text-xs">
                            {contact.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                        <Badge className={`text-xs ${getRoleBadgeColor(contact.role)}`}>
                          {contact.role}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white">
                          {selectedContact.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(selectedContact.status)}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedContact.name}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge className={`text-xs ${getRoleBadgeColor(selectedContact.role)}`}>
                          {selectedContact.role}
                        </Badge>
                        <span className="text-xs text-gray-500 capitalize">{selectedContact.status}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {!isCallActive ? (
                      <>
                        <Button variant="outline" size="sm" onClick={() => startCall(false)}>
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => startCall(true)}>
                          <Video className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <div className="flex items-center space-x-2 bg-red-50 px-3 py-2 rounded-lg">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          <span className="text-sm text-red-600">
                            {isVideoCall ? 'Video Call' : 'Voice Call'} Active
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsMuted(!isMuted)}
                          className={isMuted ? "bg-red-100" : ""}
                        >
                          {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        </Button>
                        {isVideoCall && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                            className={!isVideoEnabled ? "bg-red-100" : ""}
                          >
                            {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                          </Button>
                        )}
                        <Button variant="destructive" size="sm" onClick={endCall}>
                          <PhoneOff className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === userEmail ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender === userEmail
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === userEmail ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a contact from the sidebar to start chatting</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ChatPage;
