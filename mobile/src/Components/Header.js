import React from 'react';
import { View, Text, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DesignIcon from './DesignIcon';

const Header = ({ title, onBackPress, leftIcons, showback = true, extStyles }) => {
  return (
    <View
      style={{
        height: RFValue(50),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: useSafeAreaInsets().top,
        // borderWidth: 1,
        justifyContent: 'space-between',
        paddingHorizontal: RFValue(10),
        ...extStyles
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {showback && (
          <DesignIcon
            name={Platform.select({ ios: 'arrow-left', android: 'chevron-left' })}
            onPress={onBackPress}
            extStyles={{ marginRight: RFValue(10) }}
          />
        )}
        {title && <Text style={{ fontSize: RFValue(18), fontWeight: 'bold' }}>{title}</Text>}
      </View>

      <View style={{ flexDirection: 'row', height: RFValue(50), alignItems: 'center' }}>
        {typeof leftIcons === 'object' &&
          leftIcons.length &&
          leftIcons.map((props, index) => (
            <DesignIcon {...props} extStyles={{ marginLeft: leftIcons.length !== index + 1 ? 0 : RFValue(10) }} />
          ))}
      </View>
    </View>
  );
};

export default Header;
