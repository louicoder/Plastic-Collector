import React from 'react';
import { View, Text, Dimensions, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RFValue } from 'react-native-responsive-fontsize';
import { BottomSheet, CollectionPreview, DesignIcon, DistrictList } from '../../Components';
// import CollectionDetails from '../../Components/CollectionDetails';

const { height } = Dimensions.get('window');
const Home = ({ navigation }) => {
  const { activeCollection, collections } = useSelector((state) => state.Collections);
  const loading = useSelector((state) => state.loading.effects.Collections);
  const [ momentum, setMomentum ] = React.useState(false);
  const [ state, setState ] = React.useState({
    nextPage: 1,
    limit: 6,
    total: 0,
    district: 'kampala',
    isVisible: false,
    last: false
  });
  const dispatch = useDispatch();

  React.useEffect(() => {
    navigation.setParams({ openFilterModal: () => setState({ ...state, isVisible: true }) });
    getCollections();
  }, []);

  const getCollections = () => {
    const { nextPage: page, limit } = state;
    dispatch.Collections.getAllCollections({
      page,
      limit,
      callback: (res) => {
        // console.log('Got collections', res);
        if (!res.success) return alert(res.result);
        const { totalDocuments: total, ...rest } = res;
        setState({ ...state, ...rest, total });
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
    <View style={{ flex: 1, paddingHorizontal: RFValue(0) }}>
      <BottomSheet
        padded={false}
        isVisible={state.isVisible}
        closeModal={() => setState({ ...state, isVisible: false })}
      >
        <View style={{ maxHeight: 0.9 * height, width: '100%' }}>
          <View
            style={{
              padding: RFValue(10),
              paddingBottom: RFValue(15),
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between'
            }}
          >
            <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: RFValue(18) }}>Select a district to filter</Text>
            <Pressable
              onPress={() => setState({ ...state, isVisible: false })}
              style={{
                width: RFValue(40),
                height: RFValue(40),
                borderRadius: 30,
                backgroundColor: '#eeeeee90',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <DesignIcon name="close" color="#000" />
            </Pressable>
          </View>
          <DistrictList
            onPress={(district) => {
              setState({ ...state, isVisible: false });
              navigation.navigate('District', { screen: 'DistrictCollections', params: { district } });
            }}
          />
        </View>
      </BottomSheet>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        data={collections}
        keyExtractor={() => Math.random().toString(36).slice(2)}
        ListFooterComponent={() =>
          loading.getAllCollections && (
            <View style={{ height: RFValue(50), backgroundColor: '#fff' }}>
              <ActivityIndicator style={{ alignSelf: 'center', top: RFValue(10) }} color="#000" />
            </View>
          )}
        renderItem={({ item }) => (
          <CollectionPreview
            {...item}
            onPress={() => {
              dispatch.Collections.setActiveCollection(item);
              setState({ ...state, isVisible: true });
            }}
          />
        )}
        onEndReached={() => {
          if (!state.last && !momentum) {
            setMomentum(true);
            return getCollections();
          }
        }}
        onEndReachedThreshold={0.01}
        onMomentumScrollBegin={() => setMomentum(false)}
      />
    </View>
  );
};

export default Home;
