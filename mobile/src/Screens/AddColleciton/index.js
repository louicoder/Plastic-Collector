import React from 'react';
import { View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';

const AddCollection = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Account);
  const { activeDropper } = useSelector((state) => state.Droppers);
  const [ dropper, setDropper ] = React.useState({
    name: 'Sylvia Kyomuhendo',
    gender: 'female',
    phoneNumber: '0782146363',
    district: '',
    attendantId: ''
  });

  const [ collection, setCollection ] = React.useState({
    // dropperId should be obtained from activeDropper._id,
    // click on user to make entry for, if new user , register them using registerDropper function and then you will
    // obtain the dropperId from response i.e res.result._id
    dropperId: '613bc6d66a779e637accb311',
    // attendantId is to be obtnained from the user object above i.e user._id
    attendantId: '613bc23df88f135c18f0238d',
    // typesBreakdown - this object is an array of objects representing each category. each object in the array will include
    // company, measurement and total.
    typesBreakdown: [ { company: 'spice', measurement: '500ml', total: 10 } ],
    // district to be obtained from user object above [ field is district i.e user.district]
    district: 'kampala',
    totalweight: 124 // total weight of everything
  });

  React.useEffect(() => {
    // createCollection();
  }, []);

  // const [ state, setState ] = React.useState({});

  // This function registers person who is new and has not been registered
  // before adding their package
  const registerDropper = () => {
    const { name, gender, phoneNumber } = dropper;
    const { district, _id: attendantId } = user;
    const payload = { name, gender, phoneNumber, district, attendantId };
    dispatch.Droppers.registerDropper({
      payload,
      callback: (res) => {
        if (!res.success) return alert(res.result);
      }
    });
  };

  // This functions add a new entry of a drop which is brought to the collection area.
  // The entry is to be entered by the attendant
  const createCollection = () => {
    dispatch.Collections.createCollection({
      payload: collection,
      callback: (res) => {
        console.log('After regisering collection', res);
        if (!res.success) return alert(res.result);
        // setState({});
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
