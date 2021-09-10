const { COMPANIES, MEASUREMENTS } = require('../Constants');
const { ErrorHandler, paginateHelper, MissingField, SuccessHandler, getDateString } = require('../Helpers');
const { account: AM, collection: COLL } = require('../models');

const createCollection = async (req, res) => {
  if (!req.body.dropperId) return MissingField(res, 'User id');
  if (!req.body.attendantId) return MissingField(res, 'Attendant Id');
  if (!req.body.typesBreakdown) return MissingField(res, 'Types Breakdown Array');
  if (!req.body.totalweight) return MissingField(res, 'Total weight');

  let totalCollection = 0;
  for (const colltn of req.body.typesBreakdown) {
    if (!colltn.measurement) return MissingField(res, 'Measurement');
    if (!colltn.company) return MissingField(res, 'Company');
    if (![ '330ml', '500ml', '1litre', '1.5litres', '2litres' ].includes(colltn.measurement))
      return res.json({
        success: false,
        result: 'Measurement should be one of 330ml, 500ml, 1litre, 1.5litres, 2litres,  change and try again'
      });
    if (!colltn.total) return MissingField(res, 'Total');
    totalCollection = totalCollection + parseInt(colltn.total);
  }
  // const total
  try {
    const _coll = new COLL({ ...req.body, totalCollection, dateCreated: getDateString() });
    await _coll.save().then((result) => SuccessHandler(res, result));
  } catch (error) {
    return ErrorHandler(res, error);
  }
};

const getAllCollections = async (req, res) => {
  const { page = 1, limit = 2 } = req.query;
  try {
    const total = await COLL.find().countDocuments();
    await COLL.find()
      .limit(parseInt(limit) * 1)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ dateCreated: 'desc' })
      .then((result) => paginateHelper(page, limit, total, result, res));
  } catch (error) {
    return ErrorHandler(res, error);
  }
};

const getCollectionsByDistrict = async (req, res) => {
  if (!req.params.district) return MissingField(res, 'District name');

  const { page = 1, limit = 2 } = req.query;
  const { district } = req.params;
  try {
    const total = await COLL.find().countDocuments({ district: district.trim().toLowerCase() });
    await COLL.find({ district: district.trim().toLowerCase() })
      .limit(parseInt(limit) * 1)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ dateCreated: 'desc' })
      .then((result) => paginateHelper(page, limit, total, result, res));
  } catch (error) {
    return ErrorHandler(res, error);
  }
};

const getDropperCollections = async (req, res) => {
  if (!req.params.dropperId) return MissingField(res, 'User id');

  const { page = 1, limit = 2 } = req.query;
  const { dropperId } = req.params;
  try {
    const total = await COLL.find().countDocuments({ dropperId: dropperId.trim().toLowerCase() });
    await COLL.find({ dropperId: dropperId.trim().toLowerCase() })
      .limit(parseInt(limit) * 1)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ dateCreated: 'desc' })
      .then((result) => paginateHelper(page, limit, total, result, res));
  } catch (error) {
    return ErrorHandler(res, error);
  }
};

const getAttendantCollections = async (req, res) => {
  if (!req.params.attendantId) return MissingField(res, 'Attendant id');

  const { page = 1, limit = 2 } = req.query;
  const { attendantId } = req.params;
  try {
    const total = await COLL.find().countDocuments({ attendantId: attendantId.trim().toLowerCase() });
    await COLL.find({ attendantId: attendantId.trim().toLowerCase() })
      .limit(parseInt(limit) * 1)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ dateCreated: 'desc' })
      .then((result) => paginateHelper(page, limit, total, result, res));
  } catch (error) {
    return ErrorHandler(res, error);
  }
};

const getCollectionTotals = async (req, res) => {
  try {
    let result = {};
    for (const company of COMPANIES) {
      const resp = await COLL.find({ 'typesBreakdown.company': company });
      for (const measure of MEASUREMENTS) {
        // TODO: MAP OVER MEASUREMENTS
        // console.log('Measurement', measure, JSON.stringify(resp));
      }
      result[company] = resp;
    }

    return res.json({ success: true, result });
  } catch (error) {
    return ErrorHandler(res, error);
  }
};

const searchCollectors = async (req, res) => {
  try {
    //
  } catch (error) {
    return ErrorHandler(res, error);
  }
};

module.exports = {
  createCollection,
  getAllCollections,
  getCollectionsByDistrict,
  searchCollectors,
  getAttendantCollections,
  getDropperCollections,
  getCollectionTotals
};

// {"district":"kampala"}
// {"company": "pepsi", "measurement" :"500ml", "total":"50"}

const payload = {
  dropperId: '613897bee8e7096010638fc5',
  attendantId: '6138887ea3ffff58389e38e9',
  typesBreakdown: [
    { company: 'blue wave', measurement: '500ml', total: '100' },
    { company: 'rwenzori', measurement: '500ml', total: '50' }
  ],
  totalweight: '112',
  district: 'kampala'
};
