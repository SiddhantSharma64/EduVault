import React from 'react';
import { BookCopy } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border/30 py-12 mt-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <BookCopy className="h-6 w-6 text-primary" />
              <span className="font-medium text-lg">EduVault</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              A beautiful, centralized platform for sharing academic resources, notes, 
              past papers, and study materials with your fellow students.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-sm">Links</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-foreground transition-colors">Home</a></li>
              <li><a href="#resources" className="hover:text-foreground transition-colors">Resources</a></li>
              <li><a href="#categories" className="hover:text-foreground transition-colors">Categories</a></li>
              <li><a href="#about" className="hover:text-foreground transition-colors">About</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-sm">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="/copyright" className="hover:text-foreground transition-colors">Copyright</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/30 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} EduVault. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2 md:mt-0">
            Made with ❤️ for students
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
