import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { DesignIcon } from '.';

const SelectField = ({ iconFaceDown = true, onPress, value, placeholder }) => {
  return (
    <Pressable
      // onPress={() => setState({ ...state, isVisible: true })}
      onPress={onPress}
      style={{
        width: '100%',
        paddingHorizontal: RFValue(10),
        // backgroundColor: '#ddd',
        borderWidth: 1,
        borderColor: '#ddd',
        height: RFValue(40),
        marginBottom: RFValue(10),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <Text
        style={{
          fontSize: RFValue(14),
          color: value ? '#000' : '#aaa',
          textTransform: 'capitalize',
          fontFamily: 'OpenSans-Regular'
        }}
      >
        {value ? value : placeholder}
      </Text>
      <DesignIcon name={iconFaceDown ? 'chevron-down' : 'chevron-up'} pkg="mc" />
    </Pressable>
  );
};

export default SelectField;
