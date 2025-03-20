import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Eye, FileText, BookOpen, FileCode, Star, Clock, User, Info, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/lib/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import InteractiveTooltip from '@/components/ui/interactive-tooltip';

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
  const [isHovered, setIsHovered] = useState(false);
  const { handleDownload, user } = useApp();
  const { toast } = useToast();

  // Map categories to colors for more visual distinction
  const getCategoryColor = () => {
    const categories: Record<string, string> = {
      'Mathematics': 'from-blue-500/20 to-blue-400/10 text-blue-600 shadow-blue-500/10',
      'Computer Science': 'from-purple-500/20 to-purple-400/10 text-purple-600 shadow-purple-500/10',
      'Physics': 'from-green-500/20 to-green-400/10 text-green-600 shadow-green-500/10',
      'Chemistry': 'from-pink-500/20 to-pink-400/10 text-pink-600 shadow-pink-500/10',
      'Biology': 'from-emerald-500/20 to-emerald-400/10 text-emerald-600 shadow-emerald-500/10',
      'Psychology': 'from-orange-500/20 to-orange-400/10 text-orange-600 shadow-orange-500/10',
      'History': 'from-amber-500/20 to-amber-400/10 text-amber-600 shadow-amber-500/10',
      'Literature': 'from-indigo-500/20 to-indigo-400/10 text-indigo-600 shadow-indigo-500/10',
    };
    
    return categories[resource.category] || 'from-gray-500/20 to-gray-400/10 text-gray-600 shadow-gray-500/10';
  };

  const getFileIcon = () => {
    switch (resource.type) {
      case 'pdf':
        return <FileText className="h-10 w-10 text-primary" />;
      case 'doc':
        return <BookOpen className="h-10 w-10 text-secondary" />;
      default:
        return <FileCode className="h-10 w-10 text-accent" />;
    }
  };

  const getRandomStars = () => {
    return Math.floor(Math.random() * 5) + 1;
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

  // Generate random number for downloads (for demo purposes)
  const downloads = Math.floor(Math.random() * 100) + 5;
  const stars = getRandomStars();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full relative group">
        {/* Gradient border effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `
              linear-gradient(90deg, transparent 0%, var(--primary) 50%, transparent 100%) top/100% 2px no-repeat,
              linear-gradient(180deg, transparent 0%, var(--primary) 50%, transparent 100%) right/2px 100% no-repeat,
              linear-gradient(270deg, transparent 0%, var(--primary) 50%, transparent 100%) bottom/100% 2px no-repeat,
              linear-gradient(0deg, transparent 0%, var(--primary) 50%, transparent 100%) left/2px 100% no-repeat
            `,
          }}
        />
        
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30 pointer-events-none" />
        
        {/* Content */}
        <div 
          className="relative z-10 p-6 h-full flex flex-col"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex-grow">
            <div className="flex items-start gap-4 mb-4">
              <motion.div 
                className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${getCategoryColor()} backdrop-blur-sm shadow-lg relative overflow-hidden`}
                animate={isHovered ? {
                  scale: 1.05,
                  rotate: 3,
                  boxShadow: '0 10px 25px -5px rgba(var(--primary), 0.3)'
                } : {
                  scale: 1,
                  rotate: 0,
                  boxShadow: '0 4px 12px -2px rgba(var(--primary), 0.2)'
                }}
                transition={{ duration: 0.3 }}
              >
                {getFileIcon()}
                <motion.div 
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  animate={{ opacity: [0, 0.2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-gradient-to-r from-secondary/90 to-secondary/70 text-secondary-foreground hover:from-secondary hover:to-secondary/90 border-none shadow-sm text-xs">
                    {resource.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-primary/20 text-primary bg-primary/5">
                    {resource.type.toUpperCase()}
                  </Badge>
                </div>
                
                <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {resource.title}
                </h3>
                
                <p className="text-sm text-muted-foreground line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                  {resource.description}
                </p>
              </div>
            </div>
            
            {/* Stars and download stats (shown on hover) */}
            <AnimatePresence>
              {isHovered && (
                <motion.div 
                  className="flex items-center justify-between mt-2 text-xs text-muted-foreground"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-3 w-3 ${i < stars ? 'fill-primary text-primary' : 'text-muted'}`}
                      />
                    ))}
                    <span className="ml-1">{stars}.0</span>
                  </div>
                  <InteractiveTooltip 
                    content={`This resource has been downloaded ${downloads} times by students`}
                    variant="info"
                    icon={<HelpCircle className="h-4 w-4" />}
                  >
                    <div className="flex items-center gap-1 cursor-help">
                      <Download className="h-3 w-3" />
                      <span>{downloads} downloads</span>
                    </div>
                  </InteractiveTooltip>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Footer */}
          <div className="pt-4 mt-2 border-t border-border/20 flex justify-between items-center">
            <div className="flex items-center text-xs text-muted-foreground gap-3">
              <InteractiveTooltip
                content={`Uploaded by ${resource.uploadedBy}`}
                position="bottom"
              >
                <div className="flex items-center gap-1 cursor-help">
                  <User className="h-3 w-3" />
                  <span>{resource.uploadedBy}</span>
                </div>
              </InteractiveTooltip>
              <InteractiveTooltip
                content={`Uploaded on ${resource.uploadDate}`}
                position="bottom"
              >
                <div className="flex items-center gap-1 cursor-help">
                  <Clock className="h-3 w-3" />
                  <span>{resource.uploadDate}</span>
                </div>
              </InteractiveTooltip>
            </div>
            
            <div className="flex gap-2">
              <InteractiveTooltip content="Preview resource" position="top">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-secondary/20 hover:text-secondary"
                  onClick={handleViewResource}
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Eye className="h-4 w-4" />
                  </motion.div>
                </Button>
              </InteractiveTooltip>
              <InteractiveTooltip content="Download resource" position="top">
                <Button 
                  variant="default" 
                  size="icon" 
                  className="rounded-full bg-primary/90 hover:bg-primary shadow-lg hover:shadow-primary/20"
                  onClick={handleDownloadResource}
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Download className="h-4 w-4" />
                  </motion.div>
                </Button>
              </InteractiveTooltip>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ResourceCard;
