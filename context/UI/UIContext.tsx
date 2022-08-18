import { createContext } from 'react';

export interface ContextProps {
  sidebarOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;

  openSidebar: () => void;
  closeSidebar: () => void;

  setIsAddingEntry: (isAdding: boolean) => void;

  startDragging: () => void;
  endDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);
