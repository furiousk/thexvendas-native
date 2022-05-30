import AsyncStorage from '@react-native-async-storage/async-storage';


const Worker = 'debug';
const IPS = {
  debug: 'http://192.168.1.107:3000',
  tst: 'http://192.168.1.107:3000',
};

const _Req = async (url, verb, successCaller, data, errorCaller) => {
  const userToken = await AsyncStorage.getItem('userToken');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...(userToken ? {'authorization': `Bearer ${userToken}`} : {})
  };
  const config = {
    method: verb,
    headers,
    ...((verb == 'GET' || verb == 'DELETE') ? {} : {body: JSON.stringify(data)}),
  }

  fetch(url, config)
    .then(async response => {
      const responseJson = await response.json();
      if (response.ok) {
        successCaller(responseJson)
      } else {
        errorCaller && errorCaller(responseJson);    
      }
    })
    .catch(async error => {
      console.log('ERRRRRRRRRRR', error.text());
      // const errorJson = await error.json();
      // errorCaller && errorCaller(errorJson);
    });
};

const SavePersonalData = (params, success, error) => {
  let http = `${IPS[Worker]}/usuarios`;
  let verb = 'POST';

  _Req(http, verb, success, params, error);
};

const UpdatePersonalData = (id, params, success, error) => {
  let http = `${IPS[Worker]}/usuarios/${id}`;
  let verb = 'PUT';

  _Req(http, verb, success, params, error);
};

const DeletePersonalData = (id, success, error) => {
  let http = `${IPS[Worker]}/usuarios/${id}`;
  let verb = 'DELETE';

  _Req(http, verb, success, error);
};

const SaveBluetoothData = (params, success, error) => {
  let http = `${IPS[Worker]}/bluetooths`;
  let verb = 'POST';

  _Req(http, verb, success, params, error);
};

const ListPersonalData = (success, error) => {
  let http = `${IPS[Worker]}/usuarios`;
  let verb = 'GET';

  _Req(http, verb, success, error);
};

const ListBluetoothData = (success, error) => {
  let http = `${IPS[Worker]}/bluetooths`;
  let verb = 'GET';

  _Req(http, verb, success, error);
};

const Authenticate = (params, success, error) => {
  let http = 'https://stg.thexpos.net/ordercontrol/user/login';
  let verb = 'POST';

  _Req(http, verb, success, params, error);
};

const getSimplifiedCompanyList = (success, error) => {
  let http = 'https://stg.thexpos.net/ordercontrol/company/getsimplifiedcompanylist';
  let verb = 'GET';

  _Req(http, verb, success, {}, error);
};

const changeCompany = ({companyId, keepAlive}, success, error) => {
  let http = `https://stg.thexpos.net/ordercontrol/user/changecompany?companyId=${companyId}&keepAlive=${keepAlive}`;
  let verb = 'POST';

  _Req(http, verb, success, {companyId, keepAlive}, error);
};

const getKdsGroups = (success, error) => {
  let http = 'https://stg.thexpos.net/ordercontrol/ordercontrol/kitchen/kdsgroups';
  let verb = 'GET';

  _Req(http, verb, success, {}, error);
};

const getOrdersByStatus = (success, error) => {
  let http = 'https://stg.thexpos.net/ordercontrol/kitchen/ordersbystatus';
  let verb = 'GET';

  _Req(http, verb, success, {}, error);
};

const webSocketOrdes = (success, error) => {
  let http = 'https://stg.thexpos.net/signalrserver/poskds';
  let verb = 'GET';

  _Req(http, verb, success, {}, error);
};

export {
  SavePersonalData,
  UpdatePersonalData,
  DeletePersonalData,
  SaveBluetoothData,
  ListPersonalData,
  ListBluetoothData,
  Authenticate,
  getSimplifiedCompanyList,
  changeCompany,
  getKdsGroups,
  getOrdersByStatus,
  webSocketOrdes
};
