const ErrorHandler = (res, error) => res.json({ success: false, result: error.message });
const SuccessHandler = (res, result) => res.json({ success: true, result });

const hashPassword = (stringToHash) => Bcrypt.hashSync(stringToHash, 10);

const decodePassword = (password, hashedPassword) => Bcrypt.compareSync(password, hashedPassword);
const paginateHelper = (page, limit, totalDocuments, result, res) => {
  // console.log('RESSSSSS', page, limit, totalDocuments, result.length);
  try {
    return res.json({
      result,
      totalDocuments,
      success: true,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalDocuments / parseInt(limit)),
      last: parseInt(page) === Math.ceil(totalDocuments / parseInt(limit))
    });
  } catch (error) {
    return error500(res, error);
  }
};

// FUNCTION CREATES A VALID JWT TOKEN TO BE USED ON REQUESTS TO THE SERVER
const createToken = (payload) => JWT.sign(JSON.stringify(payload), process.env.SECRET);

// VALIDATE SENT TOKEN ON ROUTES THAT NEED PROTECTION
const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  let result;
  if (authHeader) {
    const token = req.headers.authorization;

    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      result = JWT.verify(token, process.env.SECRET);
      // Let's pass back the decoded token to the request object
      req.user = result;
      // We call next to pass execution to the subsequent middleware
      next();
    } catch ({ message }) {
      // Throw an error just in case anything goes wrong with verification
      res.status(401).json({ success: false, error: message });
    }
  } else {
    res.status(401).json({ success: false, result: 'Authentication error. Token required.' });
  }
};

module.exports = {
  ErrorHandler,
  SuccessHandler,
  createToken,
  validateToken,
  hashPassword,
  decodePassword,
  paginateHelper
};
