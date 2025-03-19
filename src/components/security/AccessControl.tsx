import React from 'react';
import { Lock, Users, User, Eye, Edit, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface SharedUser {
  id: string;
  name: string;
  role: string;
}

interface AccessControlProps {
  resourceId: string;
  title: string;
  visibility: 'Public' | 'Private' | 'Restricted';
  sharedWith: SharedUser[];
  onChangeVisibility?: (resourceId: string, visibility: string) => void;
  onManageSharing?: (resourceId: string) => void;
}

const AccessControl: React.FC<AccessControlProps> = ({
  resourceId,
  title,
  visibility,
  sharedWith,
  onChangeVisibility,
  onManageSharing
}) => {
  const getVisibilityIcon = () => {
    switch (visibility) {
      case 'Public':
        return <Globe className="h-4 w-4" />;
      case 'Restricted':
        return <Users className="h-4 w-4" />;
      case 'Private':
      default:
        return <Lock className="h-4 w-4" />;
    }
  };

  const getVisibilityColor = () => {
    switch (visibility) {
      case 'Public':
        return 'bg-green-600';
      case 'Restricted':
        return 'bg-amber-500';
      case 'Private':
      default:
        return 'bg-blue-600';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Edit':
        return <Edit className="h-3.5 w-3.5 text-amber-500" />;
      case 'View':
      default:
        return <Eye className="h-3.5 w-3.5 text-blue-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Access Control</CardTitle>
          <Badge variant="default" className={getVisibilityColor()}>
            <div className="flex items-center space-x-1">
              {getVisibilityIcon()}
              <span>{visibility}</span>
            </div>
          </Badge>
        </div>
        <CardDescription className="line-clamp-1">
          Resource: {title}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              onClick={() => onChangeVisibility && onChangeVisibility(resourceId, 'Public')}
            >
              <Globe className="h-3.5 w-3.5 mr-1" />
              Public
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              onClick={() => onChangeVisibility && onChangeVisibility(resourceId, 'Restricted')}
            >
              <Users className="h-3.5 w-3.5 mr-1" />
              Restricted
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              onClick={() => onChangeVisibility && onChangeVisibility(resourceId, 'Private')}
            >
              <Lock className="h-3.5 w-3.5 mr-1" />
              Private
            </Button>
          </div>
          
          {sharedWith.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Shared with ({sharedWith.length})</h4>
              <div className="space-y-2">
                {sharedWith.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${user.id}`} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{user.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getRoleIcon(user.role)}
                      <span className="text-xs">{user.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-2">
            <Button 
              variant="default" 
              size="sm" 
              className="w-full"
              onClick={() => onManageSharing && onManageSharing(resourceId)}
            >
              <User className="h-4 w-4 mr-2" />
              Manage Access
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessControl; 