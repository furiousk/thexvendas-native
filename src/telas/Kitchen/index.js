import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useStateContext } from '../modules/StateContext';
import { Preparing, Queue, Ready } from './componentes/OrderByStatus';

const Tab = createBottomTabNavigator();

export default Kitchen = ({navigation}) => {
    const { state: { newKdsList}, dispatch } = useStateContext();

    return (
        <SafeAreaView style={{ flex:1 }}>            
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
            <Tab.Screen 
                name="Na Fila" 
                component={Queue} 
                listeners={{
                    tabPress: (e) => dispatch({type: 'NEW_ORDER_VIEWED'})
                }}
                options={newKdsList?.length ? { tabBarBadge: newKdsList?.length } : {}} />
            <Tab.Screen name="Em preparo" component={Preparing} />
            <Tab.Screen name="Pronto" component={Ready} />
            </Tab.Navigator>                            
        </SafeAreaView>    
    );
}