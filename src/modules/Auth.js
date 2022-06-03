import { useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Authenticate, changeCompany, getOrdersByStatus, updateOrders } from './Resource';

const getUserStorage = (dispatch) => {
    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken = null;
            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
                // Restoring token failed
            }

            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
  }, []);
}

const authEffects = (dispatch) => {
    return useMemo(
        () => ({
        signIn: async ({login, password}) => {
            Authenticate(
                {login, password, keepAlive: false}, 
                (userData) => {
                    AsyncStorage.setItem('userToken', userData.newPasswordToken)
                        .then(() => dispatch({ type: 'SIGN_IN', userData }));
                },
                (error) => dispatch({ type: 'SIGN_ERROR', error }),
            );
        },
        signOut: () => dispatch({ type: 'SIGN_OUT' }),
        signUp: async (data) => {
            // In a production app, we need to send user data to server and get a token
            // We will also need to handle errors if sign up failed
            // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
            // In the example, we'll use a dummy token

            dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        },
        companySignIn: async (companyId) => {
            changeCompany(
                {companyId, keepAlive: true}, 
                (companyData) => {
                    AsyncStorage.setItem('userToken', companyData.newPasswordToken)
                        .then(() => dispatch({ type: 'COMPANY_SIGN_IN', companyData }));
                },
                (error) => dispatch({ type: 'SIGN_ERROR', error }),
            );
        },
        updateOrders: async (order) => {
            updateOrders(
                order, 
                (success) => getOrdersByStatus(
                    (orders) => dispatch({ type: 'GET_ORDERS', orders }),
                ),
            );
        },
        }),
        []
    );
}

export {
    getUserStorage,
    authEffects,
};