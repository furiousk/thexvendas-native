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

import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
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

const App = () => {
  //AsyncStorage.clear();
  const [connection, setConnection] = useState<null | HubConnection>(null);
  const [state, dispatch] = useReducer(reducer, {...initialState});  
  //console.log('state', state);
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
    const connect = new HubConnectionBuilder()
      .withUrl("https://stg.thexpos.net/signalrserver/poskds")
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Debug)
      .build();

    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.invoke('AddToGroupAsync', 'KDS_ff31e5b7-25b1-4849-865f-8546f21b20a5')
            .then((resposta) => {
              // console.log('resposta: ', resposta);
            });
          connection.on("ReceiveUpdateOrderStatusKdsAsync", (message) => {

            Notifications.postLocalNotification({
              title: "Preparo",
              body: "Um pedido teve seu status alterado",
              extra: "Clique aqui para visualizar todos os pedidos"
            });

          });
        })
        .catch((error) => console.log('error: ', error));
    }
  }, [connection]);
  
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
