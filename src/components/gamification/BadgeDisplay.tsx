import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Award, 
  BookOpen, 
  Star, 
  Upload, 
  MessageSquare, 
  ThumbsUp, 
  Trophy, 
  BookMarked,
  Clock
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface UserBadge {
  id: string;
  name: string;
  description: string;
  type: 'achievement' | 'milestone' | 'special';
  icon: 'award' | 'book' | 'star' | 'upload' | 'comment' | 'like' | 'trophy' | 'marked' | 'time';
  unlocked: boolean;
  date?: string;
}

interface BadgeDisplayProps {
  badges: UserBadge[];
  showLocked?: boolean;
  limit?: number;
}

const BadgeDisplay = ({ badges, showLocked = true, limit }: BadgeDisplayProps) => {
  // Filter and limit badges as needed
  const displayBadges = badges
    .filter(badge => showLocked || badge.unlocked)
    .slice(0, limit);
  
  // Function to render the appropriate icon
  const renderIcon = (iconName: UserBadge['icon']) => {
    switch (iconName) {
      case 'award': return <Award className="h-4 w-4" />;
      case 'book': return <BookOpen className="h-4 w-4" />;
      case 'star': return <Star className="h-4 w-4" />;
      case 'upload': return <Upload className="h-4 w-4" />;
      case 'comment': return <MessageSquare className="h-4 w-4" />;
      case 'like': return <ThumbsUp className="h-4 w-4" />;
      case 'trophy': return <Trophy className="h-4 w-4" />;
      case 'marked': return <BookMarked className="h-4 w-4" />;
      case 'time': return <Clock className="h-4 w-4" />;
      default: return <Award className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="flex flex-wrap gap-2">
      <TooltipProvider>
        {displayBadges.map(badge => (
          <Tooltip key={badge.id}>
            <TooltipTrigger asChild>
              <div className={badge.unlocked ? 'cursor-pointer' : 'cursor-default opacity-40'}>
                <Badge 
                  variant={badge.unlocked ? badge.type : 'outline'} 
                  size="lg"
                  className={!badge.unlocked ? 'grayscale' : ''}
                  icon={renderIcon(badge.icon)}
                >
                  {badge.name}
                </Badge>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1 max-w-xs">
                <p className="font-medium">{badge.name}</p>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
                {badge.date && badge.unlocked && (
                  <p className="text-xs font-medium text-primary">Earned on {badge.date}</p>
                )}
                {!badge.unlocked && (
                  <p className="text-xs italic">Not yet unlocked</p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

export default BadgeDisplay; 