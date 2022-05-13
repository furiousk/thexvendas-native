import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
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
    return (
      <RNCamera
        ref={ref => {
          if (!this.camera) {
            this.camera = ref;
          }
        }}
        captureAudio={false}
        style={styles.cameraContainer}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={({data}) => setBarCodes(data)}
      />
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header titleL1="Feature Câmera" titleL2="" />
      <View style={[styles.container, backgroundStyle]}>
        <View>
          <CameraComponent />
        </View>
        <View style={[styles.barcode, backgroundStyle]}>
          <Text>{barcode}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  barcode: {
    marginTop: 100,
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'center',
    padding: 15,
  },
  touchable: {
    padding: 16,
  },
  cameraContainer: {
    marginTop: 260,
    height: '10%',
  },
});
