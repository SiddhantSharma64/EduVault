import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";

interface InteractiveTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "right" | "bottom" | "left";
  delay?: number;
  maxWidth?: number;
  withArrow?: boolean;
  icon?: React.ReactNode;
  variant?: "default" | "info" | "success" | "warning" | "danger";
}

export const InteractiveTooltip: React.FC<InteractiveTooltipProps> = ({
  content,
  children,
  position = "top",
  delay = 0.2,
  maxWidth = 250,
  withArrow = true,
  icon = <Info className="h-4 w-4" />,
  variant = "default",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case "info":
        return {
          bg: "bg-blue-50 dark:bg-blue-950/50",
          border: "border-blue-200 dark:border-blue-800",
          text: "text-blue-700 dark:text-blue-300",
          shadow: "shadow-blue-500/10",
          iconBg: "bg-blue-100 dark:bg-blue-900/50"
        };
      case "success":
        return {
          bg: "bg-green-50 dark:bg-green-950/50",
          border: "border-green-200 dark:border-green-800",
          text: "text-green-700 dark:text-green-300",
          shadow: "shadow-green-500/10",
          iconBg: "bg-green-100 dark:bg-green-900/50"
        };
      case "warning":
        return {
          bg: "bg-amber-50 dark:bg-amber-950/50",
          border: "border-amber-200 dark:border-amber-800",
          text: "text-amber-700 dark:text-amber-300",
          shadow: "shadow-amber-500/10",
          iconBg: "bg-amber-100 dark:bg-amber-900/50"
        };
      case "danger":
        return {
          bg: "bg-red-50 dark:bg-red-950/50",
          border: "border-red-200 dark:border-red-800",
          text: "text-red-700 dark:text-red-300",
          shadow: "shadow-red-500/10",
          iconBg: "bg-red-100 dark:bg-red-900/50"
        };
      default:
        return {
          bg: "bg-background/95",
          border: "border-border",
          text: "text-foreground",
          shadow: "shadow-black/5",
          iconBg: "bg-muted"
        };
    }
  };

  const getPositionStyles = () => {
    switch (position) {
      case "top":
        return {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 10 },
          className: "bottom-full mb-2"
        };
      case "right":
        return {
          initial: { opacity: 0, x: -10 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -10 },
          className: "left-full ml-2"
        };
      case "bottom":
        return {
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -10 },
          className: "top-full mt-2"
        };
      case "left":
        return {
          initial: { opacity: 0, x: 10 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 10 },
          className: "right-full mr-2"
        };
      default:
        return {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 10 },
          className: "bottom-full mb-2"
        };
    }
  };

  const getArrowStyles = () => {
    const variantStyles = getVariantStyles();
    
    switch (position) {
      case "top":
        return `after:top-full after:left-1/2 after:-translate-x-1/2 after:border-t-8 after:border-l-8 after:border-r-8 after:border-t-${variantStyles.border.split('-')[1]} after:border-l-transparent after:border-r-transparent`;
      case "right":
        return `after:left-0 after:top-1/2 after:-translate-x-full after:-translate-y-1/2 after:border-t-8 after:border-r-8 after:border-b-8 after:border-r-${variantStyles.border.split('-')[1]} after:border-t-transparent after:border-b-transparent`;
      case "bottom":
        return `after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-b-8 after:border-l-8 after:border-r-8 after:border-b-${variantStyles.border.split('-')[1]} after:border-l-transparent after:border-r-transparent`;
      case "left":
        return `after:right-0 after:top-1/2 after:translate-x-full after:-translate-y-1/2 after:border-t-8 after:border-l-8 after:border-b-8 after:border-l-${variantStyles.border.split('-')[1]} after:border-t-transparent after:border-b-transparent`;
      default:
        return "";
    }
  };

  const positionStyles = getPositionStyles();
  const variantStyles = getVariantStyles();
  const arrowStyles = withArrow ? getArrowStyles() : "";

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`absolute z-50 ${positionStyles.className}`}
            initial={positionStyles.initial}
            animate={positionStyles.animate}
            exit={positionStyles.exit}
            transition={{ duration: 0.2, delay: isVisible ? delay : 0 }}
          >
            <div
              className={`relative rounded-lg ${variantStyles.bg} border ${variantStyles.border} ${variantStyles.text} p-3 shadow-lg ${variantStyles.shadow} backdrop-blur-sm ${arrowStyles} after:absolute after:h-0 after:w-0`}
              style={{ maxWidth }}
            >
              <div className="flex gap-2">
                {icon && (
                  <div className={`rounded-full p-1 ${variantStyles.iconBg} flex-shrink-0`}>
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {icon}
                    </motion.div>
                  </div>
                )}
                <div>
                  {typeof content === 'string' ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                      className="text-sm"
                    >
                      {content}
                    </motion.p>
                  ) : (
                    content
                  )}
                </div>
              </div>
              
              {/* Float animation particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-primary/10"
                    style={{
                      width: 4 + i * 2,
                      height: 4 + i * 2,
                      top: `${20 + i * 20}%`,
                      left: `${10 + i * 30}%`,
                    }}
                    animate={{
                      y: [0, -5, 0],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 1.5 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveTooltip; 