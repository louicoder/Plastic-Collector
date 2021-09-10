import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';
import { Button } from '../../Components';

const Register = ({ navigation: { navigate } }) => {
  const [ state, setState ] = React.useState({
    name: 'Michael Musa',
    password: 'password',
    gender: 'male',
    phoneNumber: '078314030303',
    district: 'Kampala'
  });
  const dispatch = useDispatch();

  useEffect(() => {
    // register();
  }, []);

  const register = () => {
    dispatch.Account.register({
      payload: state,
      callback: (res) => {
        // console.log('Recahedada ++++++++', res);
        if (!res.success) return alert(res.result);
      }
    });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: RFValue(15) }}>
      <Text>This is the Register screen</Text>
      <Button title="Register" onPress={() => navigate('Main', { screen: 'Home' })} />
    </View>
  );
};

export default Register;
