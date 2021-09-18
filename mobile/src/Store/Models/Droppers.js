import { AXIOS } from '../../Utils/Functions';

export default {
  state: { dropper: {}, activeDropper: {}, attendantDroppers: [] }, // initial state
  reducers: {
    setDropper (state, dropper) {
      return { ...state, dropper };
    },
    setActiveDropper (state, activeDropper) {
      return { ...state, activeDropper };
    },
    setAttendantDroppers (state, attendantDroppers) {
      return { ...state, attendantDroppers };
    }
    // setAttendantDroppers (state, attendantDroppers) {
    //   return { ...state, attendantDroppers };
    // }
  },
  effects: (dispatch) => ({
    // This function registers a new dropper not existing in the database:
    async registerDropper ({ payload, callback }, state) {
      try {
        await AXIOS('dropper').post(`/register`, payload).then(({ data }) => {
          if (data.success) {
            dispatch.Droppers.setActiveDropper(data.result);
            dispatch.Droppers.setAttendantDroppers([ ...state.Droppers.attendantDroppers, data.result ]);
          }
          return callback(data);
        });
        return callback({ success: true });
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
    },

    // GEt droppers registered by attendant
    async getAttendantDroppers ({ attendantId, callback, page, limit }, state) {
      try {
        await AXIOS('dropper').get(`/attendant/${attendantId}?page=${page}&limit=${limit}`).then(({ data }) => {
          console.log('ATEdant dropers', data.result);
          if (data.success) dispatch.Droppers.setAttendantDroppers(data.result);
          return callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error });
      }
    }
  })
};
