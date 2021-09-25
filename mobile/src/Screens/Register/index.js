import React, {useEffect} from 'react';
import {View, Text, Dimensions, Pressable, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaskInput from 'react-native-mask-input';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {
  BottomSheet,
  Button,
  DesignIcon,
  Input,
  Logo,
  Password,
  SelectField,
  GenderSelector,
  DistrictList,
} from '../../Components';
import CheckCode from './CheckCode';

const {height} = Dimensions.get('window');
const Register = ({navigation}) => {
  const [state, setState] = React.useState({
    name: '',
    password: '',
    gender: '',
    phoneNumber: '',
    district: '',
    passVisible: false,
    isVisible: false,
    email: '',
    code: '',
    checkCode: true,
  });
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading.effects.Account);

  const register = () => {
    const {passVisible, isVisible, ...payload} = state;
    if (!payload.gender)
      return Alert.alert('Information', 'Your Gender is required, try again');
    if (!payload.name)
      return Alert.alert('Information', 'Your Name is required, try again');
    if (!payload.phoneNumber)
      return Alert.alert(
        'Information',
        'Your Phone number is required, try again',
      );
    if (!payload.district)
      return Alert.alert('Information', 'Your District is required, try again');
    if (!payload.password || !payload.password || payload.password.length < 6)
      return Alert.alert(
        'Information',
        'Your password is required and should be atleast 6 characters, try again',
      );

    dispatch.Account.register({
      payload,
      callback: res => {
        // console.log('REgistration code ++++++++', res);
        if (!res.success) return alert(res.result);
        setState({});
        return navigation.navigate('Main', {screen: 'Home'});
      },
    });
  };

  return (
    <View style={{flex: 1}}>
      <BottomSheet
        padded={false}
        isVisible={state.isVisible}
        closeModal={() => setState({...state, isVisible: false})}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: RFValue(10),
            paddingHorizontal: RFValue(10),
            marginBottom: RFValue(15),
          }}>
          <Text style={{fontFamily: 'OpenSans-Bold', fontSize: RFValue(18)}}>
            Select a dropping point
          </Text>
          <Pressable
            onPress={() => setState({...state, isVisible: false})}
            style={{
              height: RFValue(40),
              width: RFValue(40),
              alignItems: 'center',
              backgroundColor: '#eeeeee90',
              justifyContent: 'center',
              borderRadius: 40,
            }}>
            <DesignIcon name="close" color="#000" />
          </Pressable>
        </View>
        <DistrictList
          onPress={district => setState({...state, isVisible: false, district})}
        />
      </BottomSheet>
      {state.checkCode ? (
        <CheckCode
          code={state.code}
          setCode={code => setState({...state, code})}
          setReg={() => setState({...state, checkCode: false})}
        />
      ) : (
        <KeyboardAwareScrollView
          style={{
            flex: 1,
            paddingTop: RFValue(30),
            paddingHorizontal: RFValue(10),
          }}
          keyboardShouldPersistTaps="handled">
          {/* <Logo fSize={20} /> */}
          <Text
            style={{
              marginVertical: RFValue(20),
              fontSize: RFValue(14),
              fontFamily: 'OpenSans-Regular',
            }}>
            Please ensure to fill in all the fields below for easy verification
            of your account.
          </Text>
          <Input
            value={state.name}
            onChangeText={name => setState({...state, name})}
            placeholder="Full name e.g Mukasa Joseph"
          />

          <SelectField
            onPress={() => setState({...state, isVisible: true})}
            value={state.district}
            placeholder="Select your drop point"
          />

          <GenderSelector
            activeGender={state.gender}
            setActiveGender={gender => setState({...state, gender})}
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
              marginBottom: RFValue(10),
            }}
            value={state.phoneNumber}
            placeholder="Phone number e.g 07xx-xxx-xxx"
            maxLength={12}
            onChangeText={(masked, unmasked, obfuscated) =>
              setState({...state, phoneNumber: unmasked})
            }
            mask={[
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              '-',
              /\d/,
              /\d/,
              /\d/,
              '-',
              /\d/,
              /\d/,
              /\d/,
            ]}
          />

          <Password
            placeholder="Password"
            onChangeText={password => setState({...state, password})}
            value={state.password}
            passVisible={state.passVisible}
            togglePassword={() =>
              setState({...state, passVisible: !state.passVisible})
            }
          />

          {/* <Button title="Login" onPress={() => navigate('Main', { screen: 'Home' })} /> */}
          <Button
            title="Register"
            onPress={register}
            loading={loading.register}
          />
          {/* </View> */}
          <View
            style={{
              marginVertical: RFValue(15),
              paddingVertical: RFValue(15),
              width: '100%',
              borderColor: '#ddd',
              borderTopWidth: 1,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text
              style={{fontSize: RFValue(14), fontFamily: 'OpenSans-Regular'}}>
              Already Registered ?
            </Text>
            <Pressable onPress={() => navigation.goBack()}>
              <Text
                style={{
                  fontSize: RFValue(14),
                  color: 'blue',
                  marginLeft: RFValue(10),
                  fontFamily: 'OpenSans-Bold',
                }}>
                Login
              </Text>
            </Pressable>
          </View>

          <Button
            title="change Registration Code"
            extStyles={{backgroundColor: 'orange'}}
            onPress={() => setState({...state, checkCode: true})}
          />
        </KeyboardAwareScrollView>
      )}
    </View>
  );
};

export default Register;
