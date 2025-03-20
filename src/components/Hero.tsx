import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles, BookOpen, GraduationCap, Brain } from 'lucide-react';
import { Upload } from 'lucide-react';
import UploadModal from '../components/UploadModal';
import Link from '@/hooks/use-link';
import { navigate } from '@/lib/utils';

const floatingIconVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    }
  }),
  float: (i: number) => ({
    y: [0, -10, 0],
    transition: {
      delay: i * 0.2,
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  })
};

const Hero = () => {
  // Direct navigation handler for Browse Resources button
  const handleBrowseClick = () => {
    const resourcesSection = document.getElementById('resources');
    if (resourcesSection) {
      resourcesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Direct navigation handler for the arrow button
  const handleArrowClick = () => {
    const resourcesSection = document.getElementById('resources');
    if (resourcesSection) {
      resourcesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[20%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-[20%] -left-[20%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-accent/10 blur-3xl" />
      </div>

      {/* Animated particles for visual interest */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full"
            style={{
              background: `rgba(var(--${i % 2 ? 'primary' : 'secondary'}, 0.${3 + i}))`,
              top: `${15 + i * 12}%`,
              left: `${5 + i * 15}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.8, 
              scale: 1,
              y: [0, -20, 0],
              x: [0, i % 2 ? 10 : -10, 0]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "backOut" }}
              className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wide backdrop-blur-sm border border-primary/20 shadow-sm"
            >
              <span className="flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                <span>Student Resource Sharing Platform</span>
              </span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Share Knowledge. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Excel Together.</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
              A beautiful, centralized platform for sharing academic resources, notes, 
              past papers, and study materials with your fellow students.
            </p>
          </motion.div>

          {/* Floating education icons */}
          <div className="flex justify-center gap-12 my-4">
            {[BookOpen, GraduationCap, Brain].map((Icon, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="initial"
                animate={["animate", "float"]}
                variants={floatingIconVariants}
                className={`p-3 rounded-xl bg-gradient-to-br ${
                  i === 0 ? 'from-primary/20 to-primary/10' : 
                  i === 1 ? 'from-secondary/20 to-secondary/10' : 
                  'from-accent/20 to-accent/10'
                } backdrop-blur-sm`}
              >
                <Icon className={`h-7 w-7 ${
                  i === 0 ? 'text-primary' : 
                  i === 1 ? 'text-secondary' : 
                  'text-accent'
                }`} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto"
          >
            {/* Direct button with onClick handler instead of Link wrapper */}
            <Button 
              className="flex-1 w-full h-12 rounded-full shadow-button button-hover bg-gradient-to-r from-primary to-primary/90"
              size="lg"
              onClick={handleBrowseClick}
              data-scroll-to="resources"
            >
              <motion.span 
                initial={{ opacity: 0.8 }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="z-10 relative"
              >
                Browse Resources
              </motion.span>
            </Button>
            
            <div className="flex-1">
              <UploadModal
                buttonText="Upload Your Work"
                buttonVariant="outline"
                buttonClassName="w-full h-12 rounded-full button-hover"
                buttonSize="lg"
                showIcon={true}
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="pt-10"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full bg-primary/5 backdrop-blur-sm border border-primary/10 animate-hover-float"
                onClick={handleArrowClick}
                data-scroll-to="resources"
              >
                <ArrowDown className="h-5 w-5 text-primary" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
