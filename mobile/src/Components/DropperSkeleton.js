import React from 'react';
import { View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const DropperSkeleton = () => {
  return (
    <View>
      {[ ...new Array(5).fill() ].map(() => (
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: RFValue(15) }}
          key={Math.random().toString(36).slice(2)}
        >
          <View
            style={{
              width: RFValue(45),
              height: RFValue(45),
              borderRadius: 45,
              backgroundColor: '#eeeeee90',
              marginRight: RFValue(10),
              alignItems: 'center',
              flexDirection: 'row'
            }}
          />
          <View style={{}}>
            <View
              style={{
                height: RFValue(15),
                borderRadius: 20,
                marginBottom: RFValue(5),
                width: RFValue(150),
                backgroundColor: '#eeeeee90'
              }}
            />
            <View
              style={{ height: RFValue(15), borderRadius: 20, width: RFValue(250), backgroundColor: '#eeeeee90' }}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default DropperSkeleton;
