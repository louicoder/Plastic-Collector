import React, { useEffect } from 'react';
import { View, Text, Dimensions, Pressable, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaskInput from 'react-native-mask-input';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheet, Button, DesignIcon, Input, Logo, Password, SelectField } from '../../Components';

const { height } = Dimensions.get('window');
const Register = ({ navigation }) => {
  const [ state, setState ] = React.useState({
    name: 'Mukasa Joseph ',
    password: 'password',
    gender: 'male',
    phoneNumber: '0782131415',
    district: 'Kampala',
    passVisible: false,
    isVisible: false,
    email: ''
  });
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.effects.Account);

  const register = () => {
    const { passVisible, isVisible, ...payload } = state;
    if (!payload.gender) return Alert.alert('Information', 'Your Gender is required, try again');
    if (!payload.name) return Alert.alert('Information', 'Your Name is required, try again');
    if (!payload.phoneNumber) return Alert.alert('Information', 'Your Phone number is required, try again');
    if (!payload.district) return Alert.alert('Information', 'Your District is required, try again');
    if (!payload.password || !payload.password || payload.password.length < 6)
      return Alert.alert('Information', 'Your password is required and should be atleast 6 characters, try again');
    dispatch.Account.register({
      payload,
      callback: (res) => {
        console.log('REgistration ++++++++', res);
        if (!res.success) return alert(res.result);
        return navigation.navigate('Main', { screen: 'Home' });
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <BottomSheet isVisible={state.isVisible} closeModal={() => setState({ ...state, isVisible: false })}>
        <View>
          {[ 'male', 'female' ].map((gender, index) => (
            <Pressable
              key={index + Math.random().toString(36).slice(2)}
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: RFValue(10) }}
              onPress={() => setState({ ...state, gender: gender === state.gender ? '' : gender })}
            >
              <DesignIcon pkg="mc" name={state.gender === gender ? 'checkbox-marked' : 'checkbox-blank-outline'} />
              <Text
                style={{
                  fontSize: RFValue(16),
                  marginLeft: RFValue(10),
                  // fontWeight: state.gender === gender ? 'bold' : 'normal',
                  textTransform: 'capitalize',
                  fontFamily: state.gender === gender ? 'OpenSans-Bold' : 'OpenSans-Regular'
                }}
              >
                {gender}
              </Text>
            </Pressable>
          ))}
          <Button onPress={() => setState({ ...state, isVisible: false })} title="Confirm gender" />
        </View>
      </BottomSheet>
      <KeyboardAwareScrollView
        style={{ flex: 1, paddingTop: RFValue(30), paddingHorizontal: RFValue(10) }}
        keyboardShouldPersistTaps="handled"
      >
        <Logo fSize={20} />
        <Text style={{ marginVertical: RFValue(20), fontSize: RFValue(14), fontFamily: 'OpenSans-Regular' }}>
          Please ensure to fill in all the fields below for easy verification of your account.
        </Text>
        <Input
          value={state.name}
          onChangeText={(name) => setState({ ...state, name })}
          placeholder="Full name e.g Mukasa Joseph"
        />

        <SelectField
          onPress={() => setState({ ...state, isVisible: true })}
          value={state.gender}
          placeholder="Slect your gender"
        />
        <SelectField
          onPress={() => setState({ ...state, isVisible: true })}
          value={state.district}
          placeholder="Slect your district"
        />

        <MaskInput
          keyboardType="phone-pad"
          style={{
            height: RFValue(40),
            // backgroundColor: '#ddd',
            borderWidth: 1,
            borderColor: '#ddd',
            width: '100%',
            paddingHorizontal: RFValue(10),
            fontSize: RFValue(14),
            marginBottom: RFValue(10)
          }}
          value={state.phoneNumber}
          placeholder="Phone number e.g 07xx-xxx-xxx"
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
        {/* <Button title="Login" onPress={() => navigate('Main', { screen: 'Home' })} /> */}
        <Button title="Register" onPress={register} loading={loading.register} />
        {/* </View> */}
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
          <Text style={{ fontSize: RFValue(14), fontFamily: 'OpenSans-Regular' }}>Already Registered ?</Text>
          <Pressable onPress={() => navigation.goBack()}>
            <Text
              style={{ fontSize: RFValue(14), color: 'blue', marginLeft: RFValue(10), fontFamily: 'OpenSans-Bold' }}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Register;
