import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Settings, 
  Book, 
  Upload, 
  Download, 
  Heart, 
  Award,
  Edit,
  PanelRight,
  GraduationCap,
  Building2,
  BadgeCheck,
  Bell
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import UserPoints from '../gamification/UserPoints';
import BadgeDisplay, { UserBadge } from '../gamification/BadgeDisplay';

export interface UserProfileData {
  id: string;
  name: string;
  avatar?: string;
  coverImage?: string;
  bio?: string;
  email: string;
  points: number;
  level: number;
  nextLevelPoints: number;
  institution?: string;
  department?: string;
  joined: string;
  uploadsCount: number;
  downloadsCount: number;
  likesCount: number;
  badgesEarned: UserBadge[];
  isVerified?: boolean;
}

interface UserProfileProps {
  userData: UserProfileData;
  isOwnProfile?: boolean;
  onEditProfile?: () => void;
}

const UserProfile = ({ userData, isOwnProfile = false, onEditProfile }: UserProfileProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <Card className="shadow-md">
      {/* Profile Header with Cover Image */}
      <div className="profile-header h-32 sm:h-48 bg-gradient-to-r from-primary/20 to-primary/40">
        {userData.coverImage && (
          <img 
            src={userData.coverImage} 
            alt="Profile cover" 
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      <CardHeader className="pt-0">
        <div className="flex flex-col sm:flex-row gap-4 -mt-12 sm:-mt-16">
          <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-background shadow-md">
            <AvatarImage src={userData.avatar} alt={userData.name} />
            <AvatarFallback className="text-2xl">{userData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 flex-1 justify-between pt-2 sm:items-end">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-2xl">{userData.name}</CardTitle>
                {userData.isVerified && (
                  <BadgeCheck className="h-5 w-5 text-primary" />
                )}
              </div>
              
              <CardDescription className="flex flex-col sm:flex-row gap-1 sm:gap-3 mt-1">
                {userData.institution && (
                  <div className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    <span>{userData.institution}</span>
                  </div>
                )}
                
                {userData.department && (
                  <div className="flex items-center gap-1">
                    <GraduationCap className="h-3 w-3" />
                    <span>{userData.department}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>Joined {userData.joined}</span>
                </div>
              </CardDescription>
            </div>
            
            {isOwnProfile && (
              <Button 
                variant="outline" 
                size="sm" 
                className="self-start sm:self-auto"
                onClick={onEditProfile}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Bio */}
            {userData.bio && (
              <div>
                <h3 className="text-lg font-medium mb-2">About</h3>
                <p className="text-muted-foreground">{userData.bio}</p>
              </div>
            )}
            
            {/* Stats */}
            <div>
              <h3 className="text-lg font-medium mb-3">Stats</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Upload className="h-5 w-5 text-primary mb-2" />
                    <span className="text-2xl font-semibold">{userData.uploadsCount}</span>
                    <span className="text-sm text-muted-foreground">Uploads</span>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Download className="h-5 w-5 text-primary mb-2" />
                    <span className="text-2xl font-semibold">{userData.downloadsCount}</span>
                    <span className="text-sm text-muted-foreground">Downloads</span>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Heart className="h-5 w-5 text-primary mb-2" />
                    <span className="text-2xl font-semibold">{userData.likesCount}</span>
                    <span className="text-sm text-muted-foreground">Likes</span>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Award className="h-5 w-5 text-primary mb-2" />
                    <span className="text-2xl font-semibold">{userData.badgesEarned.filter(b => b.unlocked).length}</span>
                    <span className="text-sm text-muted-foreground">Badges</span>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Points and Progress */}
            <div>
              <h3 className="text-lg font-medium mb-3">Level Progress</h3>
              <UserPoints 
                points={userData.points} 
                level={userData.level} 
                nextLevelPoints={userData.nextLevelPoints} 
              />
            </div>
            
            {/* Recent Badges */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium">Recent Badges</h3>
                <Button variant="link" size="sm" onClick={() => setActiveTab('badges')}>
                  View All
                </Button>
              </div>
              <BadgeDisplay 
                badges={userData.badgesEarned.filter(badge => badge.unlocked)}
                limit={4}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="badges">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Earned Badges</h3>
                <BadgeDisplay 
                  badges={userData.badgesEarned.filter(badge => badge.unlocked)}
                  showLocked={false}
                />
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Available Badges</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Complete these achievements to earn more badges
                </p>
                <BadgeDisplay 
                  badges={userData.badgesEarned.filter(badge => !badge.unlocked)}
                  showLocked={true}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="resources">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Uploaded Resources</h3>
              {isOwnProfile && (
                <Button size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New
                </Button>
              )}
            </div>
            
            <div className="text-muted-foreground text-center py-8">
              {isOwnProfile ? (
                <>
                  <Book className="h-12 w-12 mx-auto mb-2 opacity-30" />
                  <p>You haven't uploaded any resources yet</p>
                  <Button variant="outline" className="mt-4">
                    Upload Your First Resource
                  </Button>
                </>
              ) : (
                <>
                  <PanelRight className="h-12 w-12 mx-auto mb-2 opacity-30" />
                  <p>This user hasn't uploaded any resources yet</p>
                </>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            {isOwnProfile ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Account Settings</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage your account preferences and notifications
                  </p>
                  <Button variant="outline" className="mr-2">
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Button>
                  <Button variant="outline">
                    <Bell className="h-4 w-4 mr-2" />
                    Notification Preferences
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Settings className="h-12 w-12 mx-auto mb-2 opacity-30" />
                <p>You don't have access to this user's settings</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UserProfile; 