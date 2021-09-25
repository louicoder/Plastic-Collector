import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { DesignIcon } from '.';

const PackagePreview = ({ index, rightIcon = true, rightIconPress, extStyles, ...pckg }) => {
  const dispatch = useDispatch();
  const { payload } = useSelector((state) => state.Collections);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: RFValue(10),
        // backgroundColor: '#d8f3dc',
        // backgroundColor: '#eeeeee50',
        borderColor: '#eeeeee90',
        borderTopWidth: index === 0 ? 1 : 0,
        borderBottomWidth: 1,
        // marginBottom: RFValue(5),
        ...extStyles
      }}
    >
      <View
        style={{
          width: RFValue(40),
          height: RFValue(40),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          // backgroundColor: '#d8f3dc',

          borderRadius: 50,
          marginRight: RFValue(10)
        }}
      >
        <Text style={{ fontSize: RFValue(20), color: '#fff' }}>{index + 1}</Text>
      </View>
      <View style={{ flexGrow: 1 }}>
        <Text
          style={{
            fontFamily: 'OpenSans-Bold',
            fontSize: RFValue(16),
            textTransform: 'capitalize',
            color: '#3e1f47'
          }}
        >
          {pckg.company}
        </Text>
        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: RFValue(14), color: '#000' }}>
          {pckg.total} bottles <Text style={{ color: '#000' }}> -●- </Text> {pckg.measurement}
        </Text>
      </View>
      {rightIcon && (
        <Pressable
          onPress={() =>
            rightIconPress
              ? rightIconPress()
              : dispatch.Collections.setPayload({
                  ...payload,
                  typesBreakdown: payload.typesBreakdown && [
                    ...payload.typesBreakdown.filter((x) => x.id !== pckg.id)
                  ]
                })}
        >
          <DesignIcon name="close" />
        </Pressable>
      )}
    </View>
  );
};

export default PackagePreview;
