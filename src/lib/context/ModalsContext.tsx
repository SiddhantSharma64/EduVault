import React, { createContext, useState, useContext, useMemo } from 'react';

type ModalType = 'upload' | 'login' | 'signup' | 'preview';

interface ModalsContextType {
  openModal: (modalType: ModalType) => void;
  closeModal: (modalType: ModalType) => void;
  isModalOpen: (modalType: ModalType) => boolean;
}

const ModalsContext = createContext<ModalsContextType | undefined>(undefined);

export const ModalsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openModals, setOpenModals] = useState<Record<ModalType, boolean>>({
    upload: false,
    login: false,
    signup: false,
    preview: false,
  });

  // Open a specific modal
  const openModal = (modalType: ModalType) => {
    setOpenModals((prev) => ({
      ...prev,
      [modalType]: true,
    }));
  };

  // Close a specific modal
  const closeModal = (modalType: ModalType) => {
    setOpenModals((prev) => ({
      ...prev,
      [modalType]: false,
    }));
  };

  // Check if a specific modal is open
  const isModalOpen = (modalType: ModalType) => {
    return openModals[modalType];
  };

  const contextValue = useMemo(
    () => ({
      openModal,
      closeModal,
      isModalOpen,
    }),
    [openModals]
  );

  return (
    <ModalsContext.Provider value={contextValue}>
      {children}
    </ModalsContext.Provider>
  );
};

export const useModals = (): ModalsContextType => {
  const context = useContext(ModalsContext);
  if (context === undefined) {
    throw new Error('useModals must be used within a ModalsProvider');
  }
  return context;
};

export default ModalsContext; 