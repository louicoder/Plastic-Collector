import { AXIOS } from '../../Utils/Functions';

export default {
  state: { dropper: {}, activeDropper: {} }, // initial state
  reducers: {
    setDropper (state, dropper) {
      return { ...state, dropper };
    },
    setActiveDropper (state, activeDropper) {
      return { ...state, activeDropper };
    }
  },
  effects: (dispatch) => ({
    // This function registers a new dropper not existing in the database:
    async registerDropper ({ payload, callback }, state) {
      // console.log('Payload====', payload);
      try {
        await AXIOS('dropper').post(`/register`, payload).then(({ data }) => {
          if (data.success) dispatch.Droppers.setActiveDropper(data.result);
          return callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error });
      }
    },

    // get collections by dropper [ the person bringing the packages ];
    async getDropperAccount ({ dropperId, callback }, state) {
      try {
        await AXIOS('account').get(`/dropper/${dropperId}`).then(({ data }) => {
          if (data.success) dispatch.Collections.setDropper(data.result);
          return callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error });
      }
    }
  })
};
