import React from "react";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "primary" | "secondary" | "accent";
  text?: string;
  showText?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = "md",
  variant = "primary",
  text = "Loading...",
  showText = true 
}) => {
  const getSize = () => {
    switch (size) {
      case "sm": return "w-12 h-12";
      case "md": return "w-16 h-16";
      case "lg": return "w-24 h-24";
      case "xl": return "w-32 h-32";
      default: return "w-16 h-16";
    }
  };

  const getColor = () => {
    switch (variant) {
      case "primary": return "text-primary";
      case "secondary": return "text-secondary";
      case "accent": return "text-accent";
      default: return "text-primary";
    }
  };

  const getFontSize = () => {
    switch (size) {
      case "sm": return "text-xs";
      case "md": return "text-sm";
      case "lg": return "text-base";
      case "xl": return "text-lg";
      default: return "text-sm";
    }
  };

  const bookVariants = {
    animate: {
      rotateY: [0, 180],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pageVariants = {
    animate: (i: number) => ({
      rotateY: [0, 180],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.15
      }
    })
  };

  const loaderVariants = {
    start: {
      scale: 0.8,
      opacity: 0.3
    },
    end: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`relative ${getSize()} ${getColor()}`}>
        {/* Book/document loader with pages */}
        <div className="relative w-full h-full">
          {/* Base book */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg shadow-lg border border-primary/10 backdrop-blur-sm"
            variants={bookVariants}
            animate="animate"
            style={{ transformStyle: "preserve-3d", perspective: "500px" }}
          />
          
          {/* Pages */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={pageVariants}
              animate="animate"
              className={`absolute inset-0 border-r border-primary/30 bg-background/80 rounded-lg`}
              style={{ 
                transformStyle: "preserve-3d", 
                transformOrigin: "left center",
                left: `${i * 2}px`,
                right: `${i * 2}px`,
                top: `${i * 2}px`,
                bottom: `${i * 2}px`,
                zIndex: 3 - i
              }}
            />
          ))}
          
          {/* Particles for visual interest */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-primary/30"
              style={{
                width: `${4 + i * 2}px`,
                height: `${4 + i * 2}px`,
                top: `${25 + i * 15}%`,
                left: `${20 + i * 20}%`,
              }}
              animate={{
                y: [0, -10, 0],
                x: [0, i % 2 ? 5 : -5, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 1 + i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1
              }}
            />
          ))}
          
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-primary/5 rounded-lg filter blur-md"
            variants={loaderVariants}
            initial="start"
            animate="end"
          />
        </div>
      </div>
      
      {showText && (
        <motion.div 
          className={`mt-4 ${getFontSize()} font-medium ${getColor()}`}
          variants={textVariants}
          animate="animate"
        >
          {text}
        </motion.div>
      )}
    </div>
  );
};

export default LoadingSpinner; 