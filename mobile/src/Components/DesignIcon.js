import React from 'react';
import { View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/AntDesign';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

const DesignIcon = ({ name, color = '#000', size = 25, extStyles, onPress, pkg = 'ad' }) => {
  const RenderIcon = () => {
    switch (pkd) {
      case 'ad':
        return <Icon name={name} color={color} size={RFValue(size)} style={{ ...extStyles }} onPress={onPress} />;
      case 'mc':
        return <Icon name={name} color={color} size={RFValue(size)} style={{ ...extStyles }} onPress={onPress} />;
    }
  };
  return pkg === 'ad' ? (
    <Icon name={name} color={'green'} size={RFValue(size)} style={{ ...extStyles }} onPress={onPress} />
  ) : (
    <IconM name={name} color={color} size={RFValue(size)} style={{ ...extStyles }} onPress={onPress} />
  );
};

export default DesignIcon;
