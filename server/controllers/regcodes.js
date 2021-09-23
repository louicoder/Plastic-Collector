const { DISTRICTS, CODES_LIST } = require('../Constants');
const { ErrorHandler, MissingField, SuccessHandler } = require('../Helpers');
const { regcodes: RC } = require('../models');

const createCode = async (req, res) => {
  if (!req.body.code) return MissingField(res, 'Registration code');
  const { code } = req.body;
  try {
    const Code = new RC({ code });
    await Code.save().then((result) => SuccessHandler(res, result));
  } catch (error) {
    return ErrorHandler(res, error);
  }
};

const verifyCode = async (req, res) => {
  if (!req.params.code) return MissingField(res, 'Registration code');
  const { code } = req.params;
  try {
    await RC.find({ code: { $regex: '.*' + code + '.*', $options: 'i' } }).then((result) => {
      const exists = CODES_LIST.includes(code);

      if (result.length)
        return res.json({ success: false, result: 'Code has already been used, please ask for another one' });
      else {
        if (exists) return res.json({ success: true, result: 'The code can be used for registration' });
        else
          return res.json({
            success: false,
            result: 'Code cannot be used for registration, try another one'
          });
      }
    });
  } catch (error) {
    return ErrorHandler(res, error);
  }
};

module.exports = { createCode, verifyCode };
