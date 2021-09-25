import moment from 'moment';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { DesignIcon } from '.';

const CollectionPreview = ({
  onPress,
  totalweight,
  totalCollection,
  dateCreated,
  typesBreakdown,
  extStyles,
  ...rest
}) => {
  const caption =
    typesBreakdown && typesBreakdown.reduce((p, c) => [ ...p, `${c.company} - ${c.measurement} - ${c.total}` ], []);

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: RFValue(80),
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#eeeeee90',
        padding: RFValue(10),
        justifyContent: 'space-between',
        // backgroundColor: '#eeeeee90',
        marginBottom: RFValue(5),
        ...extStyles
      }}
    >
      <View
        style={{
          height: RFValue(50),
          width: RFValue(50),
          borderRadius: 50,
          backgroundColor: '#bbdefb',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: RFValue(10)
          // alignSelf: 'flex-start'
        }}
      >
        <Ionicon name="archive-outline" size={RFValue(25)} color="#000" />
      </View>
      <View style={{ width: '70%' }}>
        <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: RFValue(16) }}>
          {totalweight} kgs ・ {totalCollection} bottles
        </Text>
        <View style={{ width: '100%' }}>
          <Text numberOfLines={1} style={{ fontFamily: 'OpenSans-Regular', fontSize: RFValue(12), color: 'green' }}>
            {caption && caption.join(', ')}
          </Text>
        </View>
        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: RFValue(10), color: '#aaa' }}>
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
