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

export default function Camera() {

    const [barcode, setBarCodes] = useState([]);
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
                    onBarCodeRead={ barcodes => {
                        console.warn(barcodes?.data);
                    }}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "black"
    },
    touchable: {
      padding: 16
    },
    text: {
      fontSize: 21,
      color: "rgb(0,122,255)"
    },
    cameraContainer: {
      height: Dimensions.get('window').height,
      borderWidth: 1,
    }
  });