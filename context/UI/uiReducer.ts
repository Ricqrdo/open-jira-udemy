import { UIState } from '.';

type UIActionType =
  | { type: 'UI - Open sidebar' }
  | { type: 'UI - Close sidebar' }
  | { type: 'UI - Set is adding entry'; payload: boolean }
  | { type: 'UI - Start dragging' }
  | { type: 'UI - End dragging' };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case 'UI - Open sidebar':
      return { ...state, sidebarOpen: true };
    case 'UI - Close sidebar':
      return { ...state, sidebarOpen: false };
    case 'UI - Set is adding entry':
      return { ...state, isAddingEntry: action.payload };
    case 'UI - Start dragging':
      return { ...state, isDragging: true };
    case 'UI - End dragging':
      return { ...state, isDragging: false };

    default:
      return state;
  }
};
