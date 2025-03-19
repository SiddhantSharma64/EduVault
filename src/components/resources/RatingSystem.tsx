import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingSystemProps {
  initialRating?: number;
  totalStars?: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

const RatingSystem = ({
  initialRating = 0,
  totalStars = 5,
  onRatingChange,
  readonly = false,
  size = 'md',
  showValue = false
}: RatingSystemProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  
  const starSizes = {
    sm: 'h-3 w-3',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };
  
  const handleClick = (selectedRating: number) => {
    if (readonly) return;
    
    setRating(selectedRating);
    if (onRatingChange) {
      onRatingChange(selectedRating);
    }
  };
  
  const handleMouseEnter = (hoveredRating: number) => {
    if (readonly) return;
    setHoverRating(hoveredRating);
  };
  
  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverRating(0);
  };
  
  return (
    <div className="flex items-center gap-1">
      <div className="star-rating">
        {[...Array(totalStars)].map((_, index) => {
          const starValue = index + 1;
          const filled = hoverRating ? 
            starValue <= hoverRating : 
            starValue <= rating;
            
          return (
            <Star
              key={index}
              className={`${starSizes[size]} ${filled ? 'star filled' : 'star'} ${readonly ? 'cursor-default' : ''}`}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              fill={filled ? "currentColor" : "none"}
            />
          );
        })}
      </div>
      
      {showValue && (
        <span className="text-sm font-medium ml-1">
          {hoverRating || rating || 0}/{totalStars}
        </span>
      )}
    </div>
  );
};

export default RatingSystem; 