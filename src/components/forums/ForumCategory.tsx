import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Users, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface ForumCategoryProps {
  id: string;
  name: string;
  description: string;
  threadCount: number;
  participantCount: number;
  latestActivity: string;
  icon?: React.ReactNode;
  tags?: string[];
  onClick?: () => void;
}

const ForumCategory = ({
  name,
  description,
  threadCount,
  participantCount,
  latestActivity,
  icon,
  tags,
  onClick
}: ForumCategoryProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full cursor-pointer hover:border-primary/50 transition-colors" onClick={onClick}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              {icon || <MessageSquare className="h-5 w-5 text-primary" />}
              <CardTitle className="text-lg">{name}</CardTitle>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{threadCount} threads</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{participantCount} participants</span>
            </div>
          </div>
          
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          <div className="text-xs text-muted-foreground">
            Latest activity: {latestActivity}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ForumCategory; 