import React from 'react';
import { View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';

const Account = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Account);
  const { attendantCollections } = useSelector((state) => state.Collections);
  const [ state, setState ] = React.useState({ attendantId: '6138887ea3ffff58389e38e9', nextPage: 1, limit: 10 });

  React.useEffect(() => {
    getAccount();
    getAttendantCollections();
  }, []);

  const getAccount = () => {
    const { attendantId } = state;
    dispatch.Account.getAccount({
      attendantId,
      callback: (res) => {
        if (!res.success) return alert(res.result);
        const { nextPage, totalDocuments: total, ...rest } = res;
        // console.log('Account here', res);
        // setState({ ...state, nextPage, total });
      }
    });
  };

  const getAttendantCollections = () => {
    const { attendantId, nextPage: page, limit } = state;
    dispatch.Collections.getAttendantCollections({
      attendantId,
      page,
      limit,
      callback: (res) => {
        if (!res.success) return alert(res.result);
        // const { nextPage, totalDocuments: total, ...rest } = res;
        // console.log('Account here', res);
        // setState({ ...state, nextPage, total });
      }
    });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: RFValue(20) }}>{user.name}</Text>
      <Text style={{ fontSize: RFValue(16), color: '#aaa' }}>{attendantCollections.length} - Collections</Text>
    </View>
  );
};

export default Account;
