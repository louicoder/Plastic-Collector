const { ErrorHandler, SuccessHandler, paginateHelper, MissingField, getDateString } = require('../Helpers');
const { dropper: DR, collection: COLL } = require('../models');

const register = async (req, res) => {
  if (!req.body.name) return MissingField(res, 'Name');
  if (!req.body.phoneNumber) return MissingField(res, 'Phone number');
  if (!req.body.district) return MissingField(res, 'District');
  if (!req.body.attendantId) return MissingField(res, 'Attendant Id');
  if (!req.body.gender) return MissingField(res, 'Gender');

  try {
    const dropper = new DR({ ...req.body, dateCreated: getDateString() });
    await dropper.save().then((result) => SuccessHandler(res, result));
  } catch (error) {
    return ErrorHandler(res, error);
  }
};

const getAllDroppers = async (req, res) => {
  const { page = 1, limit = 2 } = req.query;
  try {
    const total = await DR.find().countDocuments();
    await DR.find()
      .limit(parseInt(limit) * 1)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ dateCreated: 'desc' })
      .then((result) => paginateHelper(page, limit, total, result, res));
  } catch (error) {
    return ErrorHandler(res, error);
  }
};

const getDropper = async (req, res) => {
  if (!req.params.uid) return MissingField(res, 'User id');
  const { uid: _id } = req.params;

  try {
    await DR.findOne({ _id }).then((result) => SuccessHandler(res, result));
  } catch (error) {
    return ErrorHandler(res, error);
  }
};

const getDroppersByDistrict = async (req, res) => {
  if (!req.params.district) return MissingField(res, 'Uid');
  const { district } = req.params;
  const { page = 1, limit = 2 } = req.query;

  const query = { district: district.trim().toLowerCase() };
  try {
    const total = await DR.find(query).countDocuments();
    await DR.find(query)
      .limit(parseInt(limit) * 1)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ dateCreated: 'desc' })
      .then((result) => paginateHelper(page, limit, total, result, res));
  } catch (error) {
    return ErrorHandler(res, error);
  }
};

const getDroppersByAttendant = async (req, res) => {
  if (!req.params.attendantId) return MissingField(res, 'Attendant Id');
  const { attendantId } = req.params;
  const { page = 1, limit = 2 } = req.query;

  const query = { attendantId: attendantId.trim().toLowerCase() };
  try {
    const total = await DR.find(query).countDocuments();
    await DR.find(query)
      .limit(parseInt(limit) * 1)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ dateCreated: 'desc' })
      .then((result) => paginateHelper(page, limit, total, result, res));
  } catch (error) {
    return ErrorHandler(res, error);
  }
};

const getDropperCollections = async (req, res) => {
  if (!req.params.uid) return MissingField(res, 'Uid');
  const { uid: dropperId } = req.params;
  try {
    await COLL.find({ dropperId }).then((result) => SuccessHandler(res, result));
  } catch (error) {
    return ErrorHandler(res, error);
  }
};

module.exports = {
  register,
  getDropperCollections,
  getDroppersByDistrict,
  getAllDroppers,
  getDroppersByAttendant,
  getDropper
};
