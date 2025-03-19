import { MessageSquare, BookOpen, FileText, Book } from 'lucide-react';
import React from 'react';
import { UserBadge } from '@/components/gamification/BadgeDisplay';
import { LeaderboardUser } from '@/components/gamification/Leaderboard';
import { ForumCategoryProps } from '@/components/forums/ForumCategory';
import { ForumPostProps } from '@/components/forums/ForumPost';
import { Version } from '@/components/resources/VersionControl';
import { Review } from '@/components/resources/ResourceReviews';
import { UserProfileData } from '@/components/profile/UserProfile';
import { RecommendedResource } from '@/components/recommendations/ResourceRecommendations';
import { Collaborator, ChatMessage, DocumentHistory } from '@/components/collaboration/CollaborationEditor';

// User points data
const userPoints = {
  points: 375,
  level: 3,
  nextLevelPoints: 500
};

// User badges
const userBadges: UserBadge[] = [
  {
    id: 'badge1',
    name: 'Top Contributor',
    description: 'Awarded to users who contribute high-quality resources consistently',
    type: 'achievement',
    icon: 'trophy',
    unlocked: true,
    date: 'June 15, 2023'
  },
  {
    id: 'badge2',
    name: 'Helpful Reviewer',
    description: 'Provided 10 or more helpful reviews on resources',
    type: 'milestone',
    icon: 'star',
    unlocked: true,
    date: 'July 21, 2023'
  },
  {
    id: 'badge3',
    name: 'Resource Star',
    description: 'Uploaded 5 or more resources with 4+ star ratings',
    type: 'achievement',
    icon: 'upload',
    unlocked: true,
    date: 'August 3, 2023'
  },
  {
    id: 'badge4',
    name: 'Community Guide',
    description: 'Helped others in forums with 20+ helpful replies',
    type: 'special',
    icon: 'comment',
    unlocked: false
  },
  {
    id: 'badge5',
    name: 'Knowledge Seeker',
    description: 'Downloaded 50+ resources across different categories',
    type: 'milestone',
    icon: 'book',
    unlocked: false
  }
];

// Leaderboard data
const leaderboardUsers: LeaderboardUser[] = [
  {
    id: 'user1',
    name: 'Emily Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    points: 1240,
    rank: 1,
    badgeCount: 8
  },
  {
    id: 'user2',
    name: 'Michael Smith',
    avatar: 'https://i.pravatar.cc/150?img=2',
    points: 985,
    rank: 2,
    badgeCount: 6
  },
  {
    id: 'user3',
    name: 'Sarah Williams',
    avatar: 'https://i.pravatar.cc/150?img=3',
    points: 870,
    rank: 3,
    badgeCount: 5
  },
  {
    id: 'user4',
    name: 'David Brown',
    avatar: 'https://i.pravatar.cc/150?img=4',
    points: 720,
    rank: 4,
    badgeCount: 4
  },
  {
    id: 'user5',
    name: 'Lisa Davis',
    avatar: 'https://i.pravatar.cc/150?img=5',
    points: 675,
    rank: 5,
    badgeCount: 3
  }
];

// Forum categories
const forumCategories: ForumCategoryProps[] = [
  {
    id: 'forum1',
    name: 'Computer Science',
    description: 'Discussions about programming, algorithms, and CS theory',
    threadCount: 245,
    participantCount: 456,
    latestActivity: '2 hours ago',
    icon: React.createElement(MessageSquare, { className: 'h-5 w-5 text-primary' }),
    tags: ['Programming', 'Algorithms', 'Data Structures'],
    onClick: () => console.log('Forum clicked')
  },
  {
    id: 'forum2',
    name: 'Mathematics',
    description: 'Discuss calculus, algebra, statistics and all math topics',
    threadCount: 187,
    participantCount: 321,
    latestActivity: '4 hours ago',
    icon: React.createElement(FileText, { className: 'h-5 w-5 text-primary' }),
    tags: ['Calculus', 'Algebra', 'Statistics'],
    onClick: () => console.log('Forum clicked')
  },
  {
    id: 'forum3',
    name: 'Study Groups',
    description: 'Find or create study groups for upcoming exams',
    threadCount: 113,
    participantCount: 287,
    latestActivity: '1 day ago',
    icon: React.createElement(Book, { className: 'h-5 w-5 text-primary' }),
    tags: ['Exams', 'Collaboration', 'Study Tips'],
    onClick: () => console.log('Forum clicked')
  },
  {
    id: 'forum4',
    name: 'Academic Help',
    description: 'Get help with assignments, questions, and academic challenges',
    threadCount: 156,
    participantCount: 342,
    latestActivity: '3 hours ago',
    icon: React.createElement(BookOpen, { className: 'h-5 w-5 text-primary' }),
    tags: ['Homework', 'Assignments', 'Questions'],
    onClick: () => console.log('Forum clicked')
  }
];

// Forum posts
const forumPosts: ForumPostProps[] = [
  {
    id: 'post1',
    author: {
      id: 'user1',
      name: 'Emily Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'Moderator',
      points: 1240
    },
    content: "I've been working on a complex algorithm for binary tree traversal and I'm struggling with the recursive implementation. Has anyone tackled this problem before? Looking for some guidance on efficiency improvements.",
    createdAt: '2 hours ago',
    upvotes: 12,
    downvotes: 1,
    replies: 5,
    isUserPost: false,
    onReply: () => console.log('Reply clicked'),
    onReport: () => console.log('Report clicked')
  }
];

// Resource versions
const resourceVersions: Version[] = [
  {
    id: 'version1',
    versionNumber: '2.0',
    uploadedBy: {
      id: 'user1',
      name: 'Emily Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    dateUploaded: 'Today, 2:45 PM',
    changeDescription: 'Updated with corrections to chapter 3 and added new examples',
    fileSize: '4.2 MB',
    downloads: 45,
    isCurrent: true
  },
  {
    id: 'version2',
    versionNumber: '1.5',
    uploadedBy: {
      id: 'user1',
      name: 'Emily Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    dateUploaded: 'June 12, 2023',
    changeDescription: 'Fixed formatting issues and typos',
    fileSize: '4.1 MB',
    downloads: 87,
    isCurrent: false
  },
  {
    id: 'version3',
    versionNumber: '1.0',
    uploadedBy: {
      id: 'user1',
      name: 'Emily Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    dateUploaded: 'May 29, 2023',
    changeDescription: 'Initial version',
    fileSize: '4.0 MB',
    downloads: 124,
    isCurrent: false
  }
];

// Resource reviews
const resourceReviews: Review[] = [
  {
    id: 'review1',
    rating: 5,
    content: "This is an excellent resource that clearly explains complex topics. The examples are relevant and helpful for understanding the material. I'll definitely be using this for my coursework.",
    authorId: 'user2',
    authorName: 'Michael Smith',
    authorAvatar: 'https://i.pravatar.cc/150?img=2',
    datePosted: '3 days ago',
    helpfulCount: 15,
    isHelpful: true
  },
  {
    id: 'review2',
    rating: 4,
    content: "Very good resource with detailed explanations. Could use a few more examples, but overall it's quite comprehensive and well-organized.",
    authorId: 'user3',
    authorName: 'Sarah Williams',
    authorAvatar: 'https://i.pravatar.cc/150?img=3',
    datePosted: '1 week ago',
    helpfulCount: 8,
    isHelpful: false
  },
  {
    id: 'review3',
    rating: 3,
    content: "Decent content but the organization could be improved. Some sections feel rushed and need more explanation.",
    authorId: 'user4',
    authorName: 'David Brown',
    authorAvatar: 'https://i.pravatar.cc/150?img=4',
    datePosted: '2 weeks ago',
    helpfulCount: 3,
    isHelpful: false
  }
];

// User profile data
const userProfileData: UserProfileData = {
  id: 'user1',
  name: 'Emily Johnson',
  avatar: 'https://i.pravatar.cc/150?img=1',
  coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1887&auto=format&fit=crop',
  bio: 'Computer Science student at Stanford University with a passion for algorithms and machine learning. I love sharing educational resources and helping fellow students.',
  email: 'emily.johnson@example.com',
  points: 1240,
  level: 8,
  nextLevelPoints: 1500,
  institution: 'Stanford University',
  department: 'Computer Science',
  joined: 'January 2022',
  uploadsCount: 24,
  downloadsCount: 156,
  likesCount: 87,
  badgesEarned: userBadges,
  isVerified: true
};

// Recommended resources
const recommendedResources: RecommendedResource[] = [
  {
    id: 'resource1',
    title: 'Advanced Algorithms: Complete Guide',
    description: 'Comprehensive guide to advanced algorithms with practical examples and implementations',
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tcHV0ZXIlMjBjb2RlfGVufDB8fDB8fHww',
    author: 'Prof. Michael Smith',
    category: 'Computer Science',
    type: 'pdf',
    rating: 4.8,
    downloads: 1245,
    date: '2 weeks ago',
    tags: ['Algorithms', 'Programming', 'Data Structures'],
    recommendationReason: 'Based on your interest in computer science and algorithms'
  },
  {
    id: 'resource2',
    title: 'Machine Learning Fundamentals',
    description: 'An introduction to machine learning concepts, techniques, and practical applications',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGNvbXB1dGVyJTIwY29kZXxlbnwwfHwwfHx8MA%3D%3D',
    author: 'Dr. Sarah Williams',
    category: 'Data Science',
    type: 'pdf',
    rating: 4.6,
    downloads: 978,
    date: '1 month ago',
    tags: ['Machine Learning', 'AI', 'Python'],
    recommendationReason: 'Popular among students in your department'
  },
  {
    id: 'resource3',
    title: 'Calculus for Computer Scientists',
    description: 'Calculus concepts and applications specifically tailored for computer science students',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWF0aHxlbnwwfHwwfHx8MA%3D%3D',
    author: 'Prof. David Brown',
    category: 'Mathematics',
    type: 'pdf',
    rating: 4.5,
    downloads: 756,
    date: '3 weeks ago',
    tags: ['Calculus', 'Mathematics', 'Computer Science'],
    recommendationReason: 'Aligns with your recent downloads in mathematics'
  }
];

// Collaboration document data
const collaborationDocument = {
  id: 'doc1',
  title: 'Group Project: Machine Learning Analysis',
  content: `# Machine Learning Analysis Project

## Introduction
This document outlines our group project on analyzing different machine learning algorithms for image classification tasks.

## Team Members
- Emily Johnson (Team Lead)
- Michael Smith (Data Analysis)
- Sarah Williams (Algorithm Implementation)
- David Brown (Testing & Validation)

## Project Scope
We will be comparing the performance of three different machine learning algorithms:
1. Convolutional Neural Networks (CNN)
2. Support Vector Machines (SVM)
3. Random Forest

## Timeline
- Week 1: Data collection and preprocessing
- Week 2: Algorithm implementation
- Week 3: Training and testing
- Week 4: Analysis and report writing`,

  collaborators: [
    {
      id: 'user1',
      name: 'Emily Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      color: '#4F46E5',
      cursorPosition: { x: 120, y: 350 },
      isActive: true
    },
    {
      id: 'user2',
      name: 'Michael Smith',
      avatar: 'https://i.pravatar.cc/150?img=2',
      color: '#10B981',
      cursorPosition: { x: 200, y: 450 },
      isActive: true
    },
    {
      id: 'user3',
      name: 'Sarah Williams',
      avatar: 'https://i.pravatar.cc/150?img=3',
      color: '#F59E0B',
      isActive: false,
      lastActive: '20 minutes ago'
    },
    {
      id: 'user4',
      name: 'David Brown',
      avatar: 'https://i.pravatar.cc/150?img=4',
      color: '#EC4899',
      isActive: false,
      lastActive: '1 hour ago'
    }
  ] as Collaborator[],

  chatMessages: [
    {
      id: 'msg1',
      userId: 'user2',
      userName: 'Michael Smith',
      userAvatar: 'https://i.pravatar.cc/150?img=2',
      content: "I've added the data analysis section. Could someone review it?",
      timestamp: '10 minutes ago'
    },
    {
      id: 'msg2',
      userId: 'user1',
      userName: 'Emily Johnson',
      userAvatar: 'https://i.pravatar.cc/150?img=1',
      content: "I'll take a look at it now. Also, I think we should add more details to the timeline section.",
      timestamp: '5 minutes ago'
    },
    {
      id: 'msg3',
      userId: 'user2',
      userName: 'Michael Smith',
      userAvatar: 'https://i.pravatar.cc/150?img=2',
      content: "Thanks! Good point about the timeline. Let's make it more specific with actual dates.",
      timestamp: '3 minutes ago'
    }
  ] as ChatMessage[],

  history: [
    {
      id: 'hist1',
      userId: 'user1',
      userName: 'Emily Johnson',
      action: 'created',
      timestamp: '2 days ago'
    },
    {
      id: 'hist2',
      userId: 'user3',
      userName: 'Sarah Williams',
      action: 'edited',
      timestamp: 'Yesterday, 4:30 PM'
    },
    {
      id: 'hist3',
      userId: 'user2',
      userName: 'Michael Smith',
      action: 'edited',
      timestamp: 'Today, 10:15 AM'
    },
    {
      id: 'hist4',
      userId: 'user4',
      userName: 'David Brown',
      action: 'commented',
      timestamp: 'Today, 11:45 AM'
    },
    {
      id: 'hist5',
      userId: 'user1',
      userName: 'Emily Johnson',
      action: 'shared',
      timestamp: 'Today, 1:20 PM'
    }
  ] as DocumentHistory[],

  currentUserId: 'user1'
};

export const mockData = {
  userPoints,
  userBadges,
  leaderboardUsers,
  forumCategories,
  forumPosts,
  resourceVersions,
  resourceReviews,
  userProfileData,
  recommendedResources,
  collaborationDocument
}; 