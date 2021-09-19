import moment from 'moment';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { DesignIcon } from '.';

const CollectionPreview = ({ onPress, totalweight, totalCollection, dateCreated, typesBreakdown, ...rest }) => {
  const caption = typesBreakdown.reduce((p, c) => [ ...p, `${c.company} - ${c.measurement} - ${c.total}` ], []);
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: RFValue(80),
        width: '100%',
        // borderWidth: 1,
        // borderColor: '#eee',
        padding: RFValue(10),
        // justifyContent: 'space-between',
        backgroundColor: '#eeeeee90',
        marginBottom: RFValue(10)
      }}
    >
      <View
        style={{
          height: RFValue(40),
          width: RFValue(40),
          borderRadius: 50,
          backgroundColor: '#bbdefb',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: RFValue(10)
        }}
      >
        <Ionicon name="archive-outline" size={RFValue(25)} color="#000" />
      </View>
      <View style={{ flexWrap: 'wrap', width: '77%' }}>
        <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: RFValue(16) }}>
          {totalweight} kgs ・ {totalCollection} bottles
        </Text>
        <View style={{ width: '100%' }}>
          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: RFValue(14) }}>{caption.join(', ')}</Text>
        </View>
        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: RFValue(12), color: '#aaa' }}>
          {moment(dateCreated).fromNow()}
        </Text>
      </View>
      <View style={{ width: RFValue(30) }}>
        <DesignIcon name="chevron-right" pkg="mc" />
      </View>
    </Pressable>
  );
};

export default CollectionPreview;
