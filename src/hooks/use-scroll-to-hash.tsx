import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToHash() {
  const location = useLocation();
  
  const scrollToHash = useCallback(() => {
    const { hash } = location;
    
    if (hash) {
      // Remove the # character
      const targetId = hash.substring(1);
      const element = document.getElementById(targetId);
      
      if (element) {
        // Use setTimeout to ensure the DOM is fully loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // If there's no hash, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);
  
  useEffect(() => {
    scrollToHash();
  }, [scrollToHash, location]);
  
  return null;
}

// Component version of the hook for direct use in JSX
const ScrollToHash = () => {
  useScrollToHash();
  return null;
};

export default ScrollToHash; 