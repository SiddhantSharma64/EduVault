import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { Upload } from 'lucide-react';
import UploadModal from '@/components/UploadModal';
import Link from '@/hooks/use-link';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[20%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-[20%] -left-[20%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2"
          >
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wide">
              Student Resource Sharing Platform
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Share Knowledge. <br />
              <span className="text-primary">Excel Together.</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
              A beautiful, centralized platform for sharing academic resources, notes, past papers, 
              and study materials with your fellow students.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto"
          >
            <Link href="#resources">
              <Button 
                className="flex-1 w-full h-12 rounded-full shadow-button button-hover"
                size="lg"
              >
                Browse Resources
              </Button>
            </Link>
            <UploadModal
              buttonText="Upload Your Work"
              buttonVariant="outline"
              buttonClassName="flex-1 h-12 rounded-full button-hover"
              buttonSize="lg"
              showIcon={true}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="pt-10"
          >
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full animate-hover-float"
              onClick={() => {
                document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <ArrowDown className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
