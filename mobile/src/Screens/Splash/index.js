import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { getAsyncStorage } from '../../Utils/Functions';

const Spalsh = ({ navigation }) => {
  const [ loading, setLoading ] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    checUserLoggedin();
  }, []);

  const checUserLoggedin = async () => {
    await getAsyncStorage('user', ({ success, result }) => {
      console.log('USER--->Splash---->', result);

      if (!success) return navigation.navigate('Login');
      dispatch.Account.setUser(result);
      return navigation.navigate('Main', { screen: 'Home' });
    });
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
        <Text style={{ fontSize: RFValue(25), color: 'black', fontWeight: 'bold' }}>PLASTIC</Text>
        <Text style={{ fontSize: RFValue(25), color: 'orange', fontWeight: 'bold', marginLeft: RFValue(10) }}>
          COLLECTOR
        </Text>
      </View>

      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          alignItems: 'center',
          bottom: RFValue(useSafeAreaInsets().bottom)
        }}
      >
        {loading && <ActivityIndicator size={RFValue(25)} color="#010203" />}
        <Text style={{ fontSize: RFValue(12), marginLeft: RFValue(10) }}>Platic-collector © 2021</Text>
      </View>
    </View>
  );
};

export default Spalsh;
