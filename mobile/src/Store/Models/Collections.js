import { AXIOS } from '../../Utils/Functions';

export default {
  // Collection State :::
  state: {
    collections: [],
    districtCollections: [],
    attendantCollections: [],
    dropperCollections: [],
    payload: { typesBreakdown: [], total: '', measurement: '', company: '', totalweight: '' },
    activeCollection: {}
  },

  //  Reducers :::
  reducers: {
    setColletions (state, collections) {
      return { ...state, collections };
    },
    setDistrictColletions (state, districtCollections) {
      return { ...state, districtCollections };
    },
    setAttendantCollections (state, attendantCollections) {
      return { ...state, attendantCollections };
    },
    setDropperCollections (state, dropperCollections) {
      return { ...state, dropperCollections };
    },
    setPayload (state, payload) {
      return { ...state, payload };
    },
    setActiveCollection (state, activeCollection) {
      return { ...state, activeCollection };
    }
  },

  // Side Effects :::
  effects: (dispatch) => ({
    // create a new collection :::
    async createCollection ({ callback, payload }, state) {
      // console.log('PAYLad', payload);
      try {
        await AXIOS('collections').post(`/create`, payload).then(({ data }) => {
          console.log('Data', data);
          if (data.success) {
            dispatch.Collections.setAttendantCollections([ ...state.Collections.attendantCollections, data.result ]);
            dispatch.Collections.setPayload({
              typesBreakdown: [],
              total: '',
              measurement: '',
              company: '',
              totalweight: ''
            });
            dispatch.Droppers.setActiveDropper({});
          }
          return callback(data);
        });
        return callback({ success: true });
      } catch (error) {
        return callback({ success: false, result: error });
      }
    },

    // GEt all collections, paginated :::
    async getAllCollections ({ callback, page, limit }, state) {
      try {
        await AXIOS('collections').get(`/all?page=${page}&limit=${limit}`).then(({ data }) => {
          if (data.success)
            dispatch.Collections.setColletions(
              page > 1 ? [ ...state.Collections.collections, data.result ] : data.result
            );
          return callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error });
      }
    },

    // get collections by district
    async getDistrictCollections ({ callback, district, page, limit }, state) {
      try {
        await AXIOS('collections').get(`/district/${district}?page=${page}&limit=${limit}`).then(({ data }) => {
          if (data.success)
            dispatch.Collections.setDistrictColletions(
              page > 1 ? [ ...state.Collections.districtCollections, data.result ] : data.result
            );
          return callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error });
      }
    },

    // get collections by attendant [ the person recieving the packages ]
    async getAttendantCollections ({ callback, attendantId, page, limit }, state) {
      // console.log('REsut for atte-----', attendatId);
      try {
        await AXIOS('collections').get(`/attendant/${attendantId}?page=${page}&limit=${limit}`).then(({ data }) => {
          if (data.success)
            dispatch.Collections.setAttendantCollections(
              page > 1 ? [ ...state.Collections.attendantCollections, data.result ] : data.result
            );
          return callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error });
      }
    },

    // get collections by dropper [ the person bringing the packages ];
    async getDropperCollections ({ callback, dropperId, page, limit }, state) {
      try {
        await AXIOS('collections').get(`/dropper/${dropperId}?page=${page}&limit=${limit}`).then(({ data }) => {
          if (data.success)
            dispatch.Collections.setDropperCollections(
              page > 1 ? [ ...state.Collections.dropperCollections, data.result ] : data.result
            );
          return callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error });
      }
    }
  })
};
