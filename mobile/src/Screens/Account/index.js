import React from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import Profile from './Profile';

const Account = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Account);
  const { attendantCollections } = useSelector((state) => state.Collections);
  const [ state, setState ] = React.useState({ nextPage: 1, limit: 10 });

  return (
    <View style={{ flex: 1, backgroundColor: '#eee' }}>
      {user.name ? (
        <ScrollView style={{ flexGrow: 1 }}>
          <Profile />
        </ScrollView>
      ) : (
        <View>
          <Text>Login to continue</Text>
        </View>
      )}
    </View>
  );
};

export default Account;
