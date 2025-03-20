import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * This component fixes various navigation issues by adding global event listeners 
 * and patches for elements that need specific handling
 */
const FixNavigation: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fix for links that target IDs
    const handleAnchorClick = (e: MouseEvent) => {
      // Get the clicked element or its ancestor anchor
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        
        // Handle internal fragment links
        if (href?.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          if (targetId) {
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
        
        // Handle data-scroll-to attribute on anchors
        const scrollTo = anchor.getAttribute('data-scroll-to');
        if (scrollTo) {
          e.preventDefault();
          const element = document.getElementById(scrollTo);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
        
        // Handle internal app navigation
        const isInternal = href?.startsWith('/') && !href.startsWith('//') && !href.includes('://');
        if (isInternal) {
          e.preventDefault();
          navigate(href);
        }
      }
    };

    // Fix for buttons that need to navigate or scroll
    const handleButtonClick = (e: MouseEvent) => {
      // Look for the clicked element or any ancestor button
      let target = e.target as HTMLElement;
      
      // Handle clicks on SVGs, spans or other elements inside buttons
      while (target && target !== document.body) {
        // Check if we're clicking on a button or an element with navigation attributes
        const isButton = target.tagName.toLowerCase() === 'button';
        const hasNavAttribute = target.hasAttribute('data-navigate-to') || 
                               target.hasAttribute('data-scroll-to');
        
        if (isButton || hasNavAttribute) {
          const navigateTo = target.getAttribute('data-navigate-to');
          const scrollTo = target.getAttribute('data-scroll-to');
          
          // Handle navigation
          if (navigateTo) {
            if (navigateTo.startsWith('/')) {
              e.preventDefault();
              navigate(navigateTo);
            } else {
              window.location.href = navigateTo;
            }
          }
          
          // Handle scrolling
          if (scrollTo) {
            e.preventDefault();
            const element = document.getElementById(scrollTo);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }
          
          break;
        }
        
        target = target.parentElement as HTMLElement;
      }
    };
    
    // Monitor and fix broken links
    document.addEventListener('click', handleAnchorClick, true);
    document.addEventListener('click', handleButtonClick, true);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick, true);
      document.removeEventListener('click', handleButtonClick, true);
    };
  }, [navigate]);
  
  return null;
};

export default FixNavigation; 