import React from 'react';
import { View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const Logo = ({ fSize = 25 }) => {
  return (
    <View style={{ alignSelf: 'center', flexDirection: 'row', width: '100%' }}>
      <Text style={{ fontSize: RFValue(fSize), color: 'black', fontFamily: '`openSans-Bold' }}>PLASTIC</Text>
      <Text
        style={{ fontSize: RFValue(fSize), color: 'orange', fontFamily: '`openSans-Bold', marginLeft: RFValue(10) }}
      >
        COLLECTOR
      </Text>
    </View>
  );
};

export default Logo;
