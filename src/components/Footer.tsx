import React from 'react';
import { BookCopy, Github, Twitter, Instagram, Facebook, Heart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from '@/hooks/use-link';

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  // For IDs, add a data attribute for our navigation fix component
  const isIdLink = href.startsWith('#');
  const dataScrollTo = isIdLink ? href.substring(1) : undefined;
  
  return (
    <li>
      <Link 
        href={href} 
        className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1 group"
        data-scroll-to={dataScrollTo}
      >
        <span className="group-hover:underline decoration-primary decoration-2 underline-offset-4">{children}</span>
        {!href.startsWith('#') && !href.startsWith('/') && (
          <ExternalLink className="h-3 w-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
        )}
      </Link>
    </li>
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-border/30 py-16 mt-12 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-12">
          <div className="md:col-span-3 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-gradient-to-br from-primary to-accent rounded-lg">
                <BookCopy className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-lg">EduVault</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              A beautiful, centralized platform for sharing academic resources, notes, 
              past papers, and study materials with your fellow students.
            </p>
            
            <div className="flex gap-4 mt-6">
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted/80 hover:bg-primary/10 hover:text-primary transition-colors"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <Twitter className="h-4 w-4" />
              </motion.a>
              <motion.a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted/80 hover:bg-primary/10 hover:text-primary transition-colors"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <Github className="h-4 w-4" />
              </motion.a>
              <motion.a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted/80 hover:bg-primary/10 hover:text-primary transition-colors"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <Instagram className="h-4 w-4" />
              </motion.a>
              <motion.a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted/80 hover:bg-primary/10 hover:text-primary transition-colors"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <Facebook className="h-4 w-4" />
              </motion.a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-foreground">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="#resources">Resources</FooterLink>
              <FooterLink href="#categories">Categories</FooterLink>
              <FooterLink href="#about">About</FooterLink>
              <FooterLink href="/features">Features</FooterLink>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-foreground">Legal</h3>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/copyright">Copyright</FooterLink>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-foreground">Join Newsletter</h3>
            <p className="text-sm text-muted-foreground">Stay updated with the latest resources and features.</p>
            <div className="flex mt-2 space-x-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 flex-grow"
              />
              <Button 
                size="sm" 
                className="rounded-md bg-gradient-to-r from-primary to-accent text-white h-9"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/30 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} EduVault. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2 md:mt-0 flex items-center gap-1">
            Made with 
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="h-3 w-3 text-red-500 fill-red-500" />
            </motion.span> 
            for students
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
