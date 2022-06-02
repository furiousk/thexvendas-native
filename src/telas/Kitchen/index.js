import React from 'react'
import {
    SafeAreaView    
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { Queue, Preparing, Ready } from './componentes/OrderByStatus'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default Kitchen = () => {
    return (
        <SafeAreaView style={{ flex:1 }}>            
            <NavigationContainer independent>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Na Fila') {
                            iconName = focused
                              ? 'list'
                              : 'list-outline';
                        } else if (route.name === 'Em preparo') {
                            iconName = focused ? 'md-bonfire' : 'bonfire-sharp';
                        } else if (route.name === 'Pronto') {
                            iconName = focused ? 'restaurant' : 'restaurant-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Na Fila" component={Queue} />
                <Tab.Screen name="Em preparo" component={Preparing} />
                <Tab.Screen name="Pronto" component={Ready} />
              </Tab.Navigator>                            
            </NavigationContainer>
        </SafeAreaView>    
    );
}