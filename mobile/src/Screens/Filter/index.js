import React from 'react';
import { View, Text, Alert, Dimensions, ActivityIndicator, ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { AdminPlaceholder, BottomSheet, CollectionPreview, DesignIcon } from '../../Components';
import Ionicon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import CollectionDetails from '../../Components/CollectionDetails';

const { height } = Dimensions.get('window');
const Filter = ({ navigation }) => {
  const [ state, setState ] = React.useState({
    district: 'kampala',
    nextPage: 1,
    limit: 6,
    isVisible: false,
    last: false
  });
  const loading = useSelector((state) => state.loading.effects.Collections);

  const { districtCollections, collections, activeCollection } = useSelector((state) => state.Collections);
  const { user } = useSelector((state) => state.Account);
  const dispatch = useDispatch();
  const [ momentum, setMomentum ] = React.useState(false);

  React.useEffect(
    () => {
      const sub = navigation.addListener('focus', () => getDistrictCollections());
      return () => sub;
    },
    [ navigation ]
  );

  // Get all collection , this is to be used by default but it' not a must
  // const getCollections = () => {
  //   const { nextPage: page, limit } = state;
  //   dispatch.Collections.getAllCollections({
  //     page,
  //     limit,
  //     callback: (res) => {
  //       if (!res.success) return alert(res.result);
  //       const { totalDocuments: total, ...rest } = res;
  //       setState({ ...state, ...rest, total });
  //     }
  //   });
  // };

  // get collections by district
  const getDistrictCollections = () => {
    const { nextPage: page, limit } = state;
    dispatch.Collections.getDistrictCollections({
      page,
      limit,
      district: user.district,
      callback: ({ result, success, ...rest }) => {
        // console.log('Distcct filter----->>><<<<<', result);
        if (!success) return Alert.alert('Something went wrong', result);
        const { totalDocuments: total } = result;
        setState({ ...state, ...rest, total });
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <BottomSheet
        padded={false}
        isVisible={state.isVisible}
        closeModal={() => setState({ ...state, isVisible: false })}
      >
        <View style={{ maxHeight: 0.9 * height }}>
          <CollectionDetails {...activeCollection} showDropperContact />
        </View>
      </BottomSheet>

      {user && user.admin && districtCollections ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ flexGrow: 1 }}
          data={districtCollections}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => (
            <CollectionPreview
              last={districtCollections && districtCollections.length === index + 1}
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
              return getDistrictCollections();
            }
          }}
          onEndReachedThreshold={0.01}
          onMomentumScrollBegin={() => setMomentum(false)}
          ListFooterComponent={() =>
            loading.getDistrictCollections && (
              <View style={{ height: RFValue(50), backgroundColor: '#fff' }}>
                <ActivityIndicator style={{ alignSelf: 'center', top: RFValue(10) }} color="#000" />
              </View>
            )}
        />
      ) : (
        <AdminPlaceholder />
      )}
    </View>
  );
};

export default Filter;
