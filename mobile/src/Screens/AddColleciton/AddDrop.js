import React from 'react';
import { View, Text, Pressable, Dimensions, Keyboard, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheet, Button, DesignIcon, Input, PackagePreview } from '../../Components';
import Droppers from './Droppers';
import moment from 'moment';
import Companies from './Companies';
import Measurements from './Measurements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import ActiveDropper from './ActiveDropper';

const { height, width } = Dimensions.get('window');
const AddCollection = ({ setStatex, registerDrop, setQty, showDroppers, changeMainComp, ...statex }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.effects.Collections);
  const [ state, setState ] = React.useState({ total: '', typesBreakdown: [] });
  const { user } = useSelector((state) => state.Account);
  const { activeDropper } = useSelector((state) => state.Droppers);
  const { payload } = useSelector((state) => state.Collections);

  const createCollection = () => {
    if (!payload.typesBreakdown.length)
      return Alert.alert(
        'Missing information',
        'You need to add atleast one package to complete this collection record, try again'
      );
    if (!activeDropper._id)
      return Alert.alert(
        'Missing dropper',
        'Please add the person who owns this collection or register one and add them to it'
      );

    const payload = { attendantId: user._id, dropperId: activeDropper._id, district: user.district };
    dispatch.Collections.createCollection({
      payload: {},
      callback: (res) => {
        console.log('After regisering collection', res);
        if (!res.success) return alert(res.result);
        // setState({});
      }
    });
  };

  const submitPackage = () => {
    const { company, measurement } = statex;
    Keyboard.dismiss();
    dispatch.Collections.setPayload({
      ...payload,
      typesBreakdown: [
        ...payload.typesBreakdown,
        {
          company: payload.company,
          measurement: payload.measurement,
          total: payload.total,
          id: Math.random().toString(36).slice(2)
        }
      ],
      total: '',
      company: '',
      measurement: ''
    });
  };

  return (
    <View style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
      <ActiveDropper showDroppers={showDroppers} extStyles={{ marginTop: RFValue(15) }} />

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          // borderTopWidth: 1,
          marginTop: RFValue(0),
          borderColor: '#eee'
        }}
      >
        <Text style={{ fontSize: RFValue(13), color: '#000', marginBottom: RFValue(10), marginTop: RFValue(20) }}>
          Enter all the relevant details for this drop before proceeding for more accurate recording.
        </Text>
        {[
          {
            title: 'Select company',
            onPress: () => setStatex({ ...state, comp: 'companies', isVisible: true, modalTitle: 'Select company' }),
            value: payload.company,
            caption: 'companies'
          },
          {
            title: 'Select quantity',
            onPress: () =>
              setStatex({ ...state, comp: 'measurements', isVisible: true, modalTitle: 'Select quantity' }),
            value: payload.measurement,
            caption: 'measurement',
            noCaps: true
          }
        ].map(({ onPress, title, value, noCaps, caption, modalTitle }) => (
          <Pressable
            onPress={onPress}
            style={{
              width: '49%',
              paddingHorizontal: RFValue(10),
              height: RFValue(40),
              backgroundColor: '#eee',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: RFValue(10)
            }}
          >
            <Text
              style={{
                textTransform: noCaps ? 'none' : 'capitalize',
                fontFamily: 'OpenSans-Regular',
                fontSize: RFValue(14),
                color: value ? '#000' : '#aaa'
              }}
            >
              {value ? value : title}
            </Text>
            <DesignIcon name="chevron-down" pkg="mc" color="#000" />
          </Pressable>
        ))}
        <Input
          placeholder="Number of bottles collected"
          kbt="number-pad"
          value={payload.total}
          onChangeText={(total) => dispatch.Collections.setPayload({ ...payload, total })}
          onSubmitEditing={submitPackage}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <Button extStyles={{ width: '49%' }} title="Add package" onPress={submitPackage} />

          <Button
            extStyles={{ width: '49%', backgroundColor: '#ff7d00' }}
            title="Submit collection"
            onPress={() => changeMainComp('finish')}
          />
        </View>
      </View>

      <Text style={{ fontFamily: 'OpenSans-Bold', marginVertical: RFValue(10), fontSize: RFValue(14) }}>
        Added packages to collection
      </Text>
      <View style={{ flexShrink: 1 }}>
        {payload.typesBreakdown && payload.typesBreakdown.length ? (
          <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            {payload.typesBreakdown.map((item, index) => <PackagePreview index={index} {...item} />)}
          </ScrollView>
        ) : (
          <View
            style={{
              height: '95%',
              backgroundColor: '#eeeeee80',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center'
              // marginBottom: RFValue(10)
            }}
          >
            <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: RFValue(14), color: '#aaa' }}>
              Start adding packages to this collection
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default AddCollection;
