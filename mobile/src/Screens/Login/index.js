import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Button } from '../../Components';

const Login = ({ navigation: { navigate } }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is the Login screen</Text>
      <Button title="Login" onPress={() => navigate('Main', { screen: 'Home' })} />
    </View>
  );
};

export default Login;
