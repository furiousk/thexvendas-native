import React from 'react'
import {
    SafeAreaView,
    FlatList
} from 'react-native';

import usePedidos from '../../hooks/usePedidos';
import Cartoes from './componentes/Cartoes';

export default Kitchen = () => {
    const lista = usePedidos(0);
    return (
        <SafeAreaView>
            <FlatList 
                data={lista}
                renderItem={
                    ({ item }) => <Cartoes {...item} aoPressionar={() => {}} />
                }
                keyExtractor={({ mesa }) => mesa}     
            />    
        </SafeAreaView>    
    );
}