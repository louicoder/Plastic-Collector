import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from './Styles';

const Input = ({
  value,
  callback,
  title,
  extInputStyles,
  onChangeText,
  error,
  loading,
  placeholder,
  kbt = 'default',
  togglePassword,
  passVisible = false
}) => {
  // const [ value, setValue ] = React.useState('');
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    inputRef.current.setNativeProps({
      style: {
        // fontFamily: 'OpenSans-Regular'
      }
    });
  }, []);

  return (
    <View style={Styles.inputContainer}>
      {title && <Text style={{ fontSize: RFValue(12) }}>{title}</Text>}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          ref={inputRef}
          autoCompleteType="off"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={!passVisible}
          keyboardType={kbt}
          placeholderTextColor={error ? '#ff0000' : '#aaa'}
          placeholder={placeholder}
          style={[ Styles.input(error), { width: '85%', borderRightWidth: error ? 0 : 0 }, extInputStyles ]}
          onChangeText={onChangeText}
          value={value}
          editable={!loading}
        />
        <Pressable onPress={togglePassword} style={Styles.passWordIcon(error)}>
          <Icon name={!passVisible ? 'eye' : 'eye-off'} size={RFValue(25)} color="#000" />
        </Pressable>
      </View>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  );
};

export default Input;
