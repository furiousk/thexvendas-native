import React from 'react';
import {FlatList} from 'react-native';
import usePedidos from '../../../hooks/usePedidos';
import Cartoes from './Cartoes';

export function Queue(){
    return <OrderByStatus statusPedido={0}/>;
}
export function Preparing(){
    return <OrderByStatus statusPedido={1}/>;
}
export function Ready(){
    return <OrderByStatus statusPedido={2}/>;
}

export default function OrderByStatus({statusPedido}) {    
    const lista = usePedidos(statusPedido);
    const cards = ({ item }) => <Cartoes {...item} aoPressionar={() => {}} />;    
    
    return <FlatList 
            data={lista}
            renderItem={cards}
            keyExtractor={({ id }) => id.toString}     
    />
    
}