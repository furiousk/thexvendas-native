import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import usePedidos from '../../../hooks/usePedidos';
import Cards from './Cards';
import { getOrdersByStatus } from '../modules/Resource';

export function Queue(){
    return <OrderByStatus OrderStatus={0} />;
}
export function Preparing(){
    return <OrderByStatus OrderStatus={1} />;
}
export function Ready(){
    return <OrderByStatus OrderStatus={2} />;
}

export default function OrderByStatus({OrderStatus}) {   
    
    let [orderList, setOrderList] = useState([]);
    
    useEffect(() => {
        getOrdersByStatus(OrderStatus,
            list => setOrderList([...list])
        );
    }, []);    

    const cards = ({ item }) => <Cards item={item} />;        
    return <FlatList 
            data={orderList}
            renderItem={cards}
            keyExtractor={item => item.id}     
    />
    
}