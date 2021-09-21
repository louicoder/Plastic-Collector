import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');
const BottomSheet = ({ isVisible, closeModal, children, padded = true }) => {
  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      style={{ margin: 0 }}
      hideModalContentWhileAnimating
      backdropTransitionOutTiming={0}
      animationInTiming={250}
      animationOut="fadeOutDown"
      animationOutTiming={100}
    >
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#fff',
          bottom: 0,
          width: '100%',
          padding: RFValue(padded ? 10 : 0),
          paddingBottom: useSafeAreaInsets().bottom,
          maxHeight: 0.9 * height
        }}
      >
        {children}
      </View>
    </Modal>
  );
};

export default BottomSheet;
