import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { DesignIcon, DropperPreview } from '../../Components';

const Droppers = ({ setActiveDropper, closeModal }) => {
  const { attendantDroppers } = useSelector((state) => state.Droppers);
  const dispatch = useDispatch();
  console.log('Drooperes---', attendantDroppers);
  return (
    // <View style={{ flexGrow: 1 }}>
    <FlatList
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
    // </View>
  );
};

export default Droppers;
