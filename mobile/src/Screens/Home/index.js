import React from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RFValue } from 'react-native-responsive-fontsize';

const Home = () => {
  // const state = useSelector((state) => state);
  const [ state, setState ] = React.useState({ nextPage: 1, limit: 10, total: 0, district: 'kampala' });
  const dispatch = useDispatch();
  // console.log('Satte', state);

  React.useEffect(() => {
    getCollections();
  }, []);

  const getCollections = () => {
    const { nextPage: page, limit } = state;
    dispatch.Collections.getAllCollections({
      page,
      limit,
      callback: (res) => {
        if (!res.success) return alert(res.result);
        const { nextPage, totalDocuments: total, ...rest } = res;
        // console.log('Result from collections', rest);
        setState({ ...state, nextPage, total });
      }
    });
  };

  const getDistrictCollections = () => {
    const { nextPage: page, limit, district } = state;
    dispatch.Collections.getDistrictCollections({
      district,
      page,
      limit,
      callback: (res) => {
        if (!res.success) return alert(res.result);
        const { nextPage, totalDocuments: total, ...rest } = res;
        // console.log('Result from district collections', res.result);
        setState({ ...state, nextPage, total });
      }
    });
  };

  const getAttendantCollections = () => {
    const { nextPage: page, limit, district } = state;
    dispatch.Collections.getAttendantCollections({
      attendatId: '',
      page,
      limit,
      callback: (res) => {
        if (!res.success) return alert(res.result);
        const { nextPage, totalDocuments: total, ...rest } = res;
        // console.log('Result from district collections', res.result);
        setState({ ...state, nextPage, total });
      }
    });
  };

  const getDropperCollections = () => {
    const { nextPage: page, limit, district } = state;
    dispatch.Collections.getDropperCollections({
      dropperId: '',
      page,
      limit,
      callback: (res) => {
        if (!res.success) return alert(res.result);
        const { nextPage, totalDocuments: total, ...rest } = res;
        // console.log('Result from district collections', res.result);
        setState({ ...state, nextPage, total });
      }
    });
  };

  // Get account of attendant
  const getDropperAccount = () => {
    // const { nextPage: page, limit, district } = state;
    // dispatch.Collections.getDropperCollections({
    //   dropperId: 'xxxxxxxxxxxxx',
    //   callback: (res) => {
    //     if (!res.success) return alert(res.result);
    //     const { nextPage, totalDocuments: total, ...rest } = res;
    //     // console.log('Result from district collections', res.result);
    //     setState({ ...state, nextPage, total });
    //   }
    // });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: RFValue(20) }}>Total collections in all districts</Text>
      <Text style={{ fontSize: RFValue(16), color: '#aaa' }}>{state.total || '0'} - Collections</Text>
    </View>
  );
};

export default Home;
