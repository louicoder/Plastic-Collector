import React from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import Styles from './Styles';

const Input = React.forwardRef((props, ref) => (
  <View style={Styles.inputContainer}>
    {props.title && <Text style={{ fontSize: RFValue(12), textTransform: 'capitalize' }}>{props.title}</Text>}
    <TextInput
      {...props}
      ref={ref}
      onSubmitEditing={props.onSubmitEditing}
      autoCompleteType="off"
      autoCapitalize="none"
      keyboardType={props.kbt}
      placeholderTextColor={props.error ? 'red' : '#aaa'}
      placeholder={props.placeholder}
      style={[ Styles.input(props.error), props.extInputStyles ]}
      onChangeText={props.onChangeText}
      value={props.value}
      editable={!props.loading}
    />
    {props.error && <Text style={{ color: 'red' }}>{props.error}</Text>}
  </View>
));

export default Input;
