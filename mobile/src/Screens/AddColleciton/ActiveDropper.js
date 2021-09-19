import moment from 'moment';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { DesignIcon } from '../../Components';

const ActiveDropper = ({ showDroppers }) => {
  const { activeDropper } = useSelector((state) => state.Droppers);
  const dispatch = useDispatch();

  return (
    <View
      style={{
        marginBottom: RFValue(0),
        borderWidth: 1,
        borderColor: '#bbdefb',
        paddingHorizontal: RFValue(10),
        height: RFValue(60),
        borderRadius: 5,
        justifyContent: 'center'
      }}
    >
      {activeDropper.name ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                height: RFValue(40),
                width: RFValue(40),
                borderRadius: 40,
                backgroundColor: '#bbdefb',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: RFValue(10)
              }}
            >
              <DesignIcon name="user" color="#000" />
            </View>
            <View>
              <Text style={{ fontFamily: 'opensans-bold', textTransform: 'capitalize', fontSize: RFValue(15) }}>
                {activeDropper.name}
              </Text>
              <Text style={{ fontFamily: 'opensans-regular', color: '#0353a4' }}>
                {activeDropper.gender} ・ Added {moment(activeDropper.dateCreated).fromNow()}
              </Text>
            </View>
          </View>

          <Pressable
            onPress={() => {
              dispatch.Droppers.setActiveDropper({});
              showDroppers('finish');
            }}
            style={{ height: RFValue(30), width: RFValue(30), alignItems: 'center', justifyContent: 'center' }}
          >
            <DesignIcon name="close" color="#000" />
          </Pressable>
        </View>
      ) : (
        <Pressable style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }} onPress={showDroppers}>
          <DesignIcon name="adduser" />
          <Text style={{ fontSize: RFValue(16), marginLeft: RFValue(10) }}>Tap here to add dropper</Text>
        </Pressable>
      )}
    </View>
  );
};

export default ActiveDropper;
