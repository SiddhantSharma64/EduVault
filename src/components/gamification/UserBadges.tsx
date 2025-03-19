import React from 'react';
import { Badge, Shield, Award, Star, Trophy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  achievedDate: string;
  level?: number;
}

interface UserBadgesProps {
  badges: UserBadge[];
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'badge':
      return <Badge className="h-8 w-8 text-primary" />;
    case 'shield':
      return <Shield className="h-8 w-8 text-primary" />;
    case 'award':
      return <Award className="h-8 w-8 text-primary" />;
    case 'star':
      return <Star className="h-8 w-8 text-primary" />;
    case 'trophy':
      return <Trophy className="h-8 w-8 text-primary" />;
    default:
      return <Badge className="h-8 w-8 text-primary" />;
  }
};

const UserBadges: React.FC<UserBadgesProps> = ({ badges }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Badges</CardTitle>
        <CardDescription>Achievements you've earned so far</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {badges.map((badge) => (
            <div key={badge.id} className="flex items-start gap-3 p-2 rounded-lg bg-muted/50">
              <div className="flex-shrink-0">
                {getIconComponent(badge.icon)}
              </div>
              <div>
                <h4 className="text-sm font-medium">{badge.name}</h4>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Earned: {badge.achievedDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          {badges.length} badges earned
        </p>
      </CardFooter>
    </Card>
  );
};

export default UserBadges; 