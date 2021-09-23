import React from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';
import { DesignIcon, DropperSkeleton } from '.';
import { DISTRICTS } from '../Utils/Constants';

const DistrictList = ({ onPress }) => {
  const dispatch = useDispatch();
  return (
    <FlatList
      // contentContainerStyle={{ backgroundColor: '#eeeeee70' }}
      showsVerticalScrollIndicator={false}
      data={DISTRICTS}
      keyExtractor={() => Math.random().toString(36).slice(2)}
      renderItem={({ item: d, index }) => (
        <Pressable
          onPress={() => onPress(d)}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: RFValue(60),
            backgroundColor: '#eeeeee70',
            // backgroundColor: '#fff',
            marginBottom: index + 1 === DISTRICTS.length ? RFValue(40) : RFValue(5),
            alignItems: 'center',
            paddingHorizontal: RFValue(10)
          }}
        >
          <View
            style={{
              width: RFValue(30),
              height: RFValue(30),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#000',
              marginRight: RFValue(10),
              borderRadius: 30
            }}
          >
            <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: RFValue(16), color: '#fff' }}>{index + 1}</Text>
          </View>
          <View style={{ flexGrow: 1 }}>
            <Text
              style={{
                fontFamily: 'OpenSans-Regular',
                fontSize: RFValue(16),
                color: '#000',
                textTransform: 'capitalize'
              }}
            >
              {d}
            </Text>
          </View>
          <DesignIcon name="chevron-right" pkg="mc" />
        </Pressable>
      )}
    />
  );
};

export default DistrictList;
