import React from 'react';
import { View, Text, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { Button, DesignIcon, Input } from '../../Components';
import ActiveDropper from './ActiveDropper';

const Finish = ({ showDroppers, changeMainComp }) => {
  const dispatch = useDispatch();
  const { payload } = useSelector((state) => state.Collections);
  const loading = useSelector((state) => state.loading.effects.Collections);
  const { user } = useSelector((state) => state.Account);
  const { activeDropper } = useSelector((state) => state.Droppers);
  // const [ weight, setWeight ] = React.useState('');

  const totalCollection = payload.typesBreakdown.reduce((p, c) => p + parseInt(c.total), 0);

  const createCollection = () => {
    if (!payload.totalweight)
      return Alert.alert('Weight missing', 'Please enter the total weight in kilograms to continue');
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

    const { typesBreakdown, totalweight } = payload;
    const payloadx = {
      totalweight,
      totalCollection,
      typesBreakdown,
      attendantId: user._id,
      dropperId: activeDropper._id,
      district: user.district
    };
    dispatch.Collections.createCollection({
      payload: payloadx,
      callback: ({ result, success }) => {
        if (!success) return Alert.alert('Someting went wrong', result);
        changeMainComp('adddrop');
      }
    });
  };
  // console.log(user.district);
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ marginVertical: RFValue(10), fontFamily: 'opensans-regular', fontSize: RFValue(14) }}>
        Enter the total weight of all the pkgs below in kilograms:
      </Text>
      <Input
        placeholder="Enter total weight of collection"
        kbt="number-pad"
        value={payload.totalweight}
        onChangeText={(totalweight) => dispatch.Collections.setPayload({ ...payload, totalweight })}
      />

      <Text style={{ marginBottom: RFValue(10), fontFamily: 'opensans-bold', fontSize: RFValue(14) }}>
        Dropper details:
      </Text>
      <View>
        <ActiveDropper showDroppers={showDroppers} />
      </View>

      <View style={{ padding: RFValue(10), backgroundColor: '#fff', marginVertical: RFValue(15) }}>
        <Text style={{ fontFamily: 'opensans-bold', fontSize: RFValue(18) }}>
          {totalCollection} - bottles collected
        </Text>
      </View>

      <Button title="Submit Collection" loading={loading.createCollection} onPress={createCollection} />
      <Button
        title="Back to Collection data"
        color="#fff"
        extStyles={{ backgroundColor: '#ff7d00' }}
        onPress={() => changeMainComp('adddrop')}
      />
    </View>
  );
};

export default Finish;
