import Paths from '../pages/Paths/PathsReducer';

/**
 * UI State. 'global' defines state items that are available across all pages
 * in the client, while 'Pages' contains state that is specific to a given
 * page.
 *
 * To add a new page simply add the page name within 'Pages' followed by its
 * state definition:
 *
 *  Pages: {
 *    NewPageName: {
 *      stateItem: ...
 *    }
 *  }
 *
 * @param {*} state -
 * @param {*} action -
 * @returns {state} state - UI data maintained in state
 */
const uiState = (state = {
  global: {
    navMenuOpen: false,
  },
  Pages: {
    Paths: {
      pathStates: [],
    },
  },
}, action) => {
  switch (action.type) {
    case 'TOGGLE_NAV_MENU': {
      return {
        ...state,
        global: {
          ...state.global,
          navMenuOpen: !state.global.navMenuOpen,
        },
      };
    }
    case 'TOGGLE_PATH': {
      return {
        ...state,
        Pages: {
          ...state.Pages,
          Paths: Paths(state.Pages.Paths, action),
        },
      };
    }
    default:
      return state;
  }
};

export default uiState;