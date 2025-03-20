import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ResourceGrid from '@/components/ResourceGrid';
import UploadModal from '@/components/UploadModal';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronRight, Book, File, FileText, History, Presentation, Search } from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading-spinner';

const categories = [
  { id: 'math', name: 'Mathematics', icon: <FileText className="h-5 w-5" />, count: 56 },
  { id: 'cs', name: 'Computer Science', icon: <FileText className="h-5 w-5" />, count: 43 },
  { id: 'physics', name: 'Physics', icon: <FileText className="h-5 w-5" />, count: 38 },
  { id: 'chemistry', name: 'Chemistry', icon: <FileText className="h-5 w-5" />, count: 29 },
  { id: 'bio', name: 'Biology', icon: <FileText className="h-5 w-5" />, count: 24 },
  { id: 'history', name: 'History', icon: <History className="h-5 w-5" />, count: 31 },
  { id: 'psych', name: 'Psychology', icon: <FileText className="h-5 w-5" />, count: 27 },
  { id: 'lit', name: 'Literature', icon: <Book className="h-5 w-5" />, count: 35 },
];

const formatNumbers = (num: number) => {
  return new Intl.NumberFormat('en-US', { 
    notation: 'compact',
    compactDisplay: 'short'
  }).format(num);
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <LoadingSpinner size="lg" text="Preparing your learning resources..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <ResourceGrid />
        
        <section id="categories" className="py-20 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold tracking-tight mb-4">Browse by Category</h2>
              <p className="text-muted-foreground">
                Explore resources organized by academic subjects
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.05,
                  }}
                >
                  <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-soft transition-all duration-300 card-hover">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        {category.icon}
                      </div>
                      <div className="text-xs text-muted-foreground bg-secondary/80 px-2 py-1 rounded-full">
                        {formatNumbers(category.count)}
                      </div>
                    </div>
                    <h3 className="font-medium mb-1">{category.name}</h3>
                    <div className="flex justify-between items-center mt-3">
                      <Button
                        variant="ghost"
                        className="p-0 h-auto text-sm text-primary hover:text-primary/80 hover:bg-transparent"
                        onClick={() => {
                          document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' });
                          // In a real app, this would filter resources by category
                          console.log(`Browsing ${category.name} resources`);
                        }}
                        data-scroll-to="resources"
                      >
                        Browse resources
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold tracking-tight mb-4">Resource Types</h2>
              <p className="text-muted-foreground">
                Find exactly what you need, from lecture notes to practice exams
              </p>
            </motion.div>
            
            <Tabs defaultValue="notes" className="w-full">
              <TabsList className="grid w-full grid-cols-5 md:max-w-2xl mx-auto rounded-full p-1">
                <TabsTrigger value="notes" className="rounded-full">Notes</TabsTrigger>
                <TabsTrigger value="exams" className="rounded-full">Past Exams</TabsTrigger>
                <TabsTrigger value="papers" className="rounded-full">Papers</TabsTrigger>
                <TabsTrigger value="slides" className="rounded-full">Slides</TabsTrigger>
                <TabsTrigger value="books" className="rounded-full">Books</TabsTrigger>
              </TabsList>
              
              <TabsContent value="notes" className="mt-8 rounded-lg border p-6 bg-card shadow-soft">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/2">
                    <h3 className="text-xl font-semibold mb-3">Lecture Notes</h3>
                    <p className="text-muted-foreground mb-4">
                      Discover comprehensive lecture notes from various courses, organized by subject and topic.
                      Perfect for catching up on missed classes or enhancing your study sessions.
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        <span className="text-sm">Detailed class notes</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        <span className="text-sm">Summary sheets</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        <span className="text-sm">Student annotations</span>
                      </li>
                    </ul>
                    <Button 
                      className="rounded-full"
                      onClick={() => {
                        document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' });
                        // In a real app, this would filter resources by type
                        console.log('Browsing lecture notes');
                      }}
                      data-scroll-to="resources"
                    >
                      Browse Lecture Notes
                    </Button>
                  </div>
                  <div className="md:w-1/2 glass rounded-xl p-6 aspect-video flex items-center justify-center">
                    <File className="h-20 w-20 text-primary/30" />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="exams">
                <div className="mt-8 text-center">Coming soon...</div>
              </TabsContent>
              <TabsContent value="papers">
                <div className="mt-8 text-center">Coming soon...</div>
              </TabsContent>
              <TabsContent value="slides">
                <div className="mt-8 text-center">Coming soon...</div>
              </TabsContent>
              <TabsContent value="books">
                <div className="mt-8 text-center">Coming soon...</div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        <section className="py-20 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Share Your Knowledge
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Help your fellow students by sharing your notes, summaries, or study guides.
                  Every contribution makes a difference!
                </p>
                
                <UploadModal />
              </motion.div>
            </div>
          </div>
        </section>
        
        <section id="about" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  About EduVault
                </h2>
                <p className="text-muted-foreground">
                  Our mission is to make quality academic resources accessible to all students
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-center space-y-4"
                >
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium">Find</h3>
                  <p className="text-sm text-muted-foreground">
                    Quickly locate the resources you need with our powerful search and filters
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center space-y-4"
                >
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                    <Book className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium">Learn</h3>
                  <p className="text-sm text-muted-foreground">
                    Use high-quality materials to enhance your understanding and academic performance
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-center space-y-4"
                >
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                    <Presentation className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium">Share</h3>
                  <p className="text-sm text-muted-foreground">
                    Contribute your own resources to help others and build a collaborative community
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
