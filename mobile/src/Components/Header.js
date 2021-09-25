import React from 'react';
import { View, Text, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KEY } from '../Utils/Functions';
import DesignIcon from './DesignIcon';

const Header = ({ title, onBackPress, leftIcons, showback = true, extStyles, navigation, titleStyles, ...rest }) => {
  // console.log('HEADER REST', rest.options);
  return (
    <View
      style={{
        height: RFValue(60),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: useSafeAreaInsets().top,
        borderBottomWidth: 1,
        borderColor: '#eeeeee90',
        justifyContent: 'space-between',
        paddingHorizontal: RFValue(10),
        ...extStyles
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {showback && (
          <DesignIcon
            name={Platform.select({ ios: 'chevron-left', android: 'arrowleft' })}
            onPress={() => navigation.goBack()}
            extStyles={{ marginRight: RFValue(10) }}
            pkg={Platform.OS === 'ios' ? 'mc' : 'ad'}
            size={25}
          />
        )}
      </View>

      <View style={{ flexGrow: 1, borderColor: 'red', ...titleStyles }}>
        {title && (
          <Text style={{ fontSize: RFValue(20), fontFamily: 'OpenSans-Bold', textTransform: 'capitalize' }}>
            {title}
          </Text>
        )}
      </View>

      <View style={{ flexDirection: 'row', height: RFValue(50), alignItems: 'center' }}>
        {typeof leftIcons === 'object' &&
          leftIcons.length &&
          leftIcons.map((props, index) => (
            <DesignIcon
              key={KEY()}
              extStyles={{ marginLeft: leftIcons.length !== index + 1 ? 0 : RFValue(15) }}
              {...props}
            />
          ))}
      </View>
    </View>
  );
};

export default Header;
