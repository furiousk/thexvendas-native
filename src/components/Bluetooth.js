import React,{useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    Button,
    Dimensions,
    FlatList,
} from 'react-native';
  
import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { BleManager } from 'react-native-ble-plx';

const manager = new BleManager();
const windowHeight = Dimensions.get('window').height;

export default function Bluetooth() {

    const [logData, setLogData] = useState([]);
    const [logCount, setLogCount] = useState(0);
    const [scannedDevices, setScannedDevices] = useState({});
    const [deviceCount, setDeviceCount] = useState(0);

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const onScanDevices = async () => {
        const btState = await manager.state();
        if (btState!=="PoweredOn") {
            alert("Bluetooth encontra-se desligado.");
            return (false);
        }
        manager.startDeviceScan(null, null, async (error, device) => {
            if (error) {
                console.log(error);
                return
            }
            if (device) {
                console.log(`${device.name} (${device.id})}`);
                const newScannedDevices = scannedDevices;
                newScannedDevices[device.id] = device;
                await setDeviceCount(Object.keys(newScannedDevices).length);
                await setScannedDevices(scannedDevices);
            }
        });
        return (true);
    };

    useEffect(() => {

        manager.onStateChange((state) => {
            const subscription = manager.onStateChange(async (state) => {
                const newLogData = logData;
                newLogData.push(state);
                await setLogCount(newLogData.length);
                await setLogData(newLogData);
                subscription.remove();
            }, true);
            return () => subscription.remove();
        });

    }, [manager]);

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <Header titleL1="Feature Bluetooth" titleL2=""/>
            <View style={styles.container}>
                <View>
                    <Button style={styles.button} title="Localizar dispositivos" onPress={async() => onScanDevices()}/>
                </View>
                <Text style={styles.view}> Dispositivos Localizados({deviceCount}) </Text>
                <FlatList
                    data={Object.values(scannedDevices)}
                    renderItem={({item}) => {return (<Text style={styles.item}>{`${item.name}`}</Text>)}}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        height: (windowHeight/2),
        borderWidth: 1,
        backgroundColor: 'white',
    },
    view: {
        borderWidth: 1,
        fontWeight: "bold",
    },
    button:{
        flex: 1,
        flexDirection:'row',
        fontWeight: "bold"
    },
    text: {
        fontSize: 21,
        color: "rgb(0,122,255)"
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        color: "red",
    },
});