import React from 'react';
import { View, Text, Pressable, Alert, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { DesignIcon } from '../../Components';
import { removeAsyncStorage } from '../../Utils/Functions';

const Profile = () => {
  const { user, statistics } = useSelector((state) => state.Account);
  const [ loader, setLoader ] = React.useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  React.useEffect(
    () => {
      getAttendantStatistics();
    },
    [ navigation ]
  );

  const getAttendantStatistics = () => {
    dispatch.Account.getAttendantStatistics({
      attendantId: user._id,
      callback: ({ result, success }) => {
        if (!success) return Alert.alert('Something went wrong', result);
      }
    });
  };

  const totalPackages =
    statistics.collections && statistics.collections.reduce((p, c) => p + parseInt(c.totalCollection), 0);
  const totalWeight = statistics.collections && statistics.collections.reduce((p, c) => p + parseInt(c.totalweight), 0);

  const logout = async () => {
    setLoader(true);
    await removeAsyncStorage('user', (res) => {
      setLoader(false);
      if (!res.success) return Alert.alert('Something went wrong', res.result);
      dispatch.Account.setUser({});
      dispatch.Account.setStatistics({ collections: [], droppers: [] });
      dispatch.Collections.setDistrictCollections([]);
      dispatch.Droppers.setAttendantDroppers([]);
      navigation.navigate('Login');
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#eeeeee70', width: '100%' }}>
      <View
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          width: '100%',
          paddingVertical: RFValue(15)
        }}
      >
        <Pressable
          style={{
            width: RFValue(100),
            height: RFValue(100),
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#eee'
          }}
        >
          <DesignIcon name="user" size={50} color="#aaa" />
        </Pressable>
        <Text style={{color: 'green', fontFamily: 'OpenSans-Bold', fontSize: RFValue(18), marginTop: RFValue(10) }}>{user.name}</Text>
        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: RFValue(16), color: '#000' }}>{user.phoneNumber}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginVertical: RFValue(10),
          justifyContent: 'space-between'
        }}
      >
        {[
          { title: 'Total Collections', stat: statistics.collections && statistics.collections.length },
          { title: 'Total Droppers', stat: statistics.droppers && statistics.droppers.length },
          { title: 'Total Packages', stat: totalPackages },
          { title: 'Total Weight', stat: totalWeight }
        ].map(({ title, stat }, index) => (
          <View
            key={index}
            style={{
              width: '50%',
              alignItems: 'center',
              backgroundColor: '#fff',
              marginBottom: RFValue(0),
              borderRightWidth: index % 2 !== 1 ? RFValue(1) : 0,
              borderTopWidth: index > 1 ? RFValue(1) : 0,
              // borderRightWidth: index === 0 ? RFValue(5) : 0,
              borderColor: '#ddd',
              paddingVertical: RFValue(15),color: 'green',
            }}
          >
            <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: RFValue(16), color: '#aaa' }}>{title}</Text>
            <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: RFValue(30) }}>{stat}</Text>
          </View>
        ))}
      </View>

      <Pressable
        onPress={logout}
        style={{
          // marginVertical: RFValue(10),
          flexDirection: 'row',
          paddingHorizontal: RFValue(10),
          height: RFValue(60),
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <DesignIcon name="lock" size={28} />
          <Text style={{color: 'green', fontFamily: 'OpenSans-Regular', fontSize: RFValue(16), marginLeft: RFValue(10) }}>
            Logout of your account
          </Text>
        </View>
        {loader ? <ActivityIndicator size={25} /> : <DesignIcon name="chevron-right" pkg="mc" size={28} color="#aaa" />}
      </Pressable>
    </View>
  );
};

export default Profile;
