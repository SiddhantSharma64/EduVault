import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BookCopy, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Link from '@/hooks/use-link';
import { useApp } from '@/lib/context/AppContext';
import LoginButton from '@/components/auth/LoginButton';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { user } = useApp();

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
          isScrolled ? 'glass shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-foreground">
            <BookCopy className="h-6 w-6 text-primary" />
            <span className="font-medium text-lg tracking-tight">EduVault</span>
          </Link>
          
          {isMobile ? (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMobileMenu}
              className="rounded-full"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          ) : (
            <nav className="flex items-center gap-6">
              <ul className="flex gap-6">
                <li>
                  <Link 
                    href="#resources" 
                    className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                  >
                    Resources
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#categories" 
                    className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#about" 
                    className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/features" 
                    className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                  >
                    Features
                  </Link>
                </li>
              </ul>
              <LoginButton />
            </nav>
          )}
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-[4.5rem] left-0 right-0 z-40 glass shadow-lg p-4 ${
            isMobileMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <nav className="flex flex-col gap-4">
            <Link 
              href="#resources" 
              className="text-foreground/80 hover:text-foreground p-2 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link 
              href="#categories" 
              className="text-foreground/80 hover:text-foreground p-2 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              href="#about" 
              className="text-foreground/80 hover:text-foreground p-2 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/features" 
              className="text-foreground/80 hover:text-foreground p-2 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <LoginButton />
          </nav>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
