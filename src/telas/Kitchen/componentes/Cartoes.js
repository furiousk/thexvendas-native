import React, { useMemo } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

const tempoEmMinutos = (tempo) => {
    return `${tempo} min`;
}

export default function Cartoes({tempo, mesa, garcom, items, numero, aoPressionar }){
    const tempoTexto = useMemo(
        () => tempoEmMinutos(tempo),
        [tempo]
    );

    return <TouchableOpacity
            style={estilos.cartao}
            onPress={aoPressionar}
            >
                <View style={estilos.tempo}>
                    <Text style={estilos.tempoTexto}>{ tempoTexto }</Text>
                </View>
                <View style={estilos.mesaGarcom}>
                    <Text style={estilos.mesa}>{ mesa }</Text>
                    <Text style={estilos.garcom}>{ garcom }</Text>
                </View>
                <View style={estilos.items}>                
                    { 
                        items.map(i => {
                            return (
                                <Text>{ i.quantidade }x  { i.item }</Text>
                            )
                        })
                    }                    
                </View>
                <View style={estilos.numeroPedido}>
                    <Text style={estilos.voltar}>  &lt;  </Text>
                    <Text style={estilos.numero}>{ numero }</Text>
                </View>
                
            </TouchableOpacity>
}

const estilos = StyleSheet.create({
    cartao: {
        backgroundColor: '#F6F6F6',
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 6,
        // flexDirection: "column",

        // Android
        elevation: 4,

        // iOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
    },
    tempo: {
        backgroundColor: '#c64840',                 
        width: '100%',
        height: 25               
    },
    tempoTexto: {
        color: '#FFF',        
        fontSize: 16,
        paddingHorizontal: 10
    },
    mesaGarcom: {
        backgroundColor: '#f0f0f0', 
        padding: 10
    },
    mesa: {
        fontSize: 26,
        fontWeight: 'bold',        
    },
    numeroPedido: {                
        borderTopWidth: 1,        
        borderColor: 'grey',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    numero: {
        backgroundColor: '#f0f0f0', 
        color: '#000',
        padding: 5,     
        margin: 5,    
        fontSize: 18
    },
    voltar: {
        padding: 5,
        margin: 5,  
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 25,
        fontWeight: 'bold',
        fontSize: 18,
        height: 40
        
    },
    items: {
        padding: 10,
        fontWeight: 'bold',
    }
});    