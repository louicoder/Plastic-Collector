import { AXIOS } from '../../Utils/Functions';

export default {
  state: { user: {} }, // initial state
  reducers: {
    setUser (state, user) {
      return { ...state, user };
    }
  },
  effects: (dispatch) => ({
    // rgeister new account for attendant.
    async register ({ payload, callback }, state) {
      try {
        await AXIOS('account').post(`/register`, payload).then(({ data }) => {
          if (data.success) dispatch.Account.setUser(data.result.user);
          return callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error });
      }
    },

    // rgeister new account for attendant.
    async login ({ payload, callback }, state) {
      try {
        await AXIOS('account').post(`/login`, payload).then(({ data }) => {
          if (data.success) dispatch.Account.setUser(data.result.user);
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
    }
  })
};
