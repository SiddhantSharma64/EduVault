import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { BookCopy, Menu, X, Search, Bell, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Link from '@/hooks/use-link';
import { useApp } from '@/lib/context/AppContext';
import LoginButton from '@/components/auth/LoginButton';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const navbarVariants = {
    visible: { 
      opacity: 1, 
      y: 0,
      backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
      backgroundColor: isScrolled ? 'rgba(var(--background), 0.8)' : 'rgba(var(--background), 0)',
      boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none'
    },
    hidden: { opacity: 0, y: -100 },
  };

  const searchVariants = {
    open: { 
      width: '300px', 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 40 
      }
    },
    closed: { 
      width: '0px', 
      opacity: 0,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 40 
      }
    }
  };

  const mobileMenuVariants = {
    open: {
      height: 'auto',
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const mobileMenuItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    },
    closed: {
      y: 20,
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    }
  };

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-foreground">
            <div className="p-1.5 bg-gradient-to-br from-primary to-accent rounded-lg">
              <BookCopy className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-lg tracking-tight">EduVault</span>
          </Link>
          
          {isMobile ? (
            <div className="flex items-center gap-2">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={searchVariants}
                    className="overflow-hidden mr-2"
                  >
                    <Input 
                      type="search" 
                      placeholder="Search resources..." 
                      className="h-9 rounded-full border-secondary/30 focus-visible:ring-secondary"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleSearch}
                className="rounded-full"
              >
                <Search className="h-5 w-5" />
              </Button>
              
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
            </div>
          ) : (
            <nav className="flex items-center gap-6">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={searchVariants}
                    className="overflow-hidden"
                  >
                    <Input 
                      type="search" 
                      placeholder="Search resources..." 
                      className="h-9 rounded-full"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <ul className="flex gap-6">
                <li>
                  <Link 
                    href="#resources" 
                    className="text-sm text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1 hover:underline decoration-primary decoration-2 underline-offset-4"
                  >
                    Resources
                  </Link>
                </li>
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-sm text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1 hover:underline decoration-primary decoration-2 underline-offset-4">
                        Categories
                        <ChevronDown className="h-3 w-3" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="rounded-xl p-2 bg-background/95 backdrop-blur-md border-border/50">
                      <DropdownMenuItem className="rounded-lg cursor-pointer">Mathematics</DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg cursor-pointer">Computer Science</DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg cursor-pointer">Physics</DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg cursor-pointer">View All</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
                <li>
                  <Link 
                    href="#about" 
                    className="text-sm text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1 hover:underline decoration-primary decoration-2 underline-offset-4"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/features" 
                    className="text-sm text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1 hover:underline decoration-primary decoration-2 underline-offset-4"
                  >
                    Features
                  </Link>
                </li>
              </ul>
              
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={toggleSearch}
                  className="rounded-full"
                >
                  <Search className="h-4 w-4" />
                </Button>
                
                {user && (
                  <Button 
                    variant="ghost"
                    size="icon"
                    className="rounded-full relative"
                  >
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-secondary rounded-full border-2 border-background"></span>
                  </Button>
                )}
                
                <LoginButton />
              </div>
            </nav>
          )}
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed top-[4.5rem] left-0 right-0 z-40 glass shadow-lg overflow-hidden"
          >
            <nav className="flex flex-col gap-2 p-4">
              <motion.div variants={mobileMenuItemVariants}>
                <Link 
                  href="#resources" 
                  className="text-foreground/80 hover:text-foreground p-3 rounded-xl transition-colors hover:bg-primary/5 flex items-center gap-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookCopy className="h-4 w-4 text-primary" />
                  </div>
                  <span>Resources</span>
                </Link>
              </motion.div>
              
              <motion.div variants={mobileMenuItemVariants}>
                <Link 
                  href="#categories" 
                  className="text-foreground/80 hover:text-foreground p-3 rounded-xl transition-colors hover:bg-primary/5 flex items-center gap-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    <ChevronDown className="h-4 w-4 text-secondary" />
                  </div>
                  <span>Categories</span>
                </Link>
              </motion.div>
              
              <motion.div variants={mobileMenuItemVariants}>
                <Link 
                  href="#about" 
                  className="text-foreground/80 hover:text-foreground p-3 rounded-xl transition-colors hover:bg-primary/5 flex items-center gap-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <BookCopy className="h-4 w-4 text-accent" />
                  </div>
                  <span>About</span>
                </Link>
              </motion.div>
              
              <motion.div variants={mobileMenuItemVariants}>
                <Link 
                  href="/features" 
                  className="text-foreground/80 hover:text-foreground p-3 rounded-xl transition-colors hover:bg-primary/5 flex items-center gap-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bell className="h-4 w-4 text-primary" />
                  </div>
                  <span>Features</span>
                </Link>
              </motion.div>
              
              <motion.div 
                variants={mobileMenuItemVariants}
                className="mt-2 pt-2 border-t border-border/30"
              >
                <LoginButton />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
