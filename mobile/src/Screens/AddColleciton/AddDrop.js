import React from 'react';
import { View, Text, Pressable, Dimensions, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheet, Button, DesignIcon, Input } from '../../Components';
import Droppers from './Droppers';
import moment from 'moment';
import Companies from './Companies';
import Measurements from './Measurements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window');
const AddCollection = ({ setStatex, registerDrop, setQty, ...statex }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.effects.Collections);
  const [ state, setState ] = React.useState({ total: '', typesBreakdown: [] });
  const { activeDropper } = useSelector((state) => state.Droppers);
  const { payload } = useSelector((state) => state.Collections);

  const registerCollection = () => {
    dispatch.Collections.createCollection({
      payload: collection,
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
      total: '',
      typesBreakdown: [
        ...payload.typesBreakdown,
        { company, measurement, total: payload.total, id: Math.random().toString(36).slice(2) }
      ]
    });
  };

  return (
    <View style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
      {activeDropper.name && (
        <View
          style={{
            marginBottom: RFValue(0),
            borderWidth: 1,
            borderColor: '#ddd',
            padding: RFValue(10),
            borderRadius: 5
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  height: RFValue(40),
                  width: RFValue(40),
                  borderRadius: 40,
                  backgroundColor: '#eee',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: RFValue(10)
                }}
              >
                <DesignIcon name="user" color="#aaa" />
              </View>
              <View>
                <Text style={{ fontFamily: 'opensans-bold', textTransform: 'capitalize' }}>{activeDropper.name}</Text>
                <Text style={{ fontFamily: 'opensans-regular', color: '#aaa' }}>
                  {activeDropper.gender} ・ Added {moment(activeDropper.dateCreated).fromNow()}
                </Text>
              </View>
            </View>

            <Pressable
              onPress={() => dispatch.Droppers.setActiveDropper({})}
              style={{ height: RFValue(30), width: RFValue(30), alignItems: 'center', justifyContent: 'center' }}
            >
              <DesignIcon name="close" color="#000" />
            </Pressable>
          </View>
        </View>
      )}

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
            value: statex.company,
            caption: 'companies'
          },
          {
            title: 'Select quantity',
            onPress: () =>
              setStatex({ ...state, comp: 'measurements', isVisible: true, modalTitle: 'Select quantity' }),
            value: statex.measurement,
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
                fontFamily: 'opensans-regular',
                fontSize: RFValue(14),
                color: value ? '#000' : '#aaa'
              }}
            >
              {value ? value : title}
            </Text>
            <DesignIcon name="chevron-right" pkg="mc" color="#aaa" />
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

          <Button extStyles={{ width: '49%' }} title="Submit collection" onPress={() => registerCollection} />
        </View>
      </View>

      <Text style={{ fontFamily: 'opensans-bold', marginVertical: RFValue(10), fontSize: RFValue(14) }}>
        Added packages to collection
      </Text>
      <View style={{ flexShrink: 1 }}>
        <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          {payload.typesBreakdown &&
            payload.typesBreakdown.map((r, index) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: RFValue(10),
                  backgroundColor: '#eee',
                  marginBottom: RFValue(10)
                }}
              >
                <View style={{ flexGrow: 1 }}>
                  <Text style={{ fontFamily: 'opensans-bold', fontSize: RFValue(18), textTransform: 'uppercase' }}>
                    {r.company}
                  </Text>
                  <Text style={{ fontFamily: 'opensans-regular', fontSize: RFValue(14) }}>
                    Measurement - {r.measurement}
                  </Text>
                  <Text style={{ fontFamily: 'opensans-regular', fontSize: RFValue(14) }}>
                    Number of Bottles - {r.total}
                  </Text>
                </View>
                <Pressable
                  onPress={() =>
                    dispatch.Collections.setPayload({
                      ...payload,
                      typesBreakdown: payload.typesBreakdown && [
                        ...payload.typesBreakdown.filter((x) => x.id !== r.id)
                      ]
                    })}
                >
                  <DesignIcon name="close" />
                </Pressable>
              </View>
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default AddCollection;
