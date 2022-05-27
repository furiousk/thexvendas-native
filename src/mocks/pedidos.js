const gerarNumeroAleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

const pedidos = {
    lista: [
        {
            tempo: gerarNumeroAleatorio(1, 20),
            mesa: "Mesa 2",
            garcom: "Leonardo Souza",
            restaurante: "",
            numero: gerarNumeroAleatorio(5000, 8000),
            statusPedido: 0,
            items:[
                {
                    item: "Suco de Abacaxi",
                    quantidade: 1,
                    observacao: "adoçante"
                }
            ]

        },
        {
            tempo: gerarNumeroAleatorio(1, 20),
            mesa: "Mesa 6",
            garcom: "Luis Carlos Sousa",
            restaurante: "",
            numero: gerarNumeroAleatorio(5000, 8000),
            statusPedido: 0,
            items:[
                {
                    item: "Suco de Laranja",
                    quantidade: 1,
                    observacao: ""
                },
                {
                    item: "Bolo de Chocolate",
                    quantidade: 1,
                    observacao: ""
                },
            ]

        },
        {
            tempo: gerarNumeroAleatorio(1, 20),
            mesa: "Mesa 3",
            garcom: "Felipe Matos",
            restaurante: "Bar do Lobby",
            numero: gerarNumeroAleatorio(5000, 8000),
            statusPedido: 1,
            items:[
                {
                    item: "Heineken",
                    quantidade: 2,
                    observacao: ""
                }
            ]

        },
        {
            tempo: gerarNumeroAleatorio(1, 20),
            mesa: "Mesa 1",
            garcom: "Filipe Silva",
            restaurante: "Restaurante Cinco Estrelas",
            numero: gerarNumeroAleatorio(5000, 8000),
            statusPedido: 1,
            items:[
                {
                    item: "Suco de Laranja",
                    quantidade: 1,
                    observacao: ""
                }
            ]

        },
        {
            tempo: gerarNumeroAleatorio(1, 20),
            mesa: "Mesa 5",
            garcom: "Caio Régis",
            restaurante: "Bar do Lobby",
            numero: gerarNumeroAleatorio(5000, 8000),
            statusPedido: 2,
            items:[
                {
                    item: "Vinho Santa Helena",
                    quantidade: 1,
                    observacao: ""
                }
            ]

        },
    ]
}

export default pedidos;