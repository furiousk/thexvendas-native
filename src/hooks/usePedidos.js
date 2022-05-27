import { useState, useEffect } from 'react';

import { carregaPedidos } from '../servicos/carregaDados';

export default function usePedidos(statusPedido) {
    const [lista, setLista] = useState([]);
        
    useEffect(() => {
        const retorno = carregaPedidos();
        retorno.lista.sort(
            (pedido1, pedido2) => pedido1.tempo - pedido2.tempo,
        );
        let novaLista = retorno.lista;
        
        if (statusPedido>=0) {
            novaLista = novaLista.filter(
                (pedido) => pedido.statusPedido == statusPedido
            );
        }
        setLista(novaLista);
    }, []);

    return lista;
}