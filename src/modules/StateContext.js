import { createContext, useContext } from 'react';
import { KdsOrderStatus } from '../models/KdsOrderStatus';

export const initialState = {
  isLoading: true,
  isSignout: false,
  userData: null,
  companyData: null,
  kdsList: {
    [KdsOrderStatus.Queued]: [],
    [KdsOrderStatus.InPreparation]: [],
    [KdsOrderStatus.Ready]: [],
  },
  newKdsList: []
};

const StateContext = createContext();
const displayIdDefault = '00000000-0000-0000-0000-000000000000';

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
        companyData: {
          ...action.companyData,
          companyId: action.companyId
        },
        error: null
      };
    case 'GET_ORDERS':
      return {
        ...state,
        kdsList: {
          ...state.kdsList,
          [KdsOrderStatus.Queued]: action.orders
            .filter(o => (o.kdsOrderStatus === KdsOrderStatus.Queued) && (o.displayId === displayIdDefault)),
          [KdsOrderStatus.InPreparation]: action.orders
            .filter(o => (o.kdsOrderStatus === KdsOrderStatus.InPreparation) && (o.displayId === displayIdDefault)),
          [KdsOrderStatus.Ready]: action.orders
            .filter(o => (o.kdsOrderStatus === KdsOrderStatus.Ready) && (o.displayId === displayIdDefault)),
        },
      };
    case 'NEW_ORDER':
      return {
        ...state,
        newKdsList: [
          ...state.newKdsList,
          action.salesOrderId
        ],
      };
    case 'NEW_ORDER_VIEWED':
      return {
        ...state,
        newKdsList: [],
      };
  }
}

export default StateContext;