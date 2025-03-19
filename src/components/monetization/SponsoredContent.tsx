import React from 'react';
import { ExternalLink, Heart, X, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SponsoredContentProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  sponsor: string;
  relevanceCategory: string;
  onDismiss?: (id: string) => void;
  onLike?: (id: string) => void;
  onDislike?: (id: string) => void;
}

const SponsoredContent: React.FC<SponsoredContentProps> = ({
  id,
  title,
  description,
  imageUrl,
  url,
  sponsor,
  relevanceCategory,
  onDismiss,
  onLike,
  onDislike
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <CardHeader className="pb-0">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className="bg-primary/10 hover:bg-primary/10">
              Sponsored
            </Badge>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground"
              onClick={() => onDismiss && onDismiss(id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 space-y-3">
          <div className="relative aspect-video overflow-hidden rounded-md mb-3">
            <img 
              src={imageUrl} 
              alt={title}
              className="object-cover w-full h-full transition-transform hover:scale-105"
            />
          </div>
          
          <div>
            <CardTitle className="text-lg leading-tight mb-2">
              {title}
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {description}
            </CardDescription>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">By {sponsor}</span>
            {relevanceCategory && (
              <>
                <span className="mx-1">•</span>
                <span>Relevant to: {relevanceCategory}</span>
              </>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between items-center border-t p-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs gap-1"
              onClick={() => onLike && onLike(id)}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              Relevant
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs gap-1"
              onClick={() => onDislike && onDislike(id)}
            >
              <ThumbsDown className="h-3.5 w-3.5" />
              Not for me
            </Button>
          </div>
          
          <Button
            variant="default"
            size="sm"
            className="gap-1.5"
            onClick={() => window.open(url, '_blank')}
          >
            Learn More
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default SponsoredContent; 