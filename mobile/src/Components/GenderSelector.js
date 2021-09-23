import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { DesignIcon } from '.';

const GenderSelector = ({ activeGender, setActiveGender }) => {
  return (
    <View
      style={{
        width: '100%',
        height: RFValue(40),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: RFValue(10)
      }}
    >
      {[ 'male', 'female' ].map((gender, index) => {
        const sameGender = activeGender === gender;
        return (
          <Pressable
            key={index + Math.random().toString().slice(2)}
            onPress={() => (sameGender ? setActiveGender('') : setActiveGender(gender))}
            style={{
              backgroundColor: '#89c2d980',
              width: '49%',
              height: RFValue(40),
              marginBottom: RFValue(10),
              paddingHorizontal: RFValue(10),
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <DesignIcon
              name={sameGender ? 'checkbox-marked' : 'checkbox-blank-outline'}
              pkg="mc"
              size={20}
              color={sameGender ? '#000' : '#00000080'}
            />
            <Text
              style={{
                fontSize: RFValue(14),
                textTransform: 'capitalize',
                marginLeft: RFValue(10),
                color: sameGender ? '#000' : '#00000080'
              }}
            >
              {gender}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default GenderSelector;
