import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, X, ThumbsUp, ThumbsDown, BookOpen } from 'lucide-react';
import ResourceCard, { ResourceType } from '../ResourceCard';
import { motion } from 'framer-motion';

export interface RecommendedResource {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  author: string;
  category: string;
  type: 'pdf' | 'doc' | 'other';
  rating: number;
  downloads: number;
  date: string;
  tags: string[];
  recommendationReason?: string;
}

interface ResourceRecommendationsProps {
  recommendations: RecommendedResource[];
  title?: string;
  onRemoveRecommendation?: (id: string) => void;
  onLikeRecommendation?: (id: string) => void;
  onDislikeRecommendation?: (id: string) => void;
  onViewAll?: () => void;
}

const ResourceRecommendations = ({ 
  recommendations,
  title = "Recommended for You",
  onRemoveRecommendation,
  onLikeRecommendation,
  onDislikeRecommendation,
  onViewAll
}: ResourceRecommendationsProps) => {
  
  // Convert RecommendedResource to ResourceType
  const mapToResourceType = (rec: RecommendedResource, index: number): ResourceType => ({
    id: rec.id,
    title: rec.title,
    description: rec.description,
    type: rec.type,
    category: rec.category,
    uploadedBy: rec.author,
    uploadDate: rec.date
  });
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
          
          {onViewAll && (
            <Button variant="link" size="sm" onClick={onViewAll}>
              View All
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        {recommendations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-30" />
            <p>We're getting to know your preferences</p>
            <p className="text-sm">Browse more resources to get personalized recommendations</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="relative">
                  <ResourceCard
                    resource={mapToResourceType(resource, index)}
                    index={index}
                  />
                  
                  {resource.recommendationReason && (
                    <div className="mt-1 pl-1 text-xs text-muted-foreground">
                      <span className="font-medium">Recommended because:</span> {resource.recommendationReason}
                    </div>
                  )}
                  
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={() => onLikeRecommendation && onLikeRecommendation(resource.id)}
                      >
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={() => onDislikeRecommendation && onDislikeRecommendation(resource.id)}
                      >
                        <ThumbsDown className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 text-muted-foreground hover:text-foreground"
                      onClick={() => onRemoveRecommendation && onRemoveRecommendation(resource.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResourceRecommendations; 