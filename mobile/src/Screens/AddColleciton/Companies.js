import React from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { DesignIcon } from '../../Components';
import { COMPANIES } from '../../Utils/Constants';

const { height } = Dimensions.get('window');
const Companies = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { payload } = useSelector((state) => state.Collections);

  return (
    <View style={{ height: 0.8 * height }}>
      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={() => Math.random().toString(36).slice(2)}
        data={COMPANIES}
        renderItem={({ item: company, index }) => (
          <Pressable
            // onPress={() => onPress(item)}
            onPress={() => {
              dispatch.Collections.setPayload({ ...payload, company });
              closeModal();
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#eeeeee90',
              marginBottom: RFValue(5),
              padding: RFValue(10),
              borderRadius: 5,
              marginBottom: index + 1 === COMPANIES.length ? RFValue(30) : RFValue(10)
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
              <Text style={{ fontFamily: 'opensans-regular', fontSize: RFValue(16), textTransform: 'capitalize' }}>
                {company}
              </Text>
            </View>
            <DesignIcon
              name={payload.company === company ? 'check' : 'chevron-right'}
              pkg="mc"
              color={payload.company === company ? '#000' : '#aaa'}
            />
          </Pressable>
        )}
      />
    </View>
  );
};

export default Companies;
