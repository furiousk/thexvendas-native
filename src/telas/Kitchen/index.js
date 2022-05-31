import React from 'react'
import {
    SafeAreaView    
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { Queue, Preparing, Ready } from './componentes/OrderByStatus'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default Kitchen = () => {
    return (
        <SafeAreaView style={{ flex:1 }}>            
            <NavigationContainer independent>
              <Tab.Navigator>
                <Tab.Screen name="Na Fila" component={Queue} />
                <Tab.Screen name="Em preparo" component={Preparing} />
                <Tab.Screen name="Pronto" component={Ready} />
              </Tab.Navigator>                            
            </NavigationContainer>
        </SafeAreaView>    
    );
}