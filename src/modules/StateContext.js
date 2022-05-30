import { createContext, useContext} from 'react';

export const initialState = {
  isLoading: true,
  isSignout: false,
  userData: null,
  companyData: null,
};

const StateContext = createContext();

export function useStateContext() {
  return useContext(StateContext);
}

export function reducer(state, action) {
  switch (action.type) {
  case 'RESTORE_TOKEN':
      return {
      ...state,
      userData: {
        ...state.userData,
        newPasswordToken: action.token
      },
      isLoading: false,
      };
  case 'SIGN_IN':
      return {
      ...state,
      isSignout: false,
      userData: action.userData,
      error: null
      };
  case 'SIGN_ERROR':
      return {
      ...state,
      isSignout: false,
      userData: null,
      error: action.error,
      };
  case 'SIGN_OUT':
      return {
      ...state,
      isSignout: true,
      userData: null,
      error: null
      };
  case 'COMPANY_SIGN_IN':
      return {
      ...state,
      isSignout: false,
      companyData: action.companyData,
      error: null
      };
  }
}

export default StateContext;