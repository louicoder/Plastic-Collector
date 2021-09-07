const { ErrorHandler } = require('../Helpers');
const { dropper: Dropper } = require('../models');

const register = async (req, res) => {
  try {
    //
  } catch (error) {
    return ErrorHandler(res, error);
  }
};

module.exports = { register };
