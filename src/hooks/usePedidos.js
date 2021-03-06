import { useState, useEffect } from 'react';
import { KdsOrderStatus } from '../models/KdsOrderStatus';

import { getOrderMock } from '../servicos/getDataMock';

export default function usePedidos(statusPedido) {
    const [lista, setLista] = useState([]);
        
    useEffect(() => {
        const retorno = getOrderMock();
        retorno.lista.sort(
            (pedido1, pedido2) => pedido1.tempo - pedido2.tempo,
        );
        let novaLista = retorno.lista;
        
        if (statusPedido >= KdsOrderStatus.Queued) {
            novaLista = novaLista.filter(
                (pedido) => pedido.statusPedido == statusPedido
            );
        }
        setLista(novaLista);
    }, []);

    return lista;
}