import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

// Gamification Components
import UserPoints from '@/components/gamification/UserPoints';
import BadgeDisplay from '@/components/gamification/BadgeDisplay';
import Leaderboard from '@/components/gamification/Leaderboard';

// Forums Components
import ForumCategory from '@/components/forums/ForumCategory';
import ForumPost from '@/components/forums/ForumPost';

// Resource Management Components
import RatingSystem from '@/components/resources/RatingSystem';
import VersionControl from '@/components/resources/VersionControl';
import ResourceReviews from '@/components/resources/ResourceReviews';
import ResourcePreview from '@/components/resources/ResourcePreview';

// Personalization Components
import UserProfile from '@/components/profile/UserProfile';
import ResourceRecommendations from '@/components/recommendations/ResourceRecommendations';

// Accessibility Components
import AccessibilityControls from '@/components/accessibility/AccessibilityControls';

// Collaboration Components
import CollaborationEditor from '@/components/collaboration/CollaborationEditor';

// Security Components
import EncryptionStatus from '@/components/security/EncryptionStatus';
import AccessControl from '@/components/security/AccessControl';

// Mobile App Components
import MobileAppPreview from '@/components/mobile/MobileAppPreview';

// Feedback Components
import FeedbackForm from '@/components/feedback/FeedbackForm';
import HelpCenter from '@/components/feedback/HelpCenter';

// Search Components
import AdvancedSearch from '@/components/search/AdvancedSearch';

// Offline Components
import OfflineAccess from '@/components/offline/OfflineAccess';

// Notification Components
import NotificationCenter from '@/components/notifications/NotificationCenter';

// Monetization Components
import PricingPlans from '@/components/monetization/PricingPlans';
import SponsoredContent from '@/components/monetization/SponsoredContent';

// Import mock data - with extension
import { mockData } from '@/lib/mock-data.ts';

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container px-4 md:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-center">
            EduVault Features
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            Explore the powerful features that make EduVault the perfect platform for sharing and collaborating on educational resources.
          </p>
        </motion.div>
        
        <Tabs defaultValue="gamification" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 mb-8">
            <TabsTrigger value="gamification">Gamification</TabsTrigger>
            <TabsTrigger value="forums">Forums</TabsTrigger>
            <TabsTrigger value="resources">Resource Management</TabsTrigger>
            <TabsTrigger value="personalization">Personalization</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="monetization">Monetization</TabsTrigger>
          </TabsList>
          
          {/* Gamification Features */}
          <TabsContent value="gamification">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h2 className="text-2xl font-bold mb-4">User Engagement Through Gamification</h2>
                  <p className="text-muted-foreground mb-4">
                    Our gamification features encourage participation by rewarding users for contributing to the platform.
                  </p>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Points and Levels</h3>
                    <UserPoints 
                      points={mockData.userPoints.points} 
                      level={mockData.userPoints.level} 
                      nextLevelPoints={mockData.userPoints.nextLevelPoints} 
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Achievement Badges</h3>
                    <BadgeDisplay badges={mockData.userBadges} />
                  </div>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Leaderboard 
                  users={mockData.leaderboardUsers}
                  title="Top Contributors"
                />
              </motion.div>
            </div>
          </TabsContent>
          
          {/* Forums Features */}
          <TabsContent value="forums">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="md:col-span-2"
              >
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold mb-4">Community Forums</h2>
                  <p className="text-muted-foreground mb-4">
                    Our forums foster discussions and collaboration among students on academic topics.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockData.forumCategories.map((category, index) => (
                      <ForumCategory
                        key={category.id}
                        id={category.id}
                        name={category.name}
                        description={category.description}
                        threadCount={category.threadCount}
                        participantCount={category.participantCount}
                        latestActivity={category.latestActivity}
                        icon={category.icon}
                        tags={category.tags}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ForumPost
                  id={mockData.forumPosts[0].id}
                  author={mockData.forumPosts[0].author}
                  content={mockData.forumPosts[0].content}
                  createdAt={mockData.forumPosts[0].createdAt}
                  upvotes={mockData.forumPosts[0].upvotes}
                  downvotes={mockData.forumPosts[0].downvotes}
                  replies={mockData.forumPosts[0].replies}
                  isUserPost={mockData.forumPosts[0].isUserPost}
                />
              </motion.div>
            </div>
          </TabsContent>
          
          {/* Resource Management Features */}
          <TabsContent value="resources">
            <div className="grid grid-cols-1 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-4">Resource Management</h2>
                <p className="text-muted-foreground mb-4">
                  Powerful tools for managing, rating, and versioning educational resources.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <VersionControl 
                    versions={mockData.resourceVersions}
                    onVersionDownload={(id) => console.log('Download version:', id)}
                    onRestoreVersion={(id) => console.log('Restore version:', id)}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Rate Resources</h3>
                    <div className="p-4 border rounded-lg">
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Interactive Rating</h4>
                        <RatingSystem 
                          initialRating={3.5} 
                          showValue 
                          size="lg"
                          onRatingChange={(rating) => console.log('New rating:', rating)}
                        />
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Read-only Rating</h4>
                        <RatingSystem 
                          initialRating={4.5} 
                          readonly 
                          showValue 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => console.log('View full reviews')}
                  >
                    View Full Review System
                  </Button>
                </motion.div>
              </div>
            </div>
          </TabsContent>
          
          {/* Personalization Features */}
          <TabsContent value="personalization">
            <div className="grid grid-cols-1 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-4">Personalization</h2>
                <p className="text-muted-foreground mb-4">
                  Personalized experience based on user preferences and academic needs.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="md:col-span-2"
                >
                  <UserProfile
                    userData={mockData.userProfileData}
                    isOwnProfile={true}
                    onEditProfile={() => console.log('Edit profile')}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="md:col-span-3"
                >
                  <ResourceRecommendations
                    recommendations={mockData.recommendedResources}
                    onRemoveRecommendation={(id) => console.log('Remove recommendation:', id)}
                    onLikeRecommendation={(id) => console.log('Like recommendation:', id)}
                    onDislikeRecommendation={(id) => console.log('Dislike recommendation:', id)}
                    onViewAll={() => console.log('View all recommendations')}
                  />
                </motion.div>
              </div>
            </div>
          </TabsContent>
          
          {/* Accessibility Features */}
          <TabsContent value="accessibility">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-4">Accessibility Features</h2>
                <p className="text-muted-foreground mb-6">
                  Making EduVault accessible to all users regardless of abilities or preferences.
                </p>
                
                <AccessibilityControls
                  onFontSizeChange={(size) => console.log('Font size changed:', size)}
                  onContrastChange={(high) => console.log('High contrast:', high)}
                  onDarkModeChange={(dark) => console.log('Dark mode:', dark)}
                  onTextToSpeechChange={(enabled) => console.log('Text to speech:', enabled)}
                  onLanguageChange={(lang) => console.log('Language changed:', lang)}
                  onReset={() => console.log('Settings reset')}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-6 border rounded-lg bg-muted/20"
              >
                <h3 className="text-lg font-bold mb-4">Multi-language Support</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Interface Translation</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {['English', 'Español', 'Français', 'Deutsch', '中文', '日本語', '한국어', 'العربية'].map((language) => (
                        <Button key={language} variant="outline" className="w-full text-sm">
                          {language}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Screen Reader Compatibility</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      All elements are properly labeled for screen readers and follow ARIA best practices.
                    </p>
                    <Button variant="outline" className="w-full">
                      Test Screen Reader
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Keyboard Navigation</h4>
                    <p className="text-sm text-muted-foreground">
                      Navigate the entire platform using only keyboard shortcuts.
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="text-xs p-2 bg-muted rounded">
                        <span className="font-mono font-bold">Tab</span> - Navigate forwards
                      </div>
                      <div className="text-xs p-2 bg-muted rounded">
                        <span className="font-mono font-bold">Shift+Tab</span> - Navigate backwards
                      </div>
                      <div className="text-xs p-2 bg-muted rounded">
                        <span className="font-mono font-bold">Enter/Space</span> - Activate element
                      </div>
                      <div className="text-xs p-2 bg-muted rounded">
                        <span className="font-mono font-bold">Esc</span> - Close dialogs
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </TabsContent>
          
          {/* Collaboration Features */}
          <TabsContent value="collaboration">
            <div className="grid grid-cols-1 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-4">Collaboration Tools</h2>
                <p className="text-muted-foreground mb-6">
                  Real-time collaboration features for group projects and team work.
                </p>
                
                <CollaborationEditor 
                  documentId={mockData.collaborationDocument.id}
                  documentTitle={mockData.collaborationDocument.title}
                  documentContent={mockData.collaborationDocument.content}
                  collaborators={mockData.collaborationDocument.collaborators}
                  chatMessages={mockData.collaborationDocument.chatMessages}
                  history={mockData.collaborationDocument.history}
                  currentUserId={mockData.collaborationDocument.currentUserId}
                  onContentChange={(content) => console.log('Content changed')}
                  onTitleChange={(title) => console.log('Title changed')}
                  onSendMessage={(message) => console.log('Message sent:', message)}
                  onInviteUser={(email) => console.log('Invite sent to:', email)}
                />
              </motion.div>
            </div>
          </TabsContent>
          
          {/* Security & Privacy Features (new) */}
          <TabsContent value="security">
            <div className="grid grid-cols-1 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-4">Security & Privacy</h2>
                <p className="text-muted-foreground mb-4">
                  Protect your data and control who can access your resources with our security features.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <EncryptionStatus
                    enabled={mockData.securityFeatures.encryptionStatus.enabled}
                    algorithm={mockData.securityFeatures.encryptionStatus.algorithm}
                    lastUpdated={mockData.securityFeatures.encryptionStatus.lastUpdated}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <AccessControl
                    resourceId={mockData.securityFeatures.accessControls[0].resourceId}
                    title={mockData.securityFeatures.accessControls[0].title}
                    visibility="Private"
                    sharedWith={mockData.securityFeatures.accessControls[0].sharedWith}
                    onChangeVisibility={(id, visibility) => console.log('Change visibility:', id, visibility)}
                    onManageSharing={(id) => console.log('Manage sharing:', id)}
                  />
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-muted/30 p-6 rounded-lg"
              >
                <h3 className="text-lg font-medium mb-4">Security Best Practices</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: 'Strong Passwords', description: 'Use complex passwords with a mix of characters, numbers, and symbols.' },
                    { title: 'Two-Factor Authentication', description: 'Add an extra layer of security by enabling 2FA on your account.' },
                    { title: 'Regular Security Audits', description: 'We conduct regular security audits to ensure your data is protected.' },
                    { title: 'GDPR Compliance', description: 'We respect your privacy rights and comply with global data protection laws.' },
                    { title: 'Secure File Sharing', description: 'Control who can access your shared resources with granular permissions.' },
                    { title: 'Data Backups', description: 'Your data is regularly backed up to prevent loss in case of system failures.' }
                  ].map((practice, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-background">
                      <h4 className="font-medium mb-1">{practice.title}</h4>
                      <p className="text-sm text-muted-foreground">{practice.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </TabsContent>
          
          {/* Mobile App Features (new) */}
          <TabsContent value="mobile">
            <div className="grid grid-cols-1 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-4">Mobile Experience</h2>
                <p className="text-muted-foreground mb-4">
                  Access EduVault on the go with our mobile apps for iOS and Android.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <MobileAppPreview
                  appVersion={mockData.mobileFeatures.appVersion}
                  platforms={mockData.mobileFeatures.platforms}
                  features={mockData.mobileFeatures.features}
                  downloadLinks={mockData.mobileFeatures.downloadLinks}
                  screenshots={mockData.mobileFeatures.screenshots}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <OfflineAccess
                  downloadedResources={mockData.offlineFeatures.downloadedResources}
                  storageUsed={mockData.offlineFeatures.storageUsed}
                  storageLimit={mockData.offlineFeatures.storageLimit}
                  autoSyncEnabled={mockData.offlineFeatures.autoSyncEnabled}
                  onToggleAutoSync={(enabled) => console.log('Toggle auto sync:', enabled)}
                  onDeleteResource={(id) => console.log('Delete resource:', id)}
                />
              </motion.div>
            </div>
          </TabsContent>
          
          {/* Feedback & Support Features (new) */}
          <TabsContent value="feedback">
            <div className="grid grid-cols-1 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-4">Feedback & Support</h2>
                <p className="text-muted-foreground mb-4">
                  Get help and share your suggestions to improve the platform.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <FeedbackForm
                    categories={mockData.feedbackData.categories}
                    onSubmit={(feedback) => console.log('Feedback submitted:', feedback)}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <NotificationCenter
                    unreadCount={mockData.notificationFeatures.unreadCount}
                    notifications={mockData.notificationFeatures.notifications}
                    preferences={mockData.notificationFeatures.preferences}
                    nextDigest={mockData.notificationFeatures.nextDigest}
                    onMarkAsRead={(id) => console.log('Mark as read:', id)}
                    onMarkAllAsRead={() => console.log('Mark all as read')}
                    onDeleteNotification={(id) => console.log('Delete notification:', id)}
                    onClearAll={() => console.log('Clear all notifications')}
                    onUpdatePreferences={(prefs) => console.log('Update preferences:', prefs)}
                  />
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <HelpCenter
                  popularArticles={mockData.feedbackData.helpCenter.popularArticles}
                  categories={mockData.feedbackData.helpCenter.categories}
                  onSearchHelp={(query) => console.log('Search help:', query)}
                  onViewArticle={(id) => console.log('View article:', id)}
                  onContactSupport={() => console.log('Contact support')}
                />
              </motion.div>
            </div>
          </TabsContent>
          
          {/* Monetization Features (new) */}
          <TabsContent value="monetization">
            <div className="grid grid-cols-1 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-4">Premium Features</h2>
                <p className="text-muted-foreground mb-4">
                  Unlock advanced features and support the platform with our premium plans.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <PricingPlans
                  plans={mockData.monetizationFeatures.plans}
                  currentPlan={mockData.monetizationFeatures.currentPlan}
                  onSelectPlan={(planId) => console.log('Select plan:', planId)}
                  onContactSales={() => console.log('Contact sales')}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">Featured Partners</h3>
                  <p className="text-muted-foreground">
                    Discover educational resources from our trusted partners
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <SponsoredContent
                    id={mockData.monetizationFeatures.sponsoredContent.id}
                    title={mockData.monetizationFeatures.sponsoredContent.title}
                    description={mockData.monetizationFeatures.sponsoredContent.description}
                    imageUrl={mockData.monetizationFeatures.sponsoredContent.imageUrl}
                    url={mockData.monetizationFeatures.sponsoredContent.url}
                    sponsor={mockData.monetizationFeatures.sponsoredContent.sponsor}
                    relevanceCategory={mockData.monetizationFeatures.sponsoredContent.relevanceCategory}
                    onDismiss={(id) => console.log('Dismiss sponsored content:', id)}
                    onLike={(id) => console.log('Like sponsored content:', id)}
                    onDislike={(id) => console.log('Dislike sponsored content:', id)}
                  />
                  
                  {/* Additional sponsored content placeholders */}
                  <div className="border rounded-lg p-4 flex flex-col items-center justify-center text-center bg-muted/20 h-[350px]">
                    <h4 className="text-lg font-medium mb-2">Partner Spot Available</h4>
                    <p className="text-muted-foreground text-sm mb-4">
                      Showcase your educational products here
                    </p>
                    <Button variant="outline">Learn More</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 flex flex-col items-center justify-center text-center bg-muted/20 h-[350px]">
                    <h4 className="text-lg font-medium mb-2">Partner Spot Available</h4>
                    <p className="text-muted-foreground text-sm mb-4">
                      Showcase your educational products here
                    </p>
                    <Button variant="outline">Learn More</Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Features; 