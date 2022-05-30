import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import { useStateContext } from '../modules/StateContext';

export default Login = () => {
  const { signIn, isDarkMode } = useStateContext();

  const [email, onChangeEmail] = useState('timeapps');
  const [password, onChangePassword] = useState('apps@totvs2022');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onClickLogin = () => {
    if (email != '' && password != '') {
      signIn({login: email, password});
    }
  };

  return (
    <SafeAreaView style={[
      backgroundStyle,
      { flex: 1 }
      ]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header titleL1="Feature Crud" titleL2=""/>
      <View
        style={
          [
            styles.container,
            {
              backgroundColor: isDarkMode ? Colors.darker : Colors.lighter 
            },
          ]
        }
      >
        <TextInput
          value={email}
          onChangeText={onChangeEmail}
          style={[
            styles.input,
            {
              backgroundColor: isDarkMode ? '#333' : '#ddd',
            },
          ]}
          placeholder="Digite seu e-mail."
        />
        <TextInput
          value={password}
          onChangeText={onChangePassword}
          style={[
            styles.input,
            {
              backgroundColor: isDarkMode ? '#333' : '#ddd',
            },
          ]}
          placeholder="Digite sua senha."
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onClickLogin();
            }}
          >
            <Text>
              Entrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 15,
    margin: 10,
    borderRadius: 5,
  },
  container: {
    paddingTop: 10,
  },
  buttonContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#0c9abe',
    padding: 15,
    borderRadius: 5,
    width: '31%',
    alignContent: 'center',
    alignItems: 'center',
  },
});
