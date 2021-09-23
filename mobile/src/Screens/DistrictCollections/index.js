import React from 'react';
import { View, Text, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector, useDispatch } from 'react-redux';
import { BottomSheet, CollectionPreview } from '../../Components';
import CollectionDetails from '../../Components/CollectionDetails';

const { height } = Dimensions.get('window');
const DistrictCollections = ({ route }) => {
  const { districtFilteredCollections, activeCollection } = useSelector((state) => state.Collections);
  const loading = useSelector((state) => state.loading.effects.Collections);
  const dispatch = useDispatch();
  const [ momentum, setMomentum ] = React.useState(false);
  const [ state, setState ] = React.useState({
    nextPage: 1,
    limit: 6,
    district: '',
    last: false,
    isVisible: false
  });

  React.useEffect(() => {
    console.log('PARAms', route.params);
    if (route.params.district) {
      setState({ ...state, district: route.params.district });
      getDistrictFilteredCollections();
    }
  }, []);

  const getDistrictFilteredCollections = () => {
    const { nextPage: page, limit } = state;
    dispatch.Collections.getDistrictFilteredCollections({
      district: route.params.district,
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

      {districtFilteredCollections && (districtFilteredCollections.length || loading.getDistrictFilteredCollections) ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          data={districtFilteredCollections}
          keyExtractor={() => Math.random().toString(36).slice(2)}
          ListFooterComponent={() =>
            loading.getDistrictFilteredCollections ? (
              <View
                style={{
                  height: RFValue(80),
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#eeeeee90'
                }}
              >
                <ActivityIndicator style={{ alignSelf: 'center' }} color="#000" />
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  width: '100%',
                  backgroundColor: '#eeeeee90',
                  height: RFValue(80),
                  justifyContent: 'center'
                }}
              >
                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: RFValue(14), color: '#aaa' }}>
                  No more collections.
                </Text>
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
              return getDistrictFilteredCollections();
            }
          }}
          onEndReachedThreshold={0.01}
          onMomentumScrollBegin={() => setMomentum(false)}
        />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: RFValue(16), color: '#aaa' }}>
            No collections to show
          </Text>
        </View>
      )}
    </View>
  );
};

export default DistrictCollections;
