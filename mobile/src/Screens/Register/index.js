import React, { useEffect } from 'react';
import { View, Text, Dimensions, Pressable, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaskInput from 'react-native-mask-input';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheet, Button, DesignIcon, Input, Password } from '../../Components';

const { height } = Dimensions.get('window');
const Register = ({ navigation }) => {
  const [ state, setState ] = React.useState({
    name: 'Mukasa Joseph ',
    password: 'password',
    gender: '',
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
          <Text style={{ fontSize: RFValue(16), marginBottom: RFValue(15) }}>
            Please select one option below that explains your gender:
          </Text>
          {[ 'male', 'female' ].map((gender, index) => (
            <Pressable
              key={index + Math.random().toString(36).slice(2)}
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: RFValue(10) }}
              onPress={() => setState({ ...state, gender })}
            >
              <DesignIcon pkg="mc" name={state.gender === gender ? 'checkbox-marked' : 'checkbox-blank-outline'} />
              <Text
                style={{
                  fontSize: RFValue(16),
                  marginLeft: RFValue(10),
                  fontWeight: state.gender === gender ? 'bold' : 'normal',
                  textTransform: 'capitalize'
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
        <Text style={{ marginVertical: RFValue(20), fontSize: RFValue(14) }}>
          Please ensure to fill in all the fields below for easy verification of your account. Please make sure the
          phone number you provide is the one you will be using and payments shall be done using that number
        </Text>
        <Input
          value={state.name}
          onChangeText={(name) => setState({ ...state, name })}
          placeholder="Full name e.g Mukasa Joseph"
        />
        <Input
          value={state.email}
          onChangeText={(email) => setState({ ...state, email })}
          placeholder="Email e.g mukas@gmail.com"
          keyboardType="email"
        />
        <Pressable
          onPress={() => setState({ ...state, isVisible: true })}
          style={{
            width: '100%',
            paddingHorizontal: RFValue(10),
            backgroundColor: '#ddd',
            height: RFValue(40),
            marginBottom: RFValue(10),
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Text
            style={{
              fontSize: RFValue(14),
              color: state.gender ? '#000' : '#aaa',
              textTransform: 'capitalize'
            }}
          >
            {state.gender || 'Select your gender'}
          </Text>
          <DesignIcon name={state.isVisible ? 'chevron-up' : 'chevron-down'} pkg="mc" />
        </Pressable>
        <Input
          value={state.district}
          onChangeText={(district) => setState({ ...state, district })}
          placeholder=" e.g Kampala"
        />
        <MaskInput
          keyboardType="phone-pad"
          style={{
            height: RFValue(40),
            backgroundColor: '#ddd',
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
          <Text style={{ fontSize: RFValue(16) }}>Already Registered ?</Text>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={{ fontSize: RFValue(16), color: 'blue', marginLeft: RFValue(10) }}>Login here</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Register;
