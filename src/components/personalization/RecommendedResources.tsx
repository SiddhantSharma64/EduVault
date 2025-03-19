import React from 'react';
import { Star, ThumbsUp, ThumbsDown, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface RecommendedResource {
  id: string;
  title: string;
  description: string;
  author: string;
  type: string;
  tags: string[];
  dateAdded: string;
  rating: number;
  imageUrl?: string;
}

interface RecommendedResourcesProps {
  resources: RecommendedResource[];
}

const RecommendedResources: React.FC<RecommendedResourcesProps> = ({ resources }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended For You</CardTitle>
        <CardDescription>Based on your interests and learning history</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {resources.map((resource) => (
            <div key={resource.id} className="flex gap-3 border-b pb-4 last:border-0 last:pb-0">
              {resource.imageUrl ? (
                <div 
                  className="w-16 h-16 rounded bg-center bg-cover flex-shrink-0" 
                  style={{ backgroundImage: `url(${resource.imageUrl})` }}
                />
              ) : (
                <div className="w-16 h-16 rounded bg-muted flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-medium text-muted-foreground">{resource.title.slice(0, 1)}</span>
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-sm truncate">{resource.title}</h3>
                  <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{resource.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{resource.description}</p>
                
                <div className="flex flex-wrap items-center justify-between mt-2">
                  <div className="flex gap-1 mb-1">
                    <Badge variant="outline" className="text-[10px] px-1 h-5">
                      {resource.type}
                    </Badge>
                    {resource.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px] px-1 h-5">
                        {tag}
                      </Badge>
                    ))}
                    {resource.tags.length > 2 && (
                      <Badge variant="secondary" className="text-[10px] px-1 h-5">
                        +{resource.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex gap-1 ml-auto">
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ThumbsUp className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ThumbsDown className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-4" size="sm">
          View All Recommendations
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecommendedResources; 