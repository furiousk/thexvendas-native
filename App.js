/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
*/
import React from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Home from './src/components/Home';
import Crud from './src/components/Crud';
import Camera from './src/components/Camera';
import Bluetooth from './src/components/Bluetooth';

const App = () => {

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: '#0c9abe',
          headerStyle: {
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
          },
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Crud" component={Crud} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Bluetooth" component={Bluetooth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
