import React from 'react';
import { View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DesignIcon = ({ name, color = '#000', size = 25, extStyles, onPress }) => {
  return <Icon name={name} color={color} size={RFValue(size)} style={{ ...extStyles }} onPress={onPress} />;
};

export default DesignIcon;
