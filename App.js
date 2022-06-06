/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
*/
import React, { useReducer, useState, useEffect } from 'react';
import { useColorScheme, LogBox, View, Text, ToastAndroid } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getUserStorage, authEffects }  from './src/modules/Auth';

import StateContext, { initialState, reducer }  from './src/modules/StateContext';

import {HubConnectionBuilder, HubConnectionState, LogLevel} from '@microsoft/signalr';
import {Notifications} from 'react-native-notifications';

import Home from './src/components/Home';
import Crud from './src/components/Crud';
import Camera from './src/components/Camera';
// import Bluetooth from './src/components/Bluetooth';
import BluetoothList from './src/components/BluetoothList';
import PaymentView from './src/components/PaymentView';
import Kitchen from './src/telas/Kitchen/index';
import Company from './src/components/Company';
import Login from './src/components/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOrdersByStatus } from './src/modules/Resource';
import { KdsOrderStatus} from './src/models/KdsOrderStatus';

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

const onLoginError = (error) => {
  console.log('onLoginError', error)
  ToastAndroid.showWithGravityAndOffset(
    error?.details[0]?.message ?? '',
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50
  );
}

const throwNotification = (title, body, extra) => {
  Notifications.postLocalNotification({title, body, extra});
};

const App = () => {
  //AsyncStorage.clear();
  const [connection, setConnection] = useState<null | HubConnection>(null);
  const [state, dispatch] = useReducer(reducer, {...initialState});  
  getUserStorage(dispatch);
  const isDarkMode = useColorScheme() === 'dark';
  if (state?.error) {
    onLoginError(state?.error);
  }

  const providerState = {
    state,
    dispatch,
    isDarkMode,
    ...authEffects(dispatch)
  };

  useEffect(() => {
    if (!connection) {
      const connect = new HubConnectionBuilder()
        .withUrl("https://stg.thexpos.net/signalrserver/poskds")
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      setConnection(connect);
    }
  }, []);

  useEffect(() => {
    if (connection) {
      if (connection.state === HubConnectionState.Connected) {
        return;
      }

      connection.on("ReceiveAddOrderKdsAsync", (id, companyId, data) => {
        if (!data) return;
        const response = JSON.parse(data);

        dispatch({ type: 'NEW_ORDER', salesOrderId: response.salesOrderId });
        getOrdersByStatus(
          (orders) => dispatch({ type: 'GET_ORDERS', orders }),
        );

        throwNotification(
          "Novo pedido",
          "Um novo pedido entrou para a fila",
          "Clique aqui para visualizar todos os pedidos"
        );
      });

      connection.on("ReceiveUpdateOrderStatusKdsAsync", (id, companyId, data) => {
        if (!data) return;
        const response = JSON.parse(data);
        getOrdersByStatus(
          (orders) => dispatch({ type: 'GET_ORDERS', orders }),
        );

        if (response?.kdsList[0]?.status === KdsOrderStatus.Ready) {
          throwNotification(
            "Pedido Pronto!",
            "Um pedido ficou pronto",
            "Clique aqui para visualizar todos os pedidos"
          );
        }

      });

      connection
        .start()
        .then(() => {
          connection.invoke('AddToGroupAsync', `KDS_${state?.companyData?.companyId}`)
            .then((resposta) => console.log('resposta: ', resposta))
            .catch((error) => console.log('AddToGroupAsync Error: ', error));
          
        })
        .catch((error) => console.log('error: ', error));
    }
  }, [state?.companyData?.companyId]);
  
  return (
    <StateContext.Provider value={providerState}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: '#0c9abe',
            headerStyle: {
              backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            },
          }}>
          { state.isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : !state?.userData?.newPasswordToken ? (
            <Stack.Screen name="Login" component={Login} />
          ) : !state?.companyData?.newPasswordToken ? (
            <Stack.Screen name="Company" component={Company} />
          ) : (  
            <>
            <Stack.Screen name="Kitchen" component={Kitchen} />  
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Crud" component={Crud} />
            <Stack.Screen name="Camera" component={Camera} />            
            <Stack.Screen name="BluetoothList" component={BluetoothList} />
            <Stack.Screen name="PaymentView" component={PaymentView} />                    
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </StateContext.Provider>
  );
}

export default App;
