import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { DesignIcon } from '.';
import moment from 'moment';
import { useDispatch } from 'react-redux';

const DropperPreview = ({ onPress, leftIcon = true, dateCreated, gender, name, district, closeModal }) => {
  // const dispatch = useDispatch();
  return (
    <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginBottom: RFValue(20) }} onPress={onPress}>
      <View style={{ flexGrow: 1, flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: RFValue(40),
            height: RFValue(40),
            borderRadius: 50,
            backgroundColor: '#eee',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: RFValue(15)
          }}
        >
          <DesignIcon pkg="ad" name="user" color="#aaa" />
        </View>
        <View>
          <Text style={{ fontSize: RFValue(14), fontFamily: 'OpenSans-bold' }}>{name}</Text>
          <Text style={{ fontSize: RFValue(12), color: '#aaa', fontFamily: 'OpenSans-Regular' }}>
            {gender}・{moment(dateCreated).fromNow()}・{district}
          </Text>
        </View>
      </View>

      {leftIcon && <DesignIcon name="chevron-right" pkg="mc" color="#aaa" />}
    </Pressable>
  );
};

export default DropperPreview;
