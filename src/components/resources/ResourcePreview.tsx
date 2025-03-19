import React, { useState } from 'react';
import { 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  MessageSquare, 
  Pen, 
  Highlighter,
  Eraser,
  Eye,
  Pencil,
  Share2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

interface Annotation {
  id: string;
  userId: string;
  userName: string;
  page: number;
  type: 'highlight' | 'comment';
  content: string;
  color?: string;
  position: {
    x: number;
    y: number;
    width?: number;
    height?: number;
  };
}

interface ResourcePreviewProps {
  id: string;
  title: string;
  currentPage: number;
  totalPages: number;
  annotations: Annotation[];
  onPageChange?: (page: number) => void;
  onDownload?: () => void;
  onAddAnnotation?: (type: string, position: { x: number, y: number }) => void;
}

const ResourcePreview: React.FC<ResourcePreviewProps> = ({
  id,
  title,
  currentPage,
  totalPages,
  annotations,
  onPageChange,
  onDownload,
  onAddAnnotation
}) => {
  const [activeTab, setActiveTab] = useState<string>('preview');
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  
  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) {
      onPageChange && onPageChange(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      onPageChange && onPageChange(currentPage + 1);
    }
  };
  
  const handleToolSelect = (tool: string) => {
    setActiveTool(activeTool === tool ? null : tool);
  };
  
  const handlePreviewClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!activeTool) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    onAddAnnotation && onAddAnnotation(activeTool, { x, y });
  };

  return (
    <Card className={`flex flex-col ${isFullScreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[600px]'}`}>
      <CardHeader className="pb-0 pt-3 px-3 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-primary mr-2" />
            <CardTitle className="text-lg truncate max-w-[300px]">{title}</CardTitle>
          </div>
          <div className="flex items-center space-x-1">
            <Button 
              size="sm" 
              variant="ghost"
              className="h-8 px-2"
              onClick={() => setIsFullScreen(!isFullScreen)}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost"
              className="h-8 px-2"
              onClick={onDownload}
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost"
              className="h-8 px-2"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <div className="flex-grow flex overflow-hidden">
        <div className="w-[64px] bg-muted/30 p-2 flex flex-col items-center justify-start border-r">
          <TooltipProvider>
            <div className="space-y-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="icon" 
                    variant={activeTool === 'highlight' ? 'default' : 'ghost'}
                    className="h-10 w-10"
                    onClick={() => handleToolSelect('highlight')}
                  >
                    <Highlighter className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Highlight Text</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="icon" 
                    variant={activeTool === 'comment' ? 'default' : 'ghost'}
                    className="h-10 w-10"
                    onClick={() => handleToolSelect('comment')}
                  >
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Add Comment</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="icon" 
                    variant={activeTool === 'draw' ? 'default' : 'ghost'}
                    className="h-10 w-10"
                    onClick={() => handleToolSelect('draw')}
                  >
                    <Pencil className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Draw on Document</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="icon" 
                    variant="ghost"
                    className="h-10 w-10 mt-2"
                    onClick={() => setActiveTool(null)}
                  >
                    <Eraser className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Clear Tool Selection</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
        
        <div className="flex-grow relative">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
            <div className="px-3 py-2 bg-muted/20 border-b">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="annotations">Annotations ({annotations.length})</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="preview" className="flex-grow m-0 p-0 relative">
              <div 
                className="absolute inset-0 overflow-auto bg-white p-4"
                onClick={handlePreviewClick}
              >
                {/* Placeholder for document content */}
                <div className="relative bg-muted/10 w-full h-full rounded-md flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="text-muted-foreground">
                      Page Preview
                    </div>
                    <div className="text-lg font-medium">
                      Page {currentPage} of {totalPages}
                    </div>
                  </div>
                  
                  {/* Render annotations for current page */}
                  {annotations
                    .filter(a => a.page === currentPage)
                    .map(annotation => (
                      <div
                        key={annotation.id}
                        className={`absolute ${annotation.type === 'highlight' 
                          ? 'bg-yellow-200/50 border border-yellow-300' 
                          : 'cursor-pointer'}`}
                        style={{
                          left: `${annotation.position.x}px`,
                          top: `${annotation.position.y}px`,
                          width: annotation.position.width ? `${annotation.position.width}px` : 'auto',
                          height: annotation.position.height ? `${annotation.position.height}px` : 'auto',
                        }}
                      >
                        {annotation.type === 'comment' && (
                          <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                            <MessageSquare className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                    ))
                  }
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="annotations" className="flex-grow m-0 p-0 overflow-auto">
              <div className="p-4 space-y-4">
                <h3 className="text-sm font-medium">Annotations for Page {currentPage}</h3>
                
                {annotations
                  .filter(a => a.page === currentPage)
                  .map(annotation => (
                    <div key={annotation.id} className="p-3 border rounded-md space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={`https://i.pravatar.cc/150?u=${annotation.userId}`} />
                            <AvatarFallback>{annotation.userName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{annotation.userName}</span>
                        </div>
                        <Badge color={annotation.type === 'highlight' ? 'yellow' : 'blue'}>
                          {annotation.type}
                        </Badge>
                      </div>
                      <p className="text-sm">
                        {annotation.content}
                      </p>
                    </div>
                  ))}
                
                {annotations.filter(a => a.page === currentPage).length === 0 && (
                  <div className="text-center py-6 text-muted-foreground">
                    No annotations on this page
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <CardFooter className="border-t py-2 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => handlePageChange('prev')}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => handlePageChange('next')}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground">
          {activeTool ? `Tool: ${activeTool}` : 'Click a tool to annotate'}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResourcePreview; 