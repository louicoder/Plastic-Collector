import { AXIOS } from '../../Utils/Functions';

export default {
  state: { user: {} }, // initial state
  reducers: {
    setUser (state, user) {
      return { ...state, user };
    }
  },
  effects: (dispatch) => ({
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
