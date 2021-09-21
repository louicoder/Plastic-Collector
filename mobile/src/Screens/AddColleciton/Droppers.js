import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { Button, DesignIcon, DropperPreview, DropperSkeleton } from '../../Components';

const Droppers = ({ setActiveDropper, closeModal, createDropper }) => {
  const { attendantDroppers } = useSelector((state) => state.Droppers);
  const loading = useSelector((state) => state.loading.effects.Droppers);
  const dispatch = useDispatch();
  // console.log('Drooperes---', attendantDroppers);
  return (
    <View style={{ flexGrow: 1 }}>
      {!loading.getAttendantDroppers ? (
        <FlatList
          keyExtractor={(item) => item._id}
          ListEmptyComponent={() => (
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', height: RFValue(150) }}>
              <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: RFValue(16), color: '#aaa' }}>
                There are no droppers, first add some to select.
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          style={{ flexGrow: 1 }}
          data={attendantDroppers}
          renderItem={({ item: dropper, index }) => (
            <DropperPreview
              {...dropper}
              onPress={() => {
                dispatch.Droppers.setActiveDropper(dropper);
                closeModal();
              }}
            />
          )}
        />
      ) : (
        <DropperSkeleton />
      )}
      <Button title="Create new dropper" onPress={createDropper} />
    </View>
  );
};

export default Droppers;
