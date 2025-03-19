import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Save, 
  Users, 
  MessageSquare, 
  History, 
  Share2,
  Send,
  PenSquare,
  Clock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface Collaborator {
  id: string;
  name: string;
  avatar?: string;
  color: string;
  cursorPosition?: { x: number; y: number };
  isActive: boolean;
  lastActive?: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
}

export interface DocumentHistory {
  id: string;
  userId: string;
  userName: string;
  action: 'created' | 'edited' | 'commented' | 'shared';
  timestamp: string;
}

interface CollaborationEditorProps {
  documentId: string;
  documentTitle: string;
  documentContent: string;
  collaborators: Collaborator[];
  chatMessages: ChatMessage[];
  history: DocumentHistory[];
  currentUserId: string;
  onContentChange?: (content: string) => void;
  onTitleChange?: (title: string) => void;
  onSendMessage?: (message: string) => void;
  onInviteUser?: (email: string) => void;
}

const CollaborationEditor = ({
  documentId,
  documentTitle,
  documentContent,
  collaborators,
  chatMessages,
  history,
  currentUserId,
  onContentChange,
  onTitleChange,
  onSendMessage,
  onInviteUser
}: CollaborationEditorProps) => {
  const [content, setContent] = useState(documentContent);
  const [title, setTitle] = useState(documentTitle);
  const [message, setMessage] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [activeTab, setActiveTab] = useState('collaborators');
  
  // Handle content changes
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    onContentChange?.(e.target.value);
  };
  
  // Handle title changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    onTitleChange?.(e.target.value);
  };
  
  // Send chat message
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    onSendMessage?.(message.trim());
    setMessage('');
  };
  
  // Send message on Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Invite user
  const handleInviteUser = () => {
    if (!inviteEmail.trim()) return;
    
    onInviteUser?.(inviteEmail.trim());
    setInviteEmail('');
  };
  
  // Get active users count
  const activeUsers = collaborators.filter(c => c.isActive).length;
  
  return (
    <div className="flex flex-col h-full">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="space-y-1 flex-1">
              <Input
                value={title}
                onChange={handleTitleChange}
                className="text-xl font-semibold border-none px-0 h-auto focus-visible:ring-0"
                placeholder="Document Title"
              />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex -space-x-2">
                  {collaborators.slice(0, 3).map(collaborator => (
                    <Avatar key={collaborator.id} className="h-5 w-5 border-2 border-background">
                      <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                      <AvatarFallback className="text-[8px]" style={{ backgroundColor: collaborator.color }}>
                        {collaborator.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {collaborators.length > 3 && (
                    <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-[8px]">
                      +{collaborators.length - 3}
                    </div>
                  )}
                </div>
                <span>
                  {activeUsers} active now • Last edited{' '}
                  {history.length > 0 ? history[0].timestamp : 'just now'}
                </span>
              </div>
            </div>
            
            <Button size="sm" variant="outline">
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 pb-3">
          <Textarea
            value={content}
            onChange={handleContentChange}
            className="min-h-[300px] h-full resize-none"
            placeholder="Start typing here..."
          />
          
          {/* Simulated collaborators cursors would be positioned absolutely here */}
          {collaborators.filter(c => c.id !== currentUserId && c.isActive && c.cursorPosition).map(collaborator => (
            <div 
              key={collaborator.id}
              className="collaboration-cursor"
              data-name={collaborator.name}
              style={{ 
                top: collaborator.cursorPosition?.y, 
                left: collaborator.cursorPosition?.x,
                backgroundColor: collaborator.color  
              }}
            />
          ))}
        </CardContent>
      </Card>
      
      <div className="h-[250px] mt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="collaborators" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>Collaborators</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1">
              <History className="h-4 w-4" />
              <span>History</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="collaborators" className="h-[200px]">
            <Card className="h-full">
              <CardContent className="p-4 h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">People</h3>
                  <div className="flex">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Add email address"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        className="h-8 text-sm"
                      />
                      <Button 
                        size="sm" 
                        onClick={handleInviteUser}
                        disabled={!inviteEmail.trim()}
                      >
                        <Share2 className="h-3 w-3 mr-1" />
                        Invite
                      </Button>
                    </div>
                  </div>
                </div>
                
                <ScrollArea className="flex-1">
                  <div className="space-y-2">
                    {collaborators.map(collaborator => (
                      <div 
                        key={collaborator.id} 
                        className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                            <AvatarFallback style={{ backgroundColor: collaborator.color }}>
                              {collaborator.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">
                              {collaborator.name}
                              {collaborator.id === currentUserId && ' (You)'}
                            </div>
                            {collaborator.isActive ? (
                              <div className="text-xs text-primary flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                                Active now
                              </div>
                            ) : (
                              <div className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Last active {collaborator.lastActive}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {collaborator.isActive && (
                          <Badge variant="outline" className="text-xs bg-muted/50">
                            <PenSquare className="h-3 w-3 mr-1" />
                            Editing
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="chat" className="h-[200px]">
            <Card className="h-full">
              <CardContent className="p-4 h-full flex flex-col">
                <ScrollArea className="flex-1 mb-3">
                  <div className="space-y-3">
                    {chatMessages.length === 0 ? (
                      <div className="text-center py-6 text-muted-foreground">
                        <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-30" />
                        <p className="text-sm">No messages yet</p>
                        <p className="text-xs">Send a message to start the conversation</p>
                      </div>
                    ) : (
                      chatMessages.map(msg => (
                        <div key={msg.id} className={`flex gap-2 ${msg.userId === currentUserId ? 'justify-end' : ''}`}>
                          {msg.userId !== currentUserId && (
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={msg.userAvatar} alt={msg.userName} />
                              <AvatarFallback>
                                {msg.userName.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          
                          <div className={`max-w-[70%] ${msg.userId === currentUserId ? 'bg-primary text-primary-foreground' : 'bg-muted'} p-2 rounded-md`}>
                            {msg.userId !== currentUserId && (
                              <div className="text-xs font-medium mb-1">{msg.userName}</div>
                            )}
                            <p className="text-sm">{msg.content}</p>
                            <div className="text-xs opacity-70 text-right mt-1">{msg.timestamp}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
                
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="min-h-[40px] resize-none"
                  />
                  <Button 
                    variant="secondary" 
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="h-[200px]">
            <Card className="h-full">
              <CardContent className="p-4 h-full">
                <ScrollArea className="h-full">
                  {history.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      <History className="h-8 w-8 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">No history yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {history.map(entry => (
                        <div key={entry.id} className="flex items-start gap-3 pb-3 border-b border-border/50">
                          <div className="bg-muted p-1 rounded-md">
                            {entry.action === 'created' && <PenSquare className="h-4 w-4" />}
                            {entry.action === 'edited' && <PenSquare className="h-4 w-4" />}
                            {entry.action === 'commented' && <MessageSquare className="h-4 w-4" />}
                            {entry.action === 'shared' && <Share2 className="h-4 w-4" />}
                          </div>
                          <div>
                            <div className="text-sm">
                              <span className="font-medium">{entry.userName}</span>
                              {' '}
                              {entry.action === 'created' && 'created this document'}
                              {entry.action === 'edited' && 'edited this document'}
                              {entry.action === 'commented' && 'commented on this document'}
                              {entry.action === 'shared' && 'shared this document'}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {entry.timestamp}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CollaborationEditor; 