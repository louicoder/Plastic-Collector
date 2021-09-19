import React from 'react';
import { View, Text, Dimensions, SafeAreaView, Alert, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheet, DesignIcon } from '../../Components';
import Droppers from './Droppers';
import RegDropper from './RegDropper';
import AddDrop from './AddDrop';
import Measurements from './Measurements';
import Companies from './Companies';
import Finish from './Finish';

const { height } = Dimensions.get('window');
const AddCollection = ({ navigation }) => {
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

  const [ state, setState ] = React.useState({
    isVisible: false,
    mainComp: 'adddrop',
    nextPage: 1,
    limit: 100,
    modalTitle: '',
    comp: '',
    company: '',
    measurement: '',
    typesBreakdown: [],
    total: '',
    totalCollection: ''
  });

  const [ collection, setCollection ] = React.useState({
    typesBreakdown: [ { company: 'spice', measurement: '500ml', total: 10 } ],
    totalweight: 124,
    totalCollection: 0
  });

  React.useEffect(() => {
    getAttendantDroppers();
  }, []);

  React.useEffect(() => {
    navigation.setParams({
      onPressAction: () => setState({ ...state, isVisible: true, comp: 'droppers', modalTitle: 'Select dropper' })
    });
  }, []);

  // Register Dropper
  const registerDropper = () => {
    const { name, gender, phoneNumber } = dropper;
    const { district, _id: attendantId } = user;
    const payload = { name, gender, phoneNumber, district, attendantId };
    dispatch.Droppers.registerDropper({
      payload,
      callback: ({ success, result }) => {
        if (!success) return Alert.alert('Something went wrong', result);
        setState({ ...state, activeDropper: result, mainComp: 'adddrop' });
      }
    });
  };

  // Create Collection:
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

  const RenderModalContent = ({ comp, closeModal, setCompany, setMeasurement, createDropper }) => {
    switch (comp) {
      case 'droppers':
        return <Droppers closeModal={closeModal} createDropper={createDropper} />;
      case 'companies':
        return <Companies closeModal={setCompany} />;
      case 'measurements':
        return <Measurements closeModal={closeModal} onPress={setMeasurement} />;
      default:
        return <View />;
    }
  };

  const RenderMainContent = ({
    mainComp,
    registerDropper,
    district,
    setAdddrop,
    setStatex,
    state,
    showDroppers,
    changeMainComp,
    setQty,
    ...rest
  }) => {
    switch (mainComp) {
      case 'regdropper':
        return <RegDropper district={district} setAdddrop={setAdddrop} />;
      case 'finish':
        return <Finish showDroppers={showDroppers} changeMainComp={changeMainComp} />;
      case 'adddrop':
        return (
          <AddDrop
            {...state}
            registerDropper={registerDropper}
            setStatex={(x) => setStatex(x)}
            showDroppers={showDroppers}
            // submitCollection={submitCollection}
            changeMainComp={changeMainComp}
          />
        );
    }
  };

  const getAttendantDroppers = () =>
    dispatch.Droppers.getAttendantDroppers({
      page: state.nextPage,
      limit: state.limit,
      attendantId: user._id,
      callback: ({ result, success }) => {
        // console.log('Attendant droppers >>>>>', res.result);
        if (!success) return Alert.alert('Something went wrong', result);
      }
    });

  return (
    <View style={{ flex: 1, paddingHorizontal: RFValue(10) }}>
      <BottomSheet isVisible={state.isVisible} closeModal={() => setState({ ...state, isVisible: false })}>
        <View style={{ maxHeight: 0.9 * height }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: RFValue(10),
              marginBottom: RFValue(15)
            }}
          >
            <Text style={{ fontFamily: 'opensans-regular', fontSize: RFValue(20) }}>{state.modalTitle}</Text>
            <Pressable
              onPress={() => setState({ ...state, isVisible: false })}
              style={{
                height: RFValue(40),
                width: RFValue(40),
                alignItems: 'center',
                backgroundColor: '#eee',
                justifyContent: 'center',
                borderRadius: 40
              }}
            >
              <DesignIcon name="close" color="#aaa" />
            </Pressable>
          </View>
          <RenderModalContent
            createDropper={() => setState({ ...state, isVisible: false, mainComp: 'regdropper' })}
            setCompany={(company) =>
              setState({ ...state, company, comp: 'measurements', modalTitle: 'Select quantity' })}
            setMeasurement={(measurement) => setState({ ...state, measurement, comp: 'companies', isVisible: false })}
            {...state}
            comp={state.comp}
            title={state.modalTitle}
            closeModal={() => setState({ ...state, isVisible: false, mainComp: 'adddrop' })}
            // setState={(x) => setState({ ...state, ...x })}
          />
        </View>
      </BottomSheet>
      <View style={{ flex: 1 }}>
        <RenderMainContent
          showDroppers={(comp) =>
            setState({ ...state, isVisible: true, comp: 'droppers', modalTitle: 'Select dropper' })}
          state={state}
          page={state.nextPage}
          limit={state.limit}
          setQty={(total) => setState({ ...state, total })}
          setStatex={(x) => setState({ ...state, ...x })}
          setAdddrop={() => setState({ ...state, mainComp: 'adddrop' })}
          district={user.district}
          registerDropper={() => setState({ ...state, mainComp: 'regdropper' })}
          setActiveDropper={(activeDropper) => setState({ ...state, activeDropper })}
          mainComp={state.mainComp}
          changeMainComp={(mainComp) => setState({ ...state, mainComp })}
          submitCollection={() => setState({ ...state, mainComp: 'finish' })}
        />
      </View>
    </View>
  );
};

export default AddCollection;
