import React from 'react';
import { BadgeCheck, Mail, MapPin, Calendar, UploadCloud, Download, Edit } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface UserProfileData {
  name?: string;
  username?: string;
  bio?: string;
  avatar?: string;
  email?: string;
  location?: string;
  joinDate?: string;
  isVerified?: boolean;
  stats?: {
    uploads?: number;
    downloads?: number;
    contributions?: number;
    followers?: number;
    following?: number;
  };
}

interface UserProfileProps {
  profile: UserProfileData;
}

const UserProfile: React.FC<UserProfileProps> = ({ profile }) => {
  const {
    name = 'User',
    username = 'username',
    bio = 'No bio provided',
    avatar,
    email,
    location,
    joinDate,
    isVerified = false,
    stats = {}
  } = profile;

  const {
    uploads = 0,
    downloads = 0,
    contributions = 0,
    followers = 0,
    following = 0
  } = stats;

  return (
    <Card>
      <CardHeader className="relative pb-0">
        <div className="absolute top-3 right-3">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col items-center">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-1.5">
            <h3 className="text-xl font-semibold">{name}</h3>
            {isVerified && <BadgeCheck className="h-4 w-4 text-blue-500" />}
          </div>
          <p className="text-sm text-muted-foreground">@{username}</p>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <p className="text-sm text-center">{bio}</p>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          {email && (
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{email}</span>
            </div>
          )}
          
          {location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{location}</span>
            </div>
          )}
          
          {joinDate && (
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Joined {joinDate}</span>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-5 gap-2 text-center pt-2 border-t">
          <div>
            <p className="text-muted-foreground text-xs">Uploads</p>
            <p className="font-medium">{uploads}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Downloads</p>
            <p className="font-medium">{downloads}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Contributions</p>
            <p className="font-medium">{contributions}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Followers</p>
            <p className="font-medium">{followers}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Following</p>
            <p className="font-medium">{following}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" size="sm" className="w-[48%] flex items-center gap-1">
          <UploadCloud className="h-3.5 w-3.5" />
          <span>Upload</span>
        </Button>
        <Button variant="outline" size="sm" className="w-[48%] flex items-center gap-1">
          <Download className="h-3.5 w-3.5" />
          <span>Downloads</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserProfile; 