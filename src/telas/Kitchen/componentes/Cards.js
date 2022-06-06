import React, { useMemo } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const diff_minutes = (dtStart) => {
    const now = Date.now();
    dtStart = new Date(dtStart);
    let diff = (now - dtStart.getTime()) / 1000;
    diff /= 60;
    const min = Math.abs(Math.round(diff));
    return `${min} min`;
}

export default function Cards({ item, onNext, onBack }) {
    const tempoTexto = useMemo(
        () => diff_minutes(item.salesOrderDate),
        [item.salesOrderDate]
    );

    return (
        <TouchableOpacity
            style={estilos.cartao}
            onPress={() => onNext(item)}>
            <View>
                <View style={estilos.tempo}>
                    <Image href={require('./../../../res/clock.svg')} />
                    <Text style={estilos.tempoTexto}>{tempoTexto}</Text>
                </View>
                <View style={estilos.mesaGarcom}>
                    <Text style={estilos.mesa}>{item.deliveryPlaceName}</Text>
                    <Text style={estilos.contaNome}>{item.accountName}</Text>
                </View>
                <View style={estilos.items}>
                    {
                        item.entries?.map((item, index) => {
                            return (
                                <Text key={index}>{item.entryQuantity}x  {item.itemDescription}</Text>
                            )
                        })
                    }
                </View>
                <View style={estilos.numeroPedido}>
                    <View>
                        <Text onPress={() => onBack(item)} style={item.kdsOrderStatus > 0 ? estilos.voltar : estilos.none}>  &lt; </Text>
                    </View>
                    <Text style={estilos.numero}>{item.launchCode}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const estilos = StyleSheet.create({
    none: {
        display: 'none'
    },
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
        fontSize: 18,
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