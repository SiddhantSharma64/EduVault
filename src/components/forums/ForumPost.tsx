import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown,
  Reply,
  Flag,
  MoreHorizontal,
  MessageCircle,
  Share
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface ForumReply {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
}

export interface ForumPostData {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    role?: string;
    points?: number;
  };
  title?: string;
  content: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  replies: ForumReply[] | number;
  isUserPost?: boolean;
}

interface ForumPostProps {
  post: ForumPostData;
  onReply?: () => void;
  onReport?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ForumPost: React.FC<ForumPostProps> = ({
  post,
  onReply,
  onReport,
  onEdit,
  onDelete
}) => {
  const { author, content, createdAt, upvotes, downvotes, isUserPost = false } = post;
  const [votes, setVotes] = useState({ up: upvotes, down: downvotes });
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  
  const handleVote = (type: 'up' | 'down') => {
    // If user already voted this way, remove the vote
    if (userVote === type) {
      setVotes(prev => ({
        ...prev,
        [type]: prev[type] - 1
      }));
      setUserVote(null);
    } 
    // If user voted the other way, switch the vote
    else if (userVote) {
      setVotes(prev => ({
        up: userVote === 'up' ? prev.up - 1 : type === 'up' ? prev.up + 1 : prev.up,
        down: userVote === 'down' ? prev.down - 1 : type === 'down' ? prev.down + 1 : prev.down,
      }));
      setUserVote(type);
    } 
    // If user hasn't voted, add the vote
    else {
      setVotes(prev => ({
        ...prev,
        [type]: prev[type] + 1
      }));
      setUserVote(type);
    }
  };
  
  // Handle the replies which can be an array or a number
  const replyCount = typeof post.replies === 'number' ? post.replies : post.replies.length;
  
  return (
    <Card className="forum-post">
      <CardHeader className="pb-2 flex flex-row justify-between items-start">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{author.name}</span>
              {author.role && (
                <Badge variant="outline" className="text-xs">{author.role}</Badge>
              )}
              {isUserPost && (
                <Badge variant="secondary" className="text-xs">Author</Badge>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              <span>Posted {createdAt}</span>
              {author.points && (
                <span className="ml-2 text-primary">{author.points} pts</span>
              )}
            </div>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onReply}>
              <Reply className="h-4 w-4 mr-2" />
              Reply
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onReport}>
              <Flag className="h-4 w-4 mr-2" />
              Report
            </DropdownMenuItem>
            {isUserPost && (
              <>
                <DropdownMenuItem onClick={onEdit}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete} className="text-destructive">
                  Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      
      <CardContent>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p>{content}</p>
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between pt-2 border-t">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`vote-button h-8 w-8 ${userVote === 'up' ? 'text-primary' : ''}`}
              onClick={() => handleVote('up')}
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <span className="text-sm">{votes.up}</span>
          </div>
          
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`vote-button h-8 w-8 ${userVote === 'down' ? 'text-destructive' : ''}`}
              onClick={() => handleVote('down')}
            >
              <ThumbsDown className="h-4 w-4" />
            </Button>
            <span className="text-sm">{votes.down}</span>
          </div>
          
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="vote-button h-8 w-8"
              onClick={onReply}
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
            <span className="text-sm">{replyCount}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs">
            <Share className="h-3.5 w-3.5" />
            <span>Share</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ForumPost; 