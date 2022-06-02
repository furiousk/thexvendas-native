import React, {useEffect, useState} from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import { getSimplifiedCompanyList } from '../modules/Resource';
import { useStateContext } from '../modules/StateContext';

import Section from './Section';
 
const Company = ({navigation}) => {
  const { isDarkMode, companySignIn } = useStateContext();
  let [companyList, setCompanyList] = useState([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getCompany = (id) => {
    companySignIn(id);
  }

  useEffect(() => {
    getSimplifiedCompanyList(list => setCompanyList([...list]));
  }, []);
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View>
          {companyList?.map((company) => {
            return (
              <Section key={company.id} title={company.companyFantasyName} url={() => getCompany(company.id)}>
                {company.companyName}
              </Section>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 32,
  },
});

export default Company;