import { AXIOS, setAsyncStorage } from '../../Utils/Functions';

export default {
  state: { user: {}, attendantDroppers: [], statistics: { collections: [], droppers: [] }, dropper: { name: '' } }, // initial state
  reducers: {
    setUser (state, user) {
      return { ...state, user };
    },
    setStatistics (state, statistics) {
      return { ...state, statistics };
    },
    setDropper (state, dropper) {
      return { ...state, dropper };
    }
  },
  effects: (dispatch) => ({
    // rgeister new account for attendant.
    async register ({ payload, callback }, state) {
      try {
        await AXIOS('account').post(`/register`, payload).then(async ({ data }) => {
          if (data.success) {
            dispatch.Account.setUser(data.result.user);
            await setAsyncStorage('user', data.result.user, (res) => callback(res));
          }
          return callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error });
      }
    },

    // rgeister new account for attendant.
    async login ({ payload, callback }, state) {
      try {
        await AXIOS('account').post(`/login`, payload).then(async ({ data }) => {
          if (data.success) {
            await setAsyncStorage('user', data.result.user, (res) => callback(res));
            dispatch.Account.setUser(data.result.user);
          }
          return callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error });
      }
    },

    // GEt attendant account
    async getAccount ({ attendantId, callback }, state) {
      try {
        await AXIOS('account').get(`/attendant/${attendantId}`).then(({ data }) => {
          if (data.success) dispatch.Account.setUser(data.result);
          return callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error });
      }
    },

    // GEt attendant account
    async getDropperAccount ({ dropperId, callback }, state) {
      try {
        await AXIOS('account').get(`/dropper/${dropperId}`).then(({ data }) => {
          if (data.success) dispatch.Account.setDropper(data.result);
          return callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error });
      }
    },

    // GEt attendant account
    async getAttendantStatistics ({ attendantId, callback }, state) {
      try {
        await AXIOS('account').get(`/statistics/${attendantId}`).then(({ data }) => {
          console.log('stats---', data);
          if (data.success) dispatch.Account.setStatistics(data.result);
          return callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error });
      }
    }
  })
};
