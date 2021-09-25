import React from 'react';
import { View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const Logo = ({ fSize = 25 }) => {
  return (
    <View style={{ alignSelf: 'center', flexDirection: 'row', width: '100%', marginTop:120,  }}>
      <Text style={{ fontSize: RFValue(fSize), color: '#FFFFFF', fontFamily: 'OpenSans-Bold' }}>PLASTIC</Text>
      <Text style={{ fontSize: RFValue(fSize), color: '#008037', fontFamily: 'OpenSans-Bold', marginLeft: RFValue(10) }}>
        COLLECTOR
      </Text>
    </View>
  );
};

export default Logo;
