import React,{useState} from 'react';
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
} from 'react-native';
  
import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { RNCamera } from 'react-native-camera';

const windowHeight = Dimensions.get('window').height;

export default function Camera() {

    const [barcode, setBarCodes] = useState("");
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <Header titleL1="Feature Câmera" titleL2=""/>
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.cameraContainer}
                    type={RNCamera.Constants.Type.back}
                    onBarCodeRead={ ({data}) => setBarCodes(data)}/>
            </View>
            <View style={styles.barcode}>
                <Text stile={styles.text}>{barcode}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {},
    barcode:{
        flexDirection: 'row',
        height: 40,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center"
    },
    touchable: {
        padding: 16
    },
    text: {
        fontSize: 21,
        color: "rgb(0,122,255)"
    },
    cameraContainer: {
        height: (windowHeight/2),
        borderWidth: 1,
    }
});