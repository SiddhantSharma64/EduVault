// Helper functions to work with the AppContext in components
import { useApp } from './context/AppContext';

// PricingPlans handlers
export const usePricingHandlers = () => {
  const { handlePlanSelection, handleContactSales } = useApp();
  
  return {
    onSelectPlan: handlePlanSelection,
    onContactSales: handleContactSales
  };
};

// SponsoredContent handlers
export const useSponsoredContentHandlers = () => {
  const { handleSponsoredAction } = useApp();
  
  return {
    onDismiss: (id: string) => handleSponsoredAction(id, 'dismiss'),
    onLike: (id: string) => handleSponsoredAction(id, 'like'),
    onDislike: (id: string) => handleSponsoredAction(id, 'dislike')
  };
};

// ResourcePreview handlers
export const useResourcePreviewHandlers = () => {
  const { handlePageChange, handleAddAnnotation, handleDownload } = useApp();
  
  return {
    onPageChange: handlePageChange,
    onAddAnnotation: handleAddAnnotation,
    onDownload: () => handleDownload('resource-1')
  };
};

// FeedbackForm handlers
export const useFeedbackHandlers = () => {
  const { handleFeedbackSubmit } = useApp();
  
  return {
    onSubmit: handleFeedbackSubmit
  };
};

// NotificationCenter handlers
export const useNotificationHandlers = () => {
  const { 
    handleMarkAsRead, 
    handleMarkAllAsRead, 
    handleDeleteNotification, 
    handleClearAllNotifications,
    handleNotificationSettings
  } = useApp();
  
  return {
    onMarkAsRead: handleMarkAsRead,
    onMarkAllAsRead: handleMarkAllAsRead,
    onDeleteNotification: handleDeleteNotification,
    onClearAll: handleClearAllNotifications,
    onUpdatePreferences: handleNotificationSettings
  };
};

// OfflineAccess handlers
export const useOfflineAccessHandlers = () => {
  const { toggleAutoSync, handleResourceDelete } = useApp();
  
  return {
    onToggleAutoSync: toggleAutoSync,
    onDeleteResource: handleResourceDelete
  };
};

// AccessControl handlers
export const useAccessControlHandlers = () => {
  const { handleChangeVisibility, handleManageSharing } = useApp();
  
  return {
    onChangeVisibility: handleChangeVisibility,
    onManageSharing: handleManageSharing
  };
};

// SearchHandlers
export const useSearchHandlers = () => {
  const { handleSearchSubmit } = useApp();
  
  return {
    onSearch: handleSearchSubmit,
    onVoiceSearch: () => console.log('Voice search activated')
  };
};

// HelpCenter handlers
export const useHelpCenterHandlers = () => {
  return {
    onSearchHelp: (query: string) => console.log(`Searching help for: ${query}`),
    onViewArticle: (id: string) => console.log(`Viewing article: ${id}`),
    onContactSupport: () => console.log('Contacting support')
  };
}; 