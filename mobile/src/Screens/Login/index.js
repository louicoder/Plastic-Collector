import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheet, Button, Input, Password } from '../../Components';
import MaskInput from 'react-native-mask-input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Login = ({ navigation: { navigate } }) => {
  const dispatch = useDispatch();
  const [ state, setState ] = React.useState({ phoneNumber: '0782131415', password: 'password', passVisible: false });
  const loading = useSelector((state) => state.loading.effects.Account);

  // login into attendant account
  const login = () => {
    dispatch.Account.login({
      payload: state,
      callback: (res) => {
        if (!res.success) return alert(res.result);
        console.log('Result login', res);
        setState({});
        navigate('Main', { screen: 'Home' });
      }
    });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: RFValue(15) }}>
      <Text style={{ fontSize: RFValue(16), marginVertical: RFValue(15) }}>
        Please enter your credentials to be able to use the platform
      </Text>

      <Text
        style={{
          fontSize: RFValue(12),
          marginVertical: RFValue(15),
          position: 'absolute',
          bottom: RFValue(10)
        }}
      >
        Platic-collector © 2021
      </Text>

      <MaskInput
        style={{
          height: RFValue(40),
          backgroundColor: '#ddd',
          width: '100%',
          paddingHorizontal: RFValue(10),
          fontSize: RFValue(14),
          marginBottom: RFValue(5)
        }}
        value={state.phoneNumber}
        placeholder="07xx-xxx-xxx"
        maxLength={12}
        onChangeText={(masked, unmasked, obfuscated) => setState({ ...state, phoneNumber: masked })}
        mask={[ /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/ ]}
      />

      <Password
        placeholder="Password"
        onChangeText={(password) => setState({ ...state, password })}
        value={state.password}
        passVisible={state.passVisible}
        togglePassword={() => setState({ ...state, passVisible: !state.passVisible })}
      />
      <Button title="Login" onPress={login} loading={loading.login} />
      <View
        style={{
          marginVertical: RFValue(15),
          paddingVertical: RFValue(15),
          width: '100%',
          borderColor: '#ddd',
          borderTopWidth: 1,
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        <Text style={{ fontSize: RFValue(16) }}>Not yet registered ?</Text>
        <Pressable onPress={() => navigate('Register')}>
          <Text style={{ fontSize: RFValue(16), color: 'blue', marginLeft: RFValue(10) }}>Register</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;
