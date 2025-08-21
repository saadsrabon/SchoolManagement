import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Settings, 
  Users, 
  Share2,
  Copy,
  Calendar,
  Clock,
  Monitor,
  MessageSquare,
  MoreVertical
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";

// Extend Window interface for Jitsi
declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

interface VideoChatProps {
  roomName?: string;
  displayName?: string;
  isAdmin?: boolean;
}

interface Participant {
  id: string;
  displayName: string;
  isAudioMuted: boolean;
  isVideoMuted: boolean;
  isLocal: boolean;
}

const VideoChat: React.FC<VideoChatProps> = ({ 
  roomName = 'admin-meeting', 
  displayName = 'Admin',
  isAdmin = true 
}) => {
  const [isJoined, setIsJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [meetingTime, setMeetingTime] = useState(0);
  const [customRoomName, setCustomRoomName] = useState(roomName);
  const [customDisplayName, setCustomDisplayName] = useState(displayName);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Array<{id: string, sender: string, message: string, timestamp: Date}>>([]);
  const [newMessage, setNewMessage] = useState('');
  
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();
  const jitsiApiRef = useRef<any>(null);

  // Load Jitsi External API script
  const loadJitsiScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.JitsiMeetExternalAPI) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://meet.jit.si/external_api.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Jitsi API'));
      document.head.appendChild(script);
    });
  };

  const joinMeeting = async () => {
    if (!customRoomName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a room name",
        variant: "destructive",
      });
      return;
    }

    try {
      await loadJitsiScript();
      
      const domain = 'meet.jit.si';
      const options = {
        roomName: customRoomName,
        width: '100%',
        height: '100%',
        parentNode: videoContainerRef.current,
        userInfo: {
          displayName: customDisplayName,
        },
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          prejoinPageEnabled: false,
          disableModeratorIndicator: true,
          enableClosePage: false,
          enableWelcomePage: false,
          enableLobbyChat: true,
          enableChat: true,
          enableFileSharing: true,
          enableScreenSharing: true,
          enableRecording: isAdmin,
          maxFullResolutionParticipants: 2,
          maxParticipants: 50,
          resolution: 720,
          constraints: {
            video: {
              height: {
                ideal: 720,
                max: 720,
                min: 180
              }
            }
          }
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
            'fodeviceselection', 'hangup', 'chat', 'recording',
            'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
            'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
            'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone', 'security'
          ],
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          SHOW_POWERED_BY: false,
          SHOW_PROMOTIONAL_LINKS: false,
          SHOW_BRAND_WATERMARK: false,
          SHOW_WATERMARK: false,
          AUTHENTICATION_ENABLE: false,
          TOOLBAR_ALWAYS_VISIBLE: true,
          TOOLBAR_TIMEOUT: 5000,
          DEFAULT_BACKGROUND: '#474747',
          MOBILE_APP_PROMO: false,
          HIDE_JITSI_WATERMARK: true,
          HIDE_WATERMARK_FOR_GUESTS: true,
          HIDE_POWERED_BY: true,
          HIDE_PROMOTIONAL_LINKS: true,
          HIDE_BRAND_WATERMARK: true,
          HIDE_WATERMARK: true,
          HIDE_AUTHENTICATION: true,
          HIDE_TOOLBAR: false,
          HIDE_TOOLBAR_TIMEOUT: 5000,
          HIDE_DEFAULT_BACKGROUND: false,
          HIDE_MOBILE_APP_PROMO: true
        }
      };

      // Initialize Jitsi Meet with External API
      jitsiApiRef.current = new window.JitsiMeetExternalAPI(domain, options);

      // Add event listeners
      jitsiApiRef.current.addEventListeners({
        readyToClose: handleReadyToClose,
        participantJoined: handleParticipantJoined,
        participantLeft: handleParticipantLeft,
        audioMuteStatusChanged: handleAudioMuteStatusChanged,
        videoMuteStatusChanged: handleVideoMuteStatusChanged,
        screenSharingStatusChanged: handleScreenSharingStatusChanged,
        chatMessage: handleChatMessage,
        participantKickedOut: handleParticipantKickedOut,
        conferenceJoined: handleConferenceJoined,
        conferenceLeft: handleConferenceLeft
      });

      setIsJoined(true);
      setParticipants([{
        id: 'local',
        displayName: customDisplayName,
        isAudioMuted: false,
        isVideoMuted: false,
        isLocal: true
      }]);
      setMeetingTime(0);
      
      // Start meeting timer
      intervalRef.current = setInterval(() => {
        setMeetingTime(prev => prev + 1);
      }, 1000);

      toast({
        title: "Success",
        description: `Joined meeting: ${customRoomName}`,
      });

    } catch (error) {
      console.error('Failed to join meeting:', error);
      toast({
        title: "Error",
        description: "Failed to join meeting. Please try again.",
        variant: "destructive",
      });
    }
  };

  const leaveMeeting = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('hangup');
      jitsiApiRef.current.dispose();
      jitsiApiRef.current = null;
    }
    
    setIsJoined(false);
    setParticipants([]);
    setMessages([]);
    setShowChat(false);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    toast({
      title: "Meeting ended",
      description: "You have left the meeting",
    });
  };

  const toggleMute = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('toggleAudio');
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('toggleVideo');
      setIsVideoOn(!isVideoOn);
    }
  };

  const toggleScreenShare = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('toggleShareScreen');
      setIsScreenSharing(!isScreenSharing);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() && jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('sendChatMessage', newMessage);
      setNewMessage('');
    }
  };

  const copyMeetingLink = () => {
    const meetingUrl = `${window.location.origin}/video-chat?room=${customRoomName}`;
    navigator.clipboard.writeText(meetingUrl);
    toast({
      title: "Meeting link copied",
      description: "The meeting link has been copied to your clipboard",
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Event handlers
  const handleReadyToClose = () => {
    leaveMeeting();
  };

  const handleParticipantJoined = (participant: any) => {
    setParticipants(prev => [...prev, {
      id: participant.id,
      displayName: participant.displayName || 'Anonymous',
      isAudioMuted: false,
      isVideoMuted: false,
      isLocal: false
    }]);
    
    toast({
      title: "Participant joined",
      description: `${participant.displayName || 'Anonymous'} has joined the meeting`,
    });
  };

  const handleParticipantLeft = (participant: any) => {
    setParticipants(prev => prev.filter(p => p.id !== participant.id));
    
    toast({
      title: "Participant left",
      description: `${participant.displayName || 'Anonymous'} has left the meeting`,
    });
  };

  const handleAudioMuteStatusChanged = (data: any) => {
    setIsMuted(data.muted);
    setParticipants(prev => prev.map(p => 
      p.id === data.participantId ? { ...p, isAudioMuted: data.muted } : p
    ));
  };

  const handleVideoMuteStatusChanged = (data: any) => {
    setIsVideoOn(!data.muted);
    setParticipants(prev => prev.map(p => 
      p.id === data.participantId ? { ...p, isVideoMuted: data.muted } : p
    ));
  };

  const handleScreenSharingStatusChanged = (data: any) => {
    setIsScreenSharing(data.on);
  };

  const handleChatMessage = (data: any) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: data.sender.displayName || 'Anonymous',
      message: data.message,
      timestamp: new Date()
    }]);
  };

  const handleParticipantKickedOut = (data: any) => {
    if (data.kicked.participantId === 'local') {
      toast({
        title: "You were removed",
        description: "You have been removed from the meeting",
        variant: "destructive",
      });
      leaveMeeting();
    }
  };

  const handleConferenceJoined = () => {
    console.log('Conference joined');
  };

  const handleConferenceLeft = () => {
    console.log('Conference left');
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
      }
    };
  }, []);

  if (!isJoined) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-6 w-6" />
              Video Meeting
            </CardTitle>
            <CardDescription>
              Start or join a video conference meeting using Jitsi Meet service
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="roomName">Room Name</Label>
                <Input
                  id="roomName"
                  value={customRoomName}
                  onChange={(e) => setCustomRoomName(e.target.value)}
                  placeholder="Enter room name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  value={customDisplayName}
                  onChange={(e) => setCustomDisplayName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={joinMeeting}
                className="flex-1"
                size="lg"
              >
                <Video className="h-4 w-4 mr-2" />
                Join Meeting
              </Button>
              <Button 
                variant="outline"
                onClick={copyMeetingLink}
                className="flex-1"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Link
              </Button>
            </div>

            {isAdmin && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Admin Features</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Create and manage meeting rooms</li>
                  <li>• Invite participants via email</li>
                  <li>• Record meetings</li>
                  <li>• Manage participant permissions</li>
                  <li>• Generate meeting reports</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Meeting Header */}
      <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="font-semibold">{customRoomName}</h2>
            <p className="text-sm text-gray-300">{customDisplayName}</p>
          </div>
          <Badge variant="secondary" className="bg-green-600">
            <Clock className="h-3 w-3 mr-1" />
            {formatTime(meetingTime)}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-white border-white">
            <Users className="h-3 w-3 mr-1" />
            {participants.length} participant{participants.length !== 1 ? 's' : ''}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-700"
            onClick={() => setShowChat(!showChat)}
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-700"
            onClick={leaveMeeting}
          >
            <PhoneOff className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Video Area */}
        <div className={`flex-1 relative ${showChat ? 'mr-80' : ''}`} ref={videoContainerRef}>
          {/* Jitsi will render here */}
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="w-80 bg-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <h3 className="font-semibold text-white">Chat</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-gray-700 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-blue-300">{msg.sender}</span>
                    <span className="text-xs text-gray-400">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-white text-sm">{msg.message}</p>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-700 border-gray-600 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button onClick={sendMessage} size="sm">
                  Send
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Meeting Controls */}
      <div className="bg-gray-800 p-4">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant={isMuted ? "destructive" : "secondary"}
            size="lg"
            onClick={toggleMute}
            className="rounded-full w-12 h-12 p-0"
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          
          <Button
            variant={isVideoOn ? "secondary" : "destructive"}
            size="lg"
            onClick={toggleVideo}
            className="rounded-full w-12 h-12 p-0"
          >
            {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>
          
          <Button
            variant={isScreenSharing ? "destructive" : "secondary"}
            size="lg"
            onClick={toggleScreenShare}
            className="rounded-full w-12 h-12 p-0"
          >
            <Monitor className="h-5 w-5" />
          </Button>
          
          <Button
            variant="destructive"
            size="lg"
            onClick={leaveMeeting}
            className="rounded-full w-12 h-12 p-0"
          >
            <PhoneOff className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoChat;