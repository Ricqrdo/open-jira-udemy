import { useReducer } from 'react';

import { UIContext, uiReducer } from './';

export interface UIState {
  sidebarOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidebarOpen: false,
  isAddingEntry: false,
  isDragging: false
};

export const UIProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSidebar = () => {
    dispatch({ type: 'UI - Open sidebar' });
  };

  const closeSidebar = () => {
    dispatch({ type: 'UI - Close sidebar' });
  };

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: 'UI - Set is adding entry', payload: isAdding });
  };

  const startDragging = () => {
    dispatch({ type: 'UI - Start dragging' });
  };

  const endDragging = () => {
    dispatch({ type: 'UI - End dragging' });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,

        openSidebar,
        closeSidebar,

        setIsAddingEntry,

        startDragging,
        endDragging
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
