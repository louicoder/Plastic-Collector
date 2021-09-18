import { AXIOS, setAsyncStorage } from '../../Utils/Functions';

export default {
  state: { user: {}, attendantDroppers: [] }, // initial state
  reducers: {
    setUser (state, user) {
      return { ...state, user };
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
    }
  })
};
