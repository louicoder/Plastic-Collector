import React from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { DesignIcon } from '../../Components';
import CompanyPreview from '../../Components/CompanyPreview';
import { COMPANIES, MEASUREMENTS } from '../../Utils/Constants';

const { height } = Dimensions.get('window');
const Companies = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { payload } = useSelector((state) => state.Collections);

  return (
    <View style={{ height: 0.8 * height }}>
      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={() => Math.random().toString(36).slice(2)}
        data={COMPANIES}
        renderItem={({ item: company, index }) => (
          <CompanyPreview
            company={company}
            len={index + 1 === COMPANIES.length}
            onPress={() => {
              dispatch.Collections.setPayload({ ...payload, company });
              closeModal();
            }}
          />
        )}
      />
    </View>
  );
};

export default Companies;
