import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface UserPointsProps {
  points: number;
  level: number;
  nextLevelPoints: number;
}

const UserPoints = ({ points, level, nextLevelPoints }: UserPointsProps) => {
  // Calculate progress percentage to next level
  const progressPercentage = Math.min((points / nextLevelPoints) * 100, 100);
  
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">Level {level}</span>
        </div>
        <span className="points-badge">{points} pts</span>
      </div>
      
      <div className="progress-track">
        <motion.div 
          className="progress-bar"
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Level {level}</span>
        <span>{points}/{nextLevelPoints} to Level {level + 1}</span>
      </div>
    </div>
  );
};

export default UserPoints; 