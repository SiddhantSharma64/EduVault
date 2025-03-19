import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Link: React.FC<LinkProps> = ({ href, children, className, onClick }) => {
  // For anchor links, implement smooth scrolling
  if (href.startsWith('#')) {
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
  return (
    <RouterLink to={href} className={className} onClick={onClick}>
      {children}
    </RouterLink>
  );
};

export default Link; 