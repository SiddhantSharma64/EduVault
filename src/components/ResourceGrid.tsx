
import React from 'react';
import ResourceCard, { ResourceType } from './ResourceCard';
import { motion } from 'framer-motion';

// Sample data
const sampleResources: ResourceType[] = [
  {
    id: '1',
    title: 'Calculus I - Final Exam Study Guide',
    description: 'Comprehensive study guide covering limits, derivatives, and integrals with practice problems.',
    type: 'pdf',
    category: 'Mathematics',
    uploadedBy: 'Sarah L.',
    uploadDate: '2 days ago'
  },
  {
    id: '2',
    title: 'Introduction to Psychology Notes',
    description: 'Detailed lecture notes covering core concepts in introductory psychology.',
    type: 'doc',
    category: 'Psychology',
    uploadedBy: 'Mark T.',
    uploadDate: '1 week ago'
  },
  {
    id: '3',
    title: 'Organic Chemistry Lab Manual',
    description: 'Complete lab manual with procedures, safety guidelines, and report templates.',
    type: 'pdf',
    category: 'Chemistry',
    uploadedBy: 'Jamie K.',
    uploadDate: '3 days ago'
  },
  {
    id: '4',
    title: 'World History - Ancient Civilizations',
    description: 'Comprehensive notes on ancient civilizations including Egypt, Greece, and Rome.',
    type: 'pdf',
    category: 'History',
    uploadedBy: 'Chris P.',
    uploadDate: '5 days ago'
  },
  {
    id: '5',
    title: 'Computer Science: Data Structures',
    description: 'Tutorial on common data structures with implementation examples in Python.',
    type: 'doc',
    category: 'Computer Science',
    uploadedBy: 'Alex J.',
    uploadDate: '2 weeks ago'
  },
  {
    id: '6',
    title: 'Physics Mechanics Problem Set',
    description: 'Collection of mechanics problems with detailed solutions and explanations.',
    type: 'pdf',
    category: 'Physics',
    uploadedBy: 'Robin M.',
    uploadDate: '4 days ago'
  }
];

const ResourceGrid = () => {
  return (
    <section id="resources" className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">Latest Resources</h2>
          <p className="text-muted-foreground">
            Discover the most recent uploads from students across different subjects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleResources.map((resource, index) => (
            <ResourceCard key={resource.id} resource={resource} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourceGrid;
