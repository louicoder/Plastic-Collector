import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { DesignIcon } from '../../Components';
import { MEASUREMENTS } from '../../Utils/Constants';

const Measurements = ({ onPress }) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={{ flexGrow: 1 }}
      keyExtractor={() => Math.random().toString(36).slice(2)}
      data={MEASUREMENTS}
      renderItem={({ item: { label, value }, index }) => (
        <Pressable
          onPress={() => onPress(value)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#eeeeee90',
            marginBottom: RFValue(5),
            padding: RFValue(10),
            borderRadius: 5
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
              <DesignIcon name="user" color="#aaa" />
            </View>
            <Text style={{ fontFamily: 'opensans-regular', fontSize: RFValue(16) }}>{label}</Text>
          </View>
          <DesignIcon name="chevron-right" pkg="mc" color="#aaa" />
        </Pressable>
      )}
    />
  );
};

export default Measurements;
