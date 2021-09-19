import React from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaskInput from 'react-native-mask-input';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from '../../Components';
import GenderSelector from '../../Components/GenderSelector';

const RegDropper = ({ setAdddrop }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.effects.Droppers);
  const { activeDropper } = useSelector((state) => state.Droppers);
  const [ state, setState ] = React.useState({
    name: 'Namusoke Joweria',
    phoneNumber: '0755111111',
    gender: 'female'
  });
  const { user } = useSelector((state) => state.Account);

  const registerDropper = () => {
    // const {} = state;
    dispatch.Droppers.registerDropper({
      payload: { ...state, attendantId: user._id, district: user.district },
      callback: ({ success, result }) => {
        // console.log('REgistering dropper', res);
        if (!success) return Alert.alert('Something went wrong', result);
        setState({});
        return setAdddrop();
      }
    });
  };

  console.log('Active Dropper', activeDropper);

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingTop: RFValue(50) }}>
        {/* <Text style={{ marginVertical: RFValue(15), fontSize: RFValue(18), fontWeight: 'bold' }}>
          Register new dropper:
        </Text> */}
        <Text style={{ marginVertical: RFValue(15), fontSize: RFValue(14), fontFamily: 'OpenSans-Regular' }}>
          Enter the information below about the dropper to start collecting their packages.
        </Text>
        <Input
          value={state.name}
          placeholder="Enter full name e.g Mukasa Joseph"
          onChangeText={(name) => setState({ ...state, name })}
        />

        <View
          style={{
            height: RFValue(40),
            backgroundColor: '#eee',
            justifyContent: 'center',
            paddingHorizontal: RFValue(10),
            marginBottom: RFValue(10)
          }}
        >
          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: RFValue(14), color: '#aaa' }}>
            {user.district} district
          </Text>
        </View>

        <MaskInput
          style={{
            height: RFValue(40),
            backgroundColor: '#eee',
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

        <GenderSelector activeGender={state.gender} setActiveGender={(gender) => setState({ ...state, gender })} />

        <Button title="Create Dropper" loading={loading.registerDropper} onPress={registerDropper} />
        <View style={{ borderTopWidth: 1, borderColor: '#eee', paddingTop: RFValue(10), marginTop: RFValue(10) }}>
          <Button
            title="Add Collection"
            onPress={setAdddrop}
            extStyles={{ backgroundColor: 'orange' }}
            txtStyles={{ color: '#fff' }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RegDropper;
