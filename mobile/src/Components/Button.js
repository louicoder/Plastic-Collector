import React from 'react';
import { Text, Pressable, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const Button = ({ onPress, extStyles, txtStyles, title, color = '#fff', loading = false }) => {
  return (
    <Pressable
      style={{
        width: '100%',
        height: RFValue(40),
        backgroundColor: loading ? '#ddd' : '#010203',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: RFValue(10),
        ...extStyles
      }}
      onPress={onPress}
    >
      {loading && <ActivityIndicator size={RFValue(16)} color={color} style={{ marginRight: RFValue(10) }} />}
      <Text style={{ color, fontSize: RFValue(14), fontFamily: 'OpenSans-Bold', ...txtStyles }}>{title}</Text>
    </Pressable>
  );
};

export default Button;
