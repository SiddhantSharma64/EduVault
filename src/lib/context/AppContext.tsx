import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
  isLoggedIn: boolean;
}

interface AppContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  handlePlanSelection: (planId: string) => void;
  handleContactSales: () => void;
  handleFeedbackSubmit: (feedback: any) => void;
  handleNotificationSettings: (settings: any) => void;
  handleSearchSubmit: (query: string, filters: string[]) => void;
  handleDownload: (resourceId: string) => void;
  toggleAutoSync: (enabled: boolean) => void;
  handleResourceDelete: (id: string) => void;
  handleAddAnnotation: (type: string, position: { x: number, y: number }) => void;
  handlePageChange: (page: number) => void;
  handleSponsoredAction: (id: string, action: 'like' | 'dislike' | 'dismiss') => void;
  handleChangeVisibility: (resourceId: string, visibility: string) => void;
  handleManageSharing: (resourceId: string) => void;
  handleMarkAsRead: (id: string) => void;
  handleMarkAllAsRead: () => void;
  handleDeleteNotification: (id: string) => void;
  handleClearAllNotifications: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const userJson = localStorage.getItem('user');
    if (userJson) {
      setUser(JSON.parse(userJson));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newUser = { email, name: 'User', isLoggedIn: true };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newUser = { email, name, isLoggedIn: true };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  };

  // Plan selection handler
  const handlePlanSelection = (planId: string) => {
    console.log(`Selected plan: ${planId}`);
    // Simulate plan selection
    if (!user) {
      alert('Please login to subscribe to a plan');
      return;
    }
    
    alert(`Successfully subscribed to plan: ${planId}`);
  };

  // Contact sales handler
  const handleContactSales = () => {
    console.log('Contact sales');
    alert('A sales representative will contact you shortly!');
  };

  // Feedback submission handler
  const handleFeedbackSubmit = (feedback: any) => {
    console.log('Feedback submitted:', feedback);
    // In a real app, you would submit to an API
  };

  // Notification settings handler
  const handleNotificationSettings = (settings: any) => {
    console.log('Notification settings updated:', settings);
  };

  // Search handler
  const handleSearchSubmit = (query: string, filters: string[]) => {
    console.log('Search submitted:', query, filters);
  };

  // Download handler
  const handleDownload = (resourceId: string) => {
    console.log(`Download resource: ${resourceId}`);
    if (!user) {
      alert('Please login to download resources');
      return;
    }
    
    alert(`Resource ${resourceId} is being downloaded`);
  };

  // Auto sync toggle handler
  const toggleAutoSync = (enabled: boolean) => {
    console.log(`Auto sync ${enabled ? 'enabled' : 'disabled'}`);
  };

  // Resource delete handler
  const handleResourceDelete = (id: string) => {
    console.log(`Delete resource: ${id}`);
  };

  // Annotation handler
  const handleAddAnnotation = (type: string, position: { x: number, y: number }) => {
    console.log(`Add ${type} annotation at`, position);
  };

  // Page change handler
  const handlePageChange = (page: number) => {
    console.log(`Go to page: ${page}`);
  };

  // Sponsored content action handler
  const handleSponsoredAction = (id: string, action: 'like' | 'dislike' | 'dismiss') => {
    console.log(`${action} sponsored content: ${id}`);
  };

  // Resource visibility handler
  const handleChangeVisibility = (resourceId: string, visibility: string) => {
    console.log(`Change visibility of ${resourceId} to ${visibility}`);
  };

  // Sharing management handler
  const handleManageSharing = (resourceId: string) => {
    console.log(`Manage sharing for ${resourceId}`);
  };

  // Notification mark as read handler
  const handleMarkAsRead = (id: string) => {
    console.log(`Mark notification ${id} as read`);
  };

  // Mark all notifications as read handler
  const handleMarkAllAsRead = () => {
    console.log('Mark all notifications as read');
  };

  // Delete notification handler
  const handleDeleteNotification = (id: string) => {
    console.log(`Delete notification ${id}`);
  };

  // Clear all notifications handler
  const handleClearAllNotifications = () => {
    console.log('Clear all notifications');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        register,
        handlePlanSelection,
        handleContactSales,
        handleFeedbackSubmit,
        handleNotificationSettings,
        handleSearchSubmit,
        handleDownload,
        toggleAutoSync,
        handleResourceDelete,
        handleAddAnnotation,
        handlePageChange,
        handleSponsoredAction,
        handleChangeVisibility,
        handleManageSharing,
        handleMarkAsRead,
        handleMarkAllAsRead,
        handleDeleteNotification,
        handleClearAllNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 