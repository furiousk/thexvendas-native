import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
} from 'react-native';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {RNCamera} from 'react-native-camera';

export default function Camera() {
  const [barcode, setBarCodes] = useState('');
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const CameraComponent = () => {
    if (Platform.OS === 'ios') {
      return (
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.cameraContainer}
          type={RNCamera.Constants.Type.back}
          onBarCodeRead={({data}) => setBarCodes(data)}
        />
      );
    } else {
      return (
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.cameraContainer}
          type={RNCamera.Constants.Type.back}
          onGoogleVisionBarcodesDetected={({data}) => setBarCodes(data)}
        />
      );
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header titleL1="Feature Câmera" titleL2="" />
      <View style={styles.container}>
        <CameraComponent />
      </View>
      <View style={styles.barcode}>
        <Text stile={styles.text}>{barcode}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  barcode: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    padding: 16,
  },
  text: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  cameraContainer: {
    borderWidth: 1,
  },
});
