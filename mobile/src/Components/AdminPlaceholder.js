import React from 'react';
import { View, Text, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Password } from '.';

const AdminPlaceholder = ({ onSuccess }) => {
  const [ state, setState ] = React.useState({
    // password: 's3kr3TPlazt1k@#',
    password: '',
    passVisible: false
  });
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.effects.Account);

  const adminAuth = () => {
    const { password } = state;
    if (!password.length) return Alert.alert('Missing field', 'Password is required in order to continue');
    dispatch.Account.adminAuth({
      password,
      callback: ({ result, success }) => {
        if (!success) return Alert.alert('Something went wrong', result);
        // onSuccess();
      }
    });
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: RFValue(10) }}>
      <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: RFValue(14), marginVertical: RFValue(15) }}>
        Enter the admin password inorder to be able to view the contents of this screen.{'\n'}
        If you believe you are an admin please contact the relevant people to provide you access.
      </Text>
      <Password
        value={state.password}
        onChangeText={(password) => setState({ ...state, password })}
        placeholder="Enter admin password"
        passVisible={!state.passVisible}
        togglePassword={() => setState({ ...state, passVisible: !state.passVisible })}
      />
      <Button title="Authorize" onPress={adminAuth} loading={loading.adminAuth} />
    </View>
  );
};

export default AdminPlaceholder;
