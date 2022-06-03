import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {KdsOrderStatus} from '../../../models/KdsOrderStatus';
import Cartoes from './Cartoes';
import { getOrdersByStatus } from '../../../modules/Resource';
import { useStateContext } from '../modules/StateContext';

export function Queue(){
    return <OrderByStatus statusPedido={KdsOrderStatus.Queued}/>;
}
export function Preparing(){
    return <OrderByStatus statusPedido={KdsOrderStatus.InPreparation}/>;
}
export function Ready(){
    return <OrderByStatus statusPedido={KdsOrderStatus.Ready}/>;
}

export default function OrderByStatus({statusPedido}) {    
    const { state: {kdsList}, updateOrders, dispatch } = useStateContext();

    const cards = ({ item }) => (<Cartoes key={item.id} item={item} onNext={nextStatus} onBack={backStatus} />);    

    const nextStatus = ({accountId, kdsSalesOrderId, isSalesOrder = true, kdsOrderStatus}) => {
        updateOrders({accountId, id: kdsSalesOrderId, isSalesOrder, status: ++kdsOrderStatus})
    }
    
    const backStatus = ({accountId, kdsSalesOrderId, isSalesOrder = true, kdsOrderStatus}) => {
        updateOrders({accountId, id: kdsSalesOrderId, isSalesOrder, status: --kdsOrderStatus})
    }

    useEffect(() => {
        getOrdersByStatus(
            (orders) => dispatch({ type: 'GET_ORDERS', orders }),
        );
      }, []);

    return <FlatList 
                data={kdsList[statusPedido]}
                renderItem={cards}
                />
    
}