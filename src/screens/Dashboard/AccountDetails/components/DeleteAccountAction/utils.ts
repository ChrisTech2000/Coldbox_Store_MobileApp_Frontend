import { useReducer } from 'react';

import type { WithRequired } from '#types/miscellaneous';

const POP_UP_EVT = {
  SHOW: 'SHOW',
  HIDE: 'HIDE',
} as const;

type State = {
  isVisible: boolean;
  message: string;
  showActions: boolean;
};

type Action =
  | {
      type: typeof POP_UP_EVT.HIDE;
    }
  | {
      type: typeof POP_UP_EVT.SHOW;
      payload: WithRequired<Partial<Omit<State, 'isVisible'>>, 'message'>;
    };

function popupReducer(state: State, action: Action): State {
  switch (action.type) {
    case POP_UP_EVT.HIDE:
      return {
        ...state,
        isVisible: false,
      };
    case POP_UP_EVT.SHOW:
      return {
        isVisible: true,
        showActions: action.payload.showActions ?? false,
        message: action.payload.message,
      };
    default:
      return state;
  }
}

const DEFAULT_POPUP_STATE = {
  isVisible: false,
  showActions: false,
  message: '',
} satisfies State;

export function usePopup(): [
  State,
  { displayPopup: (message: string, showActions?: boolean) => void; resetPopup: () => void },
] {
  const [state, dispatch] = useReducer(popupReducer, DEFAULT_POPUP_STATE);

  function displayPopup(message: string, showActions = false) {
    dispatch({ type: 'SHOW', payload: { message, showActions } });
  }

  function resetPopup() {
    dispatch({ type: 'HIDE' });
  }

  return [state, { displayPopup, resetPopup }];
}
