import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  to?: string; // Support for react-router "to" prop
}

const Link: React.FC<LinkProps> = ({ href, to, children, className, onClick }) => {
  // For anchor links, implement smooth scrolling
  if (href && href.startsWith('#')) {
    const handleAnchorClick = (e: React.MouseEvent) => {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      
      if (onClick) {
        onClick();
      }
    };
    
    return (
      <a href={href} className={className} onClick={handleAnchorClick}>
        {children}
      </a>
    );
  }
  
  // Otherwise, use react-router-dom's Link for client-side navigation
  // Prioritize 'to' prop if provided (for direct RouterLink compatibility)
  const destination = to || href || "/";
  
  return (
    <RouterLink to={destination} className={className} onClick={onClick}>
      {children}
    </RouterLink>
  );
};

export default Link; 