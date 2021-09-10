import React from 'react';
import { View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';

const Filter = () => {
  const [ state, setState ] = React.useState({ district: 'kampala', nextPage: 1, limit: 10 });
  const { districtCollections, collections } = useSelector((state) => state.Collections);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // getDistrictCollections();
  }, []);

  // Get all collection , this is to be used by default but it' not a must
  const getCollections = () => {
    const { nextPage: page, limit } = state;
    dispatch.Collections.getAllCollections({
      page,
      limit,
      callback: (res) => {
        if (!res.success) return alert(res.result);
        const { nextPage, totalDocuments: total, ...rest } = res;
        setState({ ...state, nextPage, total });
      }
    });
  };

  // get collections by district
  const getDistrictCollections = () => {
    const { nextPage: page, limit, district } = state;
    dispatch.Collections.getDistrictCollections({
      district,
      page,
      limit,
      callback: (res) => {
        if (!res.success) return alert(res.result);
        const { nextPage, totalDocuments: total, ...rest } = res;
        console.log('Result from district collections FILTER', res.result);
        setState({ ...state, nextPage, total });
      }
    });
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: RFValue(20) }}>{state.district} district</Text>
      <Text style={{ fontSize: RFValue(16), color: '#aaa' }}>{collections.length} - Collections</Text>
    </View>
  );
};

export default Filter;
