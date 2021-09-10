import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';
import { Button } from '../../Components';

const Login = ({ navigation: { navigate } }) => {
  const dispatch = useDispatch();
  const [ state, setState ] = React.useState({ phoneNumber: '078314030303', password: 'password' });

  React.useEffect(() => {
    // login();
  }, []);

  // login into attendant account
  const login = () => {
    dispatch.Account.login({
      payload: state,
      callback: (res) => {
        console.log('Recahedada ++++++++', res);
        if (!res.success) return alert(res.result);
        navigate('Register');
      }
    });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: RFValue(15) }}>
      <Text>This is the Login screen</Text>
      <Button title="Login" onPress={() => navigate('Main', { screen: 'Home' })} />
    </View>
  );
};

export default Login;
