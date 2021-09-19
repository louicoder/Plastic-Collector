import React from 'react';
import { View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const DropperSkeleton = () => {
  return (
    <View>
      {[ 0, 2, 3, 4, 5, 6 ].map(() => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: RFValue(15) }}>
          <View
            style={{
              width: RFValue(50),
              height: RFValue(50),
              borderRadius: 40,
              backgroundColor: '#eee',
              marginRight: RFValue(10),
              // marginBottom: RFValue(15),
              alignItems: 'center',
              // borderWidth: 1,
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
                backgroundColor: '#eee'
              }}
            />
            <View style={{ height: RFValue(15), borderRadius: 20, width: RFValue(250), backgroundColor: '#eee' }} />
          </View>
        </View>
      ))}
    </View>
  );
};

export default DropperSkeleton;
