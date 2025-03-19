import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Eye, FileText, File } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '@/lib/context/AppContext';
import { useToast } from '@/hooks/use-toast';

export type ResourceType = {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'doc' | 'other';
  category: string;
  uploadedBy: string;
  uploadDate: string;
};

interface ResourceCardProps {
  resource: ResourceType;
  index: number;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { handleDownload, user } = useApp();
  const { toast } = useToast();

  const getFileIcon = () => {
    switch (resource.type) {
      case 'pdf':
        return <FileText className="h-10 w-10 text-primary" />; // Changed from FilePdf to FileText
      case 'doc':
        return <FileText className="h-10 w-10 text-primary" />;
      default:
        return <File className="h-10 w-10 text-primary" />;
    }
  };

  const handleViewResource = () => {
    toast({
      title: "Resource Preview",
      description: `Opening preview for "${resource.title}"`,
    });
    // In a real app, this would open a preview modal or navigate to a preview page
  };

  const handleDownloadResource = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to download resources",
        variant: "destructive",
      });
      return;
    }
    
    handleDownload(resource.id);
    toast({
      title: "Download Started",
      description: `Downloading "${resource.title}"`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <Card className="overflow-hidden card-hover border border-border/50 h-full">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-3 bg-primary/5 rounded-xl">
              {getFileIcon()}
            </div>
            <div className="space-y-2">
              <Badge className="bg-secondary/80 text-secondary-foreground hover:bg-secondary/90 text-xs">
                {resource.category}
              </Badge>
              <h3 className="font-semibold text-lg">{resource.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {resource.description}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex justify-between items-center border-t border-border/30">
          <div className="text-xs text-muted-foreground">
            <p>Uploaded by {resource.uploadedBy}</p>
            <p>{resource.uploadDate}</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={handleViewResource}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full"
              onClick={handleDownloadResource}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ResourceCard;
