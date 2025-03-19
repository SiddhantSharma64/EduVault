import React, { useState } from 'react';
import { Bell, BookOpen, MessageSquare, AlertCircle, Settings, Trash2, Check, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';

interface Notification {
  id: string;
  type: 'resource' | 'comment' | 'system' | 'social';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

interface NotificationPreferences {
  email: boolean;
  push: boolean;
  digestFrequency: 'Daily' | 'Weekly' | 'Monthly' | 'Never';
}

interface NotificationCenterProps {
  unreadCount: number;
  notifications: Notification[];
  preferences: NotificationPreferences;
  nextDigest: string;
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onDeleteNotification?: (id: string) => void;
  onClearAll?: () => void;
  onUpdatePreferences?: (preferences: NotificationPreferences) => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  unreadCount,
  notifications,
  preferences,
  nextDigest,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onClearAll,
  onUpdatePreferences
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'resource':
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'comment':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case 'social':
        return <Users className="h-5 w-5 text-violet-500" />;
      case 'system':
      default:
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
    }
  };
  
  const filterNotifications = () => {
    if (activeTab === 'all') return notifications;
    return notifications.filter(n => n.type === activeTab);
  };
  
  const filteredNotifications = filterNotifications();
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Notifications</CardTitle>
            {unreadCount > 0 && (
              <Badge className="bg-red-500 hover:bg-red-500/90">{unreadCount}</Badge>
            )}
          </div>
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2">
                  <h3 className="mb-1 text-xs font-medium">Notification Settings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-1">
                      <div className="text-xs">Email Notifications</div>
                      <Switch 
                        checked={preferences.email}
                        onCheckedChange={(checked) => {
                          onUpdatePreferences && onUpdatePreferences({
                            ...preferences,
                            email: checked
                          });
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <div className="text-xs">Push Notifications</div>
                      <Switch 
                        checked={preferences.push}
                        onCheckedChange={(checked) => {
                          onUpdatePreferences && onUpdatePreferences({
                            ...preferences,
                            push: checked
                          });
                        }}
                      />
                    </div>
                    <div className="pt-2 pb-1 border-t">
                      <div className="text-xs font-medium mb-2">Digest Frequency</div>
                      <div className="grid grid-cols-2 gap-1">
                        {['Daily', 'Weekly', 'Monthly', 'Never'].map((frequency) => (
                          <Button 
                            key={frequency}
                            size="sm"
                            variant={preferences.digestFrequency === frequency ? 'default' : 'outline'}
                            className="text-xs h-7"
                            onClick={() => {
                              onUpdatePreferences && onUpdatePreferences({
                                ...preferences,
                                digestFrequency: frequency as any
                              });
                            }}
                          >
                            {frequency}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClearAll}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription>
          Stay updated with the latest activity
        </CardDescription>
      </CardHeader>
      
      <div className="px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="resource">Resources</TabsTrigger>
            <TabsTrigger value="comment">Comments</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <CardContent className="pt-3">
        <div className="h-[300px] overflow-y-auto">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-2">
              {filteredNotifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-3 rounded-md border ${!notification.read ? 'bg-muted/50' : ''}`}
                >
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between mb-1">
                        <h4 className={`text-sm font-medium ${!notification.read ? 'text-primary' : ''}`}>
                          {notification.title}
                        </h4>
                        <div className="text-xs text-muted-foreground">
                          {notification.time}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-2 space-x-2">
                    {!notification.read && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs" 
                        onClick={() => onMarkAsRead && onMarkAsRead(notification.id)}
                      >
                        <Check className="h-3.5 w-3.5 mr-1" />
                        Mark as read
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs hover:text-red-500" 
                      onClick={() => onDeleteNotification && onDeleteNotification(notification.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <Bell className="h-10 w-10 text-muted-foreground/50 mb-3" />
              <h3 className="text-sm font-medium">No notifications</h3>
              <p className="text-xs text-muted-foreground mt-1 mb-4">
                You're all caught up!
              </p>
            </div>
          )}
        </div>
      </CardContent>
      
      {filteredNotifications.length > 0 && (
        <CardFooter className="border-t px-4 py-3 flex justify-between items-center">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs gap-1.5"
            onClick={onMarkAllAsRead}
          >
            <Check className="h-3.5 w-3.5" />
            Mark all as read
          </Button>
          
          <p className="text-xs text-muted-foreground">
            Email digest: <span className="text-foreground">{nextDigest}</span>
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export default NotificationCenter; 