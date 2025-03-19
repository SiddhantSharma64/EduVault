import React from 'react';
import { CircleDashed } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface UserPointsProps {
  points: number;
  level: number;
  progress: number;
}

const UserPoints: React.FC<UserPointsProps> = ({ points, level, progress }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Level {level}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <CircleDashed className="h-5 w-5 text-primary" />
            <span className="text-2xl font-bold">{points}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {progress}% to Level {level + 1}
          </div>
        </div>
        
        <Progress value={progress} className="h-2" />
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <div className="text-2xl font-semibold mb-1">{points}</div>
            <div className="text-xs text-muted-foreground">Total Points</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <div className="text-2xl font-semibold mb-1">{level}</div>
            <div className="text-xs text-muted-foreground">Current Level</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPoints; 