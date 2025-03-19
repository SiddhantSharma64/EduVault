import React from 'react';
import { Clock, MessagesSquare, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  threadCount: number;
  participantCount: number;
  latestActivity: string;
  icon?: string;
  tags: string[];
}

interface ForumCategoriesProps {
  categories: ForumCategory[];
}

const ForumCategories: React.FC<ForumCategoriesProps> = ({ categories }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Forum Categories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-base">{category.name}</h3>
              <div className="flex gap-1">
                {category.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">
              {category.description}
            </p>
            
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <MessagesSquare className="h-3 w-3" />
                <span>{category.threadCount} threads</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{category.participantCount} participants</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Last active: {category.latestActivity}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ForumCategories; 