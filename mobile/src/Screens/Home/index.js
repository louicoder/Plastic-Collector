import React from 'react';
import { View, Text, Dimensions, FlatList, Pressable, ActivityIndicator, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RFValue } from 'react-native-responsive-fontsize';
import { AdminPlaceholder, BottomSheet, CollectionPreview, DesignIcon, DistrictList } from '../../Components';
import CollectionDetails from '../../Components/CollectionDetails';
// import CollectionDetails from '../../Components/CollectionDetails';

const { height } = Dimensions.get('window');
const Home = ({ navigation }) => {
  const { activeCollection, collections } = useSelector((state) => state.Collections);
  const { user } = useSelector((state) => state.Account);
  const loading = useSelector((state) => state.loading.effects.Collections);
  const [ momentum, setMomentum ] = React.useState(false);
  const [ state, setState ] = React.useState({
    nextPage: 1,
    limit: 6,
    total: 0,
    district: 'kampala',
    isVisible: false,
    last: false,
    comp: ''
  });
  const dispatch = useDispatch();

  React.useEffect(() => {
    navigation.setParams({ openFilterModal: () => setState({ ...state, isVisible: true, comp: 'districts' }) });
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

  // const getDistrictCollections = () => {
  //   const { nextPage: page, limit, district } = state;
  //   dispatch.Collections.getDistrictCollections({
  //     district,
  //     page,
  //     limit,
  //     callback: (res) => {
  //       if (!res.success) return alert(res.result);
  //       const { nextPage, totalDocuments: total, ...rest } = res;
  //       // console.log('Result from district collections', res.result);
  //       setState({ ...state, nextPage, total });
  //     }
  //   });
  // };

  // const getAttendantCollections = () => {
  //   const { nextPage: page, limit, district } = state;
  //   dispatch.Collections.getAttendantCollections({
  //     attendatId: '',
  //     page,
  //     limit,
  //     callback: (res) => {
  //       if (!res.success) return alert(res.result);
  //       const { nextPage, totalDocuments: total, ...rest } = res;
  //       // console.log('Result from district collections', res.result);
  //       setState({ ...state, nextPage, total });
  //     }
  //   });
  // };

  // const getDropperCollections = () => {
  //   const { nextPage: page, limit, district } = state;
  //   dispatch.Collections.getDropperCollections({
  //     dropperId: '',
  //     page,
  //     limit,
  //     callback: (res) => {
  //       if (!res.success) return alert(res.result);
  //       const { nextPage, totalDocuments: total, ...rest } = res;
  //       // console.log('Result from district collections', res.result);
  //       setState({ ...state, nextPage, total });
  //     }
  //   });
  // };

  const RenderModalcontent = ({ comp, navigation }) => {
    switch (comp) {
      case 'districts':
        return (
          <DistrictList
            onPress={(district) => {
              console.log('District', district);
              dispatch.Collections.setHomeDistrictName(district);
              navigation.navigate('District', { screen: 'DistrictCollections', params: { district } });
            }}
          />
        );
      case 'collection':
        return <CollectionDetails {...activeCollection} showDropperContact />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <ImageBackground
        source={require('../../assets/images/wallpaper4.png')}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: RFValue(0) }}
      > */}
      <BottomSheet
        padded={false}
        isVisible={state.isVisible}
        closeModal={() => setState({ ...state, isVisible: false })}
      >
        <View style={{ maxHeight: 0.9 * height, width: '100%' }}>
          {/* <CollectionDetails {...activeCollection} showDropperContact /> */}
          <RenderModalcontent comp={state.comp} navigation={navigation} />
        </View>
      </BottomSheet>

      {user && user.admin ? (
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
          renderItem={({ item, index }) => (
            <CollectionPreview
              last={collections && collections.length === index + 1}
              {...item}
              onPress={() => {
                dispatch.Collections.setActiveCollection(item);
                setState({ ...state, isVisible: true, comp: 'collection' });
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
      ) : (
        <AdminPlaceholder />
      )}
    </View>
  );
};

export default Home;
