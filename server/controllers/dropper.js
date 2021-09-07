const { ErrorHandler, SuccessHandler } = require('../Helpers');
const { dropper: DR, collection: COLL } = require('../models');

const register = async (req, res) => {
  if (!req.body.name) return MissingField(res, 'Name');
  if (!req.body.phoneNumber) return MissingField(res, 'Phone number');
  if (!req.body.district) return MissingField(res, 'District');
  if (!req.body.gender) return MissingField(res, 'Gender');

  try {
    const dropper = new DR({ ...req.body, dateCreated: new Date().toISOString() });
    await dropper.save().then((result) => SuccessHandler(res, result));
  } catch (error) {
    return ErrorHandler(res, error);
  }
};

const getAllDroppers = async (req, res) => {
  try {
    await DR.find().then((result) => SuccessHandler(res, result));
  } catch (error) {
    return ErrorHandler(res, error);
  }
};

const getDroppersByDistrict = async (req, res) => {
  if (!req.params.district) return MissingField(res, 'Uid');
  const { district } = req.params;

  try {
    await DR.find({ district: district.trim().toLowerCase() }).then((result) => SuccessHandler(res, result));
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

module.exports = { register, getDropperCollections, getDroppersByDistrict, getAllDroppers };
