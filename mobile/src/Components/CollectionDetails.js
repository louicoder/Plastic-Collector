import React from 'react';
import { View, Text, Alert, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { DropperPreview, PackagePreview } from '.';

const CollectionDetails = ({ dropperId, showDropperContact }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.effects.Account);
  const { dropper } = useSelector((state) => state.Account);
  const { activeCollection } = useSelector((state) => state.Collections);
  const navigation = useNavigation();

  console.log('ACtivecoll', activeCollection.typesBreakdown.length);
  React.useEffect(
    () => {
      getDropperAccount();
    },
    [ dropperId ]
  );

  const getDropperAccount = () => {
    dispatch.Account.getDropperAccount({
      dropperId,
      callback: ({ result, success }) => {
        if (!success) return Alert.alert('Something went wrong', result);
        console.log('result dropper', result);
      }
    });
  };

  return (
    <View>
      <View style={{ paddingHorizontal: RFValue(10) }}>
        <Text
          style={{ fontFamily: 'OpenSans-Bold', fontSize: RFValue(14), marginVertical: RFValue(10), color: '#aaa' }}
        >
          User details
        </Text>
        <DropperPreview
          leftIcon={false}
          {...dropper}
          loading={loading.getDropperAccount}
          showDropperContact={showDropperContact}
        />

        <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: RFValue(14), marginBottom: RFValue(10), color: '#aaa' }}>
          Packages in this collection:
        </Text>
      </View>
      <FlatList
        keyExtractor={(item) => item._id}
        data={activeCollection.typesBreakdown}
        renderItem={({ item, index }) => (
          <PackagePreview index={index} {...item} extStyles={{ height: RFValue(80) }} rightIcon={false} />
        )}
      />
    </View>
  );
};

export default CollectionDetails;
