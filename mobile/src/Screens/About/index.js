import React from 'react';
import { View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const About = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: RFValue(20), color: '#aaa' }}>This is the about screen</Text>
    </View>
  );
};

export default About;
