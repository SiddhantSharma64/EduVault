import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to combine Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Navigate to a specific route or scroll to an element
 * @param target - The target route or element ID to navigate to
 */
export function navigate(target: string): void {
  // Handle fragment identifiers (scrolling to elements)
  if (target.startsWith('#')) {
    const elementId = target.substring(1);
    const element = document.getElementById(elementId);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      return;
    }
  }
  
  // Handle internal app routes
  if (target.startsWith('/')) {
    window.location.href = target;
    return;
  }
  
  // Handle external URLs
  if (target.includes('://') || target.startsWith('www.')) {
    window.open(target, '_blank', 'noopener,noreferrer');
    return;
  }
}
