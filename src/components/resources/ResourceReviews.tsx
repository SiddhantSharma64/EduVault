import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp, Flag, MessageCircle, Filter, SortAsc, SortDesc } from 'lucide-react';
import RatingSystem from './RatingSystem';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

export interface Review {
  id: string;
  rating: number;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  datePosted: string;
  helpfulCount: number;
  isHelpful?: boolean;
  userRole?: string;
}

interface ResourceReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  ratingCounts: number[];
  isLoggedIn?: boolean;
  userHasReviewed?: boolean;
  onAddReview?: (rating: number, content: string) => void;
  onMarkHelpful?: (reviewId: string) => void;
  onReport?: (reviewId: string) => void;
}

const ResourceReviews = ({
  reviews,
  averageRating,
  totalReviews,
  ratingCounts,
  isLoggedIn = false,
  userHasReviewed = false,
  onAddReview,
  onMarkHelpful,
  onReport
}: ResourceReviewsProps) => {
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [sortOption, setSortOption] = useState<'newest' | 'helpful' | 'highest' | 'lowest'>('newest');
  const [filterOption, setFilterOption] = useState<number | null>(null);
  
  // Calculate the percentage for each star rating
  const percentages = ratingCounts.map(count => (count / totalReviews) * 100);
  
  // Sort reviews based on sortOption
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime();
      case 'helpful':
        return b.helpfulCount - a.helpfulCount;
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      default:
        return 0;
    }
  });
  
  // Filter reviews if filterOption is set
  const filteredReviews = filterOption 
    ? sortedReviews.filter(review => review.rating === filterOption)
    : sortedReviews;
  
  const handleSubmitReview = () => {
    if (newRating === 0 || !newReview.trim()) return;
    
    if (onAddReview) {
      onAddReview(newRating, newReview.trim());
      setNewReview('');
      setNewRating(0);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Reviews & Ratings</CardTitle>
        <CardDescription>
          See what others think about this resource
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Rating summary */}
          <div className="md:w-1/3">
            <div className="text-center mb-4">
              <div className="text-4xl font-bold">
                {averageRating.toFixed(1)}
              </div>
              <RatingSystem 
                initialRating={averageRating} 
                readonly 
                size="md"
              />
              <div className="text-sm text-muted-foreground mt-1">
                {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
              </div>
            </div>
            
            <div className="space-y-2">
              {ratingCounts.map((count, index) => (
                <div key={5 - index} className="flex items-center gap-2">
                  <div className="text-sm w-10">{5 - index} stars</div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${percentages[index]}%` }}
                    />
                  </div>
                  <div className="text-sm w-10 text-right">
                    {count}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Add a review */}
          {isLoggedIn && !userHasReviewed && (
            <div className="md:w-2/3">
              <h3 className="font-medium mb-2">Add Your Review</h3>
              <div className="mb-3">
                <RatingSystem 
                  initialRating={newRating} 
                  onRatingChange={setNewRating}
                  size="lg"
                  showValue
                />
              </div>
              <Textarea 
                placeholder="Share your experience with this resource..." 
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className="min-h-[100px] mb-3"
              />
              <Button 
                onClick={handleSubmitReview}
                disabled={newRating === 0 || !newReview.trim()}
              >
                Submit Review
              </Button>
            </div>
          )}
          
          {/* Login/Already reviewed message */}
          {(!isLoggedIn || userHasReviewed) && (
            <div className="md:w-2/3 flex items-center justify-center p-6 border rounded-md bg-muted/20">
              <div className="text-center">
                {!isLoggedIn ? (
                  <>
                    <MessageCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <h3 className="font-medium mb-1">Sign in to leave a review</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Share your thoughts with the community
                    </p>
                    <Button>Sign In</Button>
                  </>
                ) : (
                  <>
                    <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-medium mb-1">You've already reviewed this resource</h3>
                    <p className="text-sm text-muted-foreground">
                      Thank you for your contribution!
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        
        <Separator className="my-6" />
        
        {/* Reviews list */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">
              {filteredReviews.length} {filteredReviews.length === 1 ? 'Review' : 'Reviews'}
              {filterOption && ` with ${filterOption} stars`}
            </h3>
            
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
                    <Filter className="h-3 w-3 mr-1" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuRadioGroup value={filterOption?.toString() || "all"} onValueChange={(value) => {
                    setFilterOption(value === "all" ? null : parseInt(value))
                  }}>
                    <DropdownMenuRadioItem value="all">All Ratings</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="5">5 Stars</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="4">4 Stars</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="3">3 Stars</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="2">2 Stars</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="1">1 Star</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
                    {sortOption === 'newest' || sortOption === 'helpful' ? (
                      <SortDesc className="h-3 w-3 mr-1" />
                    ) : (
                      <SortAsc className="h-3 w-3 mr-1" />
                    )}
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuRadioGroup value={sortOption} onValueChange={(value: 'newest' | 'helpful' | 'highest' | 'lowest') => setSortOption(value)}>
                    <DropdownMenuRadioItem value="newest">Newest First</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="helpful">Most Helpful</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="highest">Highest Rated</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="lowest">Lowest Rated</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredReviews.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No reviews match your filter criteria.
              </div>
            ) : (
              filteredReviews.map(review => (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={review.authorAvatar} alt={review.authorName} />
                        <AvatarFallback>{review.authorName.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.authorName}</span>
                          {review.userRole && (
                            <Badge variant="outline" className="text-xs">{review.userRole}</Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {review.datePosted}
                        </div>
                      </div>
                    </div>
                    <RatingSystem initialRating={review.rating} readonly size="sm" />
                  </div>
                  
                  <p className="text-sm mb-3">{review.content}</p>
                  
                  <div className="flex items-center justify-between">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-xs gap-1"
                      onClick={() => onMarkHelpful && onMarkHelpful(review.id)}
                      disabled={!isLoggedIn || review.isHelpful}
                    >
                      <ThumbsUp className={`h-3 w-3 ${review.isHelpful ? 'text-primary fill-primary' : ''}`} />
                      Helpful ({review.helpfulCount})
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-xs text-muted-foreground"
                      onClick={() => onReport && onReport(review.id)}
                      disabled={!isLoggedIn}
                    >
                      <Flag className="h-3 w-3 mr-1" />
                      Report
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center">
        {reviews.length > 5 && (
          <Button variant="outline">
            Show More Reviews
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ResourceReviews; 