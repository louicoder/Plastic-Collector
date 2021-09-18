import React from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import Styles from './Styles';

const Input = ({
  value,
  callback,
  title,
  extInputStyles,
  error,
  loading,
  placeholder,
  kbt = 'default',
  onChangeText,
  type
}) => {
  // const [ value, setValue ] = React.useState('');
  return (
    <View style={Styles.inputContainer}>
      {title && <Text style={{ fontSize: RFValue(12), textTransform: 'capitalize' }}>{title}</Text>}
      <TextInput
        autoCompleteType="off"
        autoCapitalize="none"
        keyboardType={kbt}
        placeholderTextColor={error ? 'red' : '#aaa'}
        placeholder={placeholder}
        style={[ Styles.input(error), extInputStyles ]}
        onChangeText={onChangeText}
        value={value}
        editable={!loading}
      />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  );
};

export default Input;
