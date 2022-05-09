/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
 import React from 'react';

 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
 const Stack = createNativeStackNavigator();

 import Home from './src/components/Home';
 import Crud from './src/components/Crud';
 
 const App = () => {

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Crud" component={Crud} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
 
 export default App;
 