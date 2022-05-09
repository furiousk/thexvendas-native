import React, { useEffect, useState, useMemo }  from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  ActivityIndicator, 
  FlatList,
  ListItem,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { ListPersonalData, SavePersonalData, UpdatePersonalData, DeletePersonalData } from '../modules/Resource';

export default Crud = () => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [name, onChangeName] = useState("");
    const [email, onChangeEmail] = useState("");
    const [id, onChangeId] = useState("");

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const onRead = () => ListPersonalData(data => {
      setTimeout(() => {
        setLoading(false);
        setData(data);
        onSetter(null);
      }, 500);
    });

    const onSetter = (item) => {
      onChangeName(item?.nome||null);
      onChangeEmail(item?.email||null);
      onChangeId(item?.id||null);
    }

    const onClickUpdate = (id) => {
      if(name!="" && email!="" && id!=""){
        setLoading(true);
        UpdatePersonalData(id, {nome:name,email:email}, data => onRead());
      }
    }

    const onClickDelete = (id) => {
      if(name!="" && email!="" && id!=""){
        setLoading(true);
        DeletePersonalData(id, data => onRead());
      }
    }

    const onClickCreate = () => {
      if(name!="" && email!=""){
        setLoading(true);
        SavePersonalData({nome:name, email:email}, data => onRead());
      }
    };

    useEffect(() => {
      onRead();
    }, []);
  
    return (
        
        <SafeAreaView style={backgroundStyle}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <View>
            <TextInput value={name} onChangeText={onChangeName} style={styles.input} placeholder="Digite seu nome."/>
            <TextInput value={email} onChangeText={onChangeEmail} style={styles.input} placeholder="Digite seu e-mail."/>
            <View style={styles.buttonContainer} >
              <Button onPress={() => { onClickCreate() }} title="Criar(Create)"/>
              <Button onPress={() => { onClickUpdate(id) }} title="Editar(Update)"/>
              <Button onPress={() => { onClickDelete(id) }} title="Del(Delete)"/>
            </View>
          </View>
          <View style={styles.list}>
            {isLoading ? 
            <ActivityIndicator/> : (
              <View style={styles.container}>
              {console.log(data)}
                <FlatList
                  keyExtractor={(item, index) => index}
                  data={data}
                  renderItem={({item}) => <TouchableHighlight onPress={()=>{onSetter(item)}}><Text style={styles.item}>{item.nome} - {item.email}</Text></TouchableHighlight>}
                />
              </View>
            )}
          </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: "red",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

