import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { MEASUREMENTS } from '../Utils/Constants';
import { DesignIcon } from '../Components';

const CompanyPreview = ({ onPress, len, company }) => {
  return (
    <Pressable
      // onPress={() => onPress(item)}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#eeeeee90',
        marginBottom: RFValue(5),
        padding: RFValue(10),
        borderRadius: 5,
        marginBottom: len ? RFValue(30) : RFValue(10)
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: RFValue(40),
            height: RFValue(40),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#dddddd90',
            marginRight: RFValue(10),
            borderRadius: 40
          }}
        >
          <DesignIcon name="user" color="#000" />
        </View>
        <View>
          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: RFValue(18), textTransform: 'capitalize' }}>
            {company}
          </Text>
          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: RFValue(11), color: '#aaa' }}>
            {MEASUREMENTS.map((m) => m.value).join('・')}
          </Text>
        </View>
      </View>
      <DesignIcon name="chevron-right" pkg="mc" color="#000" />
    </Pressable>
  );
};

export default CompanyPreview;
