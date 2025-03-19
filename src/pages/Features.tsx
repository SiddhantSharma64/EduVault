import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

// Gamification components
import UserPoints from '@/components/gamification/UserPoints';
import UserBadges from '@/components/gamification/UserBadges';
import Leaderboard from '@/components/gamification/Leaderboard';

// Forums components
import ForumCategories from '@/components/forums/ForumCategories';
import ForumPost from '@/components/forums/ForumPost';

// Resource Management components
import ResourceVersions from '@/components/resources/ResourceVersions';
import ResourceReviews from '@/components/resources/ResourceReviews';
import ResourcePreview from '@/components/resources/ResourcePreview';

// Personalization components
import UserProfile from '@/components/personalization/UserProfile';
import RecommendedResources from '@/components/personalization/RecommendedResources';

// Accessibility components
import AccessibilitySettings from '@/components/accessibility/AccessibilitySettings';

// Collaboration components
import CollaborationEditor from '@/components/collaboration/CollaborationEditor';

// Security and Privacy components
import EncryptionStatus from '@/components/security/EncryptionStatus';
import AccessControl from '@/components/security/AccessControl';

// Mobile components
import MobileAppPreview from '@/components/mobile/MobileAppPreview';
import OfflineAccess from '@/components/offline/OfflineAccess';

// Feedback and Support components
import FeedbackForm from '@/components/feedback/FeedbackForm';
import HelpCenter from '@/components/feedback/HelpCenter';

// Search components
import AdvancedSearch from '@/components/search/AdvancedSearch';

// Notification components
import NotificationCenter from '@/components/notifications/NotificationCenter';

// Monetization components
import PricingPlans from '@/components/monetization/PricingPlans';
import SponsoredContent from '@/components/monetization/SponsoredContent';

// Mock data import
import { mockData } from '@/lib/mock-data';

// Import handlers
import {
  useAccessControlHandlers,
  useFeedbackHandlers,
  useHelpCenterHandlers,
  useNotificationHandlers,
  useOfflineAccessHandlers,
  usePricingHandlers,
  useResourcePreviewHandlers,
  useSearchHandlers,
  useSponsoredContentHandlers
} from '@/lib/mock-handler';

// Features component
const Features = () => {
  // Get handlers for components
  const pricingHandlers = usePricingHandlers();
  const sponsoredContentHandlers = useSponsoredContentHandlers();
  const resourcePreviewHandlers = useResourcePreviewHandlers();
  const feedbackHandlers = useFeedbackHandlers();
  const notificationHandlers = useNotificationHandlers();
  const offlineAccessHandlers = useOfflineAccessHandlers();
  const accessControlHandlers = useAccessControlHandlers();
  const searchHandlers = useSearchHandlers();
  const helpCenterHandlers = useHelpCenterHandlers();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            EduVault Features
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Discover all the powerful tools and features available on our platform
          </p>
        </motion.div>

        <Tabs defaultValue="gamification" className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid grid-cols-5 lg:grid-cols-10">
              <TabsTrigger value="gamification">Gamification</TabsTrigger>
              <TabsTrigger value="forums">Forums</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="personalization">Personal</TabsTrigger>
              <TabsTrigger value="accessibility">Access</TabsTrigger>
              <TabsTrigger value="collaboration">Collab</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="monetization">Pricing</TabsTrigger>
            </TabsList>
          </div>

          {/* Gamification Features */}
          <TabsContent value="gamification" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <UserPoints points={375} level={3} progress={65} />
              <UserBadges badges={mockData.userBadges} />
              <Leaderboard users={mockData.leaderboard || []} />
            </div>
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Earn points, unlock badges, and compete with others as you learn
              </p>
              <Button className="rounded-full">View All Achievements</Button>
            </div>
          </TabsContent>

          {/* Forums Features */}
          <TabsContent value="forums" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ForumCategories categories={mockData.forumCategories} />
              </div>
              <div>
                <ForumPost post={mockData.forumPost} />
              </div>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Join discussions, ask questions, and share your knowledge with the community
              </p>
              <Button className="rounded-full">Explore Forums</Button>
            </div>
          </TabsContent>

          {/* Resource Management Features */}
          <TabsContent value="resources" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7">
                <ResourcePreview 
                  id="resource-1"
                  title="Introduction to Machine Learning"
                  currentPage={2}
                  totalPages={15}
                  annotations={mockData.resourceAnnotations || []}
                  onPageChange={resourcePreviewHandlers.onPageChange}
                  onDownload={resourcePreviewHandlers.onDownload}
                  onAddAnnotation={resourcePreviewHandlers.onAddAnnotation}
                />
              </div>
              <div className="lg:col-span-5 space-y-6">
                <ResourceVersions versions={mockData.resourceVersions} />
                <ResourceReviews reviews={mockData.resourceReviews} />
              </div>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Manage, review, and track changes to educational resources
              </p>
              <Button className="rounded-full">Browse Resources</Button>
            </div>
          </TabsContent>

          {/* Personalization Features */}
          <TabsContent value="personalization" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <UserProfile profile={mockData.userProfile || {}} />
              </div>
              <div className="lg:col-span-2">
                <RecommendedResources resources={mockData.recommendedResources || []} />
              </div>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Get personalized recommendations and customize your learning experience
              </p>
              <Button className="rounded-full">Update Preferences</Button>
            </div>
          </TabsContent>

          {/* Accessibility Features */}
          <TabsContent value="accessibility" className="space-y-8">
            <div className="max-w-xl mx-auto">
              <AccessibilitySettings />
            </div>
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Customize your experience for better accessibility and ease of use
              </p>
              <Button className="rounded-full">Save Settings</Button>
            </div>
          </TabsContent>

          {/* Collaboration Features */}
          <TabsContent value="collaboration" className="space-y-8">
            <div>
              <CollaborationEditor
                document={mockData.collaborationDocument}
                currentUser={mockData.collaborationDocument.currentUser}
              />
            </div>
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Collaborate in real-time with other users on shared documents
              </p>
              <Button className="rounded-full">Start Collaboration</Button>
            </div>
          </TabsContent>

          {/* Security and Privacy Features */}
          <TabsContent value="security" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EncryptionStatus
                enabled={true}
                algorithm="AES-256"
                lastUpdated="Today at 14:30"
              />
              <AccessControl
                resourceId="resource-123"
                title="Introduction to Machine Learning"
                visibility="Restricted"
                sharedWith={[
                  { id: "user1", name: "Alex Chen", role: "Edit" },
                  { id: "user2", name: "Sarah Kim", role: "View" },
                ]}
                onChangeVisibility={accessControlHandlers.onChangeVisibility}
                onManageSharing={accessControlHandlers.onManageSharing}
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Security Best Practices</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {["Use strong passwords", "Enable two-factor authentication", "Keep your software updated", 
                "Be careful with public Wi-Fi", "Review permissions regularly", "Check for secure connections"].map((practice, index) => (
                  <div key={index} className="bg-muted/50 p-3 rounded-md text-sm">
                    {practice}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Keep your data secure with our comprehensive security features
              </p>
              <Button className="rounded-full">Security Settings</Button>
            </div>
          </TabsContent>

          {/* Mobile Features */}
          <TabsContent value="mobile" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MobileAppPreview
                appVersion="v2.4.1"
                platforms={["iOS", "Android"]}
                features={[
                  "Offline access to resources",
                  "Scan documents with camera",
                  "Push notifications",
                  "Search functionality",
                  "Dark mode support",
                  "Touch ID / Face ID login"
                ]}
                downloadLinks={{
                  ios: "https://apps.apple.com/app/eduvault",
                  android: "https://play.google.com/store/apps/details?id=com.eduvault"
                }}
                screenshots={[
                  "screenshot1.jpg",
                  "screenshot2.jpg"
                ]}
              />
              <OfflineAccess
                downloadedResources={mockData.downloadedResources || []}
                storageUsed="250 MB"
                storageLimit="1 GB"
                autoSyncEnabled={true}
                onToggleAutoSync={offlineAccessHandlers.onToggleAutoSync}
                onDeleteResource={offlineAccessHandlers.onDeleteResource}
              />
            </div>
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Access your resources on the go with our mobile apps
              </p>
              <Button className="rounded-full">Download App</Button>
            </div>
          </TabsContent>

          {/* Feedback and Support Features */}
          <TabsContent value="feedback" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5">
                <FeedbackForm 
                  categories={["Bug Report", "Feature Request", "General Feedback", "Content Issue", "Technical Problem"]}
                  onSubmit={feedbackHandlers.onSubmit}
                />
                <div className="mt-6">
                  <NotificationCenter
                    unreadCount={3}
                    notifications={mockData.notifications || []}
                    preferences={{
                      email: true,
                      push: true,
                      digestFrequency: "Daily"
                    }}
                    nextDigest="Monday, Sept 18"
                    onMarkAsRead={notificationHandlers.onMarkAsRead}
                    onMarkAllAsRead={notificationHandlers.onMarkAllAsRead}
                    onDeleteNotification={notificationHandlers.onDeleteNotification}
                    onClearAll={notificationHandlers.onClearAll}
                    onUpdatePreferences={notificationHandlers.onUpdatePreferences}
                  />
                </div>
              </div>
              <div className="md:col-span-7">
                <HelpCenter
                  popularArticles={[
                    { id: "article1", title: "Getting Started with EduVault", views: 3420 },
                    { id: "article2", title: "How to Upload and Share Resources", views: 2150 },
                    { id: "article3", title: "Managing Your Profile and Settings", views: 1875 },
                    { id: "article4", title: "Collaborating with Other Users", views: 1632 },
                    { id: "article5", title: "Understanding Points and Badges", views: 1245 }
                  ]}
                  categories={["Getting Started", "Account", "Resources", "Collaboration", "Mobile App", "Billing", "Privacy", "Troubleshooting"]}
                  onSearchHelp={helpCenterHandlers.onSearchHelp}
                  onViewArticle={helpCenterHandlers.onViewArticle}
                  onContactSupport={helpCenterHandlers.onContactSupport}
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Get help and provide feedback to improve your experience
              </p>
              <Button className="rounded-full">Contact Support</Button>
            </div>
          </TabsContent>

          {/* Search Features */}
          <TabsContent value="search" className="space-y-8">
            <div className="max-w-2xl mx-auto">
              <AdvancedSearch
                recentSearches={["machine learning", "python tutorial", "data visualization", "react components"]}
                popularFilters={["PDF", "Video", "Interactive", "Beginner", "Intermediate", "Advanced", "Free", "Premium"]}
                sampleVoiceSearch={{
                  transcript: "find beginner python tutorials",
                  confidence: 0.92,
                  results: 156
                }}
                onSearch={searchHandlers.onSearch}
                onVoiceSearch={searchHandlers.onVoiceSearch}
              />
            </div>
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Find exactly what you need with our powerful search tools
              </p>
              <Button className="rounded-full">Advanced Filters</Button>
            </div>
          </TabsContent>

          {/* Monetization Features */}
          <TabsContent value="monetization" className="space-y-8">
            <div>
              <PricingPlans
                plans={[
                  {
                    id: "free",
                    name: "Free",
                    price: "$0/month",
                    features: [
                      "Access to basic resources",
                      "Join community discussions",
                      "Create a user profile",
                      "Limited storage (100MB)",
                      "Standard support"
                    ],
                    recommended: false
                  },
                  {
                    id: "premium",
                    name: "Premium",
                    price: "$9.99/month",
                    features: [
                      "All Free features",
                      "Unlimited access to resources",
                      "Ad-free experience",
                      "Extended storage (5GB)",
                      "Priority support",
                      "Download for offline use",
                      "Exclusive content access"
                    ],
                    recommended: true
                  },
                  {
                    id: "enterprise",
                    name: "Enterprise",
                    price: "Contact Sales",
                    features: [
                      "All Premium features",
                      "Team management",
                      "Custom branding",
                      "Advanced security controls",
                      "Usage analytics",
                      "Dedicated support manager",
                      "Custom integrations",
                      "Bulk licensing"
                    ],
                    recommended: false
                  }
                ]}
                currentPlan="free"
                onSelectPlan={pricingHandlers.onSelectPlan}
                onContactSales={pricingHandlers.onContactSales}
              />
            </div>
            <div className="max-w-md mx-auto">
              <SponsoredContent
                id="sponsored-1"
                title="Advanced Machine Learning Course by Tech Academy"
                description="Master machine learning with our comprehensive course. Learn from industry experts and get certified."
                imageUrl="https://images.unsplash.com/photo-1593642532744-d377ab507dc8"
                url="https://example.com/sponsored/tech-academy"
                sponsor="Tech Academy"
                relevanceCategory="Machine Learning"
                onDismiss={sponsoredContentHandlers.onDismiss}
                onLike={sponsoredContentHandlers.onLike}
                onDislike={sponsoredContentHandlers.onDislike}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Features; 