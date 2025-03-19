import React, { useState } from 'react';
import { Search, HelpCircle, PlayCircle, FileText, ArrowRight, MessagesSquare, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface HelpArticle {
  id: string;
  title: string;
  views: number;
}

interface HelpCenterProps {
  popularArticles: HelpArticle[];
  categories: string[];
  onSearchHelp?: (query: string) => void;
  onViewArticle?: (id: string) => void;
  onContactSupport?: () => void;
}

const HelpCenter: React.FC<HelpCenterProps> = ({
  popularArticles,
  categories,
  onSearchHelp,
  onViewArticle,
  onContactSupport
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchHelp && onSearchHelp(searchQuery);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/5">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          <CardTitle>Help Center</CardTitle>
        </div>
        <CardDescription>
          Find answers to your questions and get help with EduVault
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-6 border-b">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        
        <Tabs defaultValue="articles" className="w-full">
          <div className="px-6 pt-4">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="articles" className="p-6 space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Popular Articles</h3>
              <div className="space-y-3">
                {popularArticles.map((article) => (
                  <div 
                    key={article.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => onViewArticle && onViewArticle(article.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">{article.title}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{article.views.toLocaleString()} views</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Browse by Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge 
                    key={category} 
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => onSearchHelp && onSearchHelp(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="videos" className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <PlayCircle className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-medium">Video Tutorials</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'video1', title: 'Getting Started with EduVault', duration: '3:42' },
                  { id: 'video2', title: 'How to Upload Resources', duration: '2:18' },
                  { id: 'video3', title: 'Collaborating with Other Users', duration: '4:55' },
                  { id: 'video4', title: 'Using the Mobile App', duration: '3:10' }
                ].map((video) => (
                  <div 
                    key={video.id}
                    className="group relative h-32 rounded-lg overflow-hidden border cursor-pointer"
                    onClick={() => console.log(`Play video: ${video.id}`)}
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ 
                        backgroundImage: `url(https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmlkZW8lMjB0dXRvcmlhbHxlbnwwfHwwfHx8MA%3D%3D)` 
                      }}
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <PlayCircle className="h-10 w-10 text-white/90" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white text-sm font-medium truncate">{video.title}</p>
                      <p className="text-white/70 text-xs">{video.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="contact" className="p-6">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <MessagesSquare className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-medium">Contact Support</h3>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg flex items-center space-x-4">
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src="https://i.pravatar.cc/150?img=45" />
                  <AvatarFallback>CS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Our support team is here to help</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Average response time: under 24 hours
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center gap-2"
                  onClick={onContactSupport}
                >
                  <MessagesSquare className="h-4 w-4" />
                  Chat with Support
                </Button>
                <Button 
                  variant="default" 
                  className="flex items-center justify-center gap-2"
                  onClick={onContactSupport}
                >
                  <BookOpen className="h-4 w-4" />
                  Open a Ticket
                </Button>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-sm text-center text-muted-foreground">
                  Can't find what you're looking for? Check our 
                  <a href="#" className="text-primary hover:underline mx-1">FAQ</a>
                  or
                  <a href="#" className="text-primary hover:underline ml-1">community forums</a>.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HelpCenter; 