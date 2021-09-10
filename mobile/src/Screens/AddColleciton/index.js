import React from 'react';
import { View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';

const AddCollection = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Account);
  const { activeDropper } = useSelector((state) => state.Droppers);
  const [ dropper, setDropper ] = React.useState({
    name: 'Nansikombi primrose',
    gender: 'female',
    phoneNumber: '0782146363',
    district: '',
    attendantId: ''
  });

  const [ state, setState ] = React.useState({});

  // This function registers person who is new and has not been registered
  // before adding their package
  const registerDropper = () => {
    const { name, gender, phoneNumber } = dropper;
    const { district, _id: attendantId } = user;
    const payload = { name, gender, phoneNumber, district, attendantId };
    dispatch.Droppers.registerDropper({ payload });
  };

  const createCollection = () => {
    // const { _id: attendantId } = user;

    const payload = {};
    dispatch.Collections.createCollection({
      payload,
      callback: (res) => {
        if (!res.success) return alert(res.result);
        setState({});
      }
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: RFValue(20), color: '#aaa' }}>This is the add collection page</Text>
    </View>
  );
};

export default AddCollection;
