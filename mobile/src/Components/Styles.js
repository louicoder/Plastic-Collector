import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  passWordIcon: (error) => ({
    borderWidth: error ? 1 : 0,
    // borderColor: error ? 'red' : 'transparent',
    // borderLeftWidth: 0,
    // borderLeftWidth: 1,
    borderLeftColor: '#ddd',
    width: '15%',
    // backgroundColor: '#eee',
    height: RFValue(40),
    alignItems: 'center',
    justifyContent: 'center'
  }),
  input: (error) => ({
    height: RFValue(40),
    fontSize: RFValue(14),
    borderColor: '#ddd',
    // backgroundColor: '#eee',
    // borderWidth: error ? 1 : 0,
    // borderColor: error ? 'red' : 'transparent',
    // marginBottom: RFValue(5),
    paddingHorizontal: RFValue(10),
    color: '#010203',
    borderWidth: 1,
    fontFamily: 'OpenSans-Regular'
  }),
  inputContainer: {
    width: '100%',
    marginBottom: RFValue(10)
    // zIndex: -10
  }
});
