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
  Clock
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { JitsiMeeting } from '@jitsi/react-sdk';

interface VideoChatProps {
  roomName?: string;
  displayName?: string;
  isAdmin?: boolean;
}

const VideoChat: React.FC<VideoChatProps> = ({ 
  roomName = 'admin-meeting', 
  displayName = 'Admin',
  isAdmin = true 
}) => {
  const [isJoined, setIsJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [participants, setParticipants] = useState(1);
  const [meetingTime, setMeetingTime] = useState(0);
  const [customRoomName, setCustomRoomName] = useState(roomName);
  const [customDisplayName, setCustomDisplayName] = useState(displayName);
  const [meetingConfig, setMeetingConfig] = useState<any>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  const joinMeeting = () => {
    if (!customRoomName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a room name",
        variant: "destructive",
      });
      return;
    }

    setIsJoined(true);
    setParticipants(1);
    setMeetingTime(0);
    
    // Configure Jitsi meeting
    const config = {
      roomName: customRoomName,
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

    setMeetingConfig(config);
    
    // Start meeting timer
    intervalRef.current = setInterval(() => {
      setMeetingTime(prev => prev + 1);
    }, 1000);

    toast({
      title: "Success",
      description: `Joined meeting: ${customRoomName}`,
    });
  };

  const leaveMeeting = () => {
    setIsJoined(false);
    setMeetingConfig(null);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    toast({
      title: "Meeting ended",
      description: "You have left the meeting",
    });
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

  const handleApiReady = (externalApi: any) => {
    console.log('Jitsi API Ready', externalApi);
    
    // Listen for participant joined
    externalApi.addEventListeners({
      participantJoined: () => {
        setParticipants(prev => prev + 1);
        toast({
          title: "Participant joined",
          description: "A new participant has joined the meeting",
        });
      },
      participantLeft: () => {
        setParticipants(prev => Math.max(1, prev - 1));
        toast({
          title: "Participant left",
          description: "A participant has left the meeting",
        });
      },
      audioMuteStatusChanged: (data: any) => {
        setIsMuted(data.muted);
      },
      videoMuteStatusChanged: (data: any) => {
        setIsVideoOn(!data.muted);
      }
    });
  };

  const handleReadyToClose = () => {
    leaveMeeting();
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
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
              Start or join a video conference meeting using Jitsi Meet
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

  if (meetingConfig) {
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
              {participants} participant{participants !== 1 ? 's' : ''}
            </Badge>
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

        {/* Jitsi Meeting Container */}
        <div className="flex-1 relative" ref={videoContainerRef}>
          <JitsiMeeting
            domain="meet.jit.si"
            roomName={meetingConfig.roomName}
            userInfo={meetingConfig.userInfo}
            configOverwrite={meetingConfig.configOverwrite}
            interfaceConfigOverwrite={meetingConfig.interfaceConfigOverwrite}
            onApiReady={handleApiReady}
            onReadyToClose={handleReadyToClose}
            getIFrameRef={(iframeRef) => {
              if (iframeRef) {
                iframeRef.style.height = '100%';
                iframeRef.style.width = '100%';
                iframeRef.style.border = 'none';
              }
            }}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default VideoChat; 