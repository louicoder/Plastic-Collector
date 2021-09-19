import React from 'react';
import { View, Text, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import Profile from './Profile';

const Account = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Account);
  const { attendantCollections } = useSelector((state) => state.Collections);
  const [ state, setState ] = React.useState({ nextPage: 1, limit: 10 });

  React.useEffect(
    () => {
      // getAccount();
      const sub = navigation.addListener('focus', () => getAttendantStatistics());

      return () => sub;
    },
    [ navigation ]
  );

  const getAttendantStatistics = () => {
    // const { attendantId, nextPage: page, limit } = state;
    dispatch.Account.getAttendantStatistics({
      attendantId: user._id,
      callback: ({ result, success }) => {
        // console.log('collections', );
        if (!success) return Alert.alert('Something went wrong', result);
      }
    });
  };

  const logout = () => {
    // dispatch.Account.set;
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {user.name ? (
        <Profile />
      ) : (
        <View>
          <Text>Login to continue</Text>
        </View>
      )}
    </View>
  );
};

export default Account;
