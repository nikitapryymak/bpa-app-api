const { CLIENT_URL } = require("../constants/envVariables");

const verifyOrigin = (req, res, next) => {
  if (req.headers.origin !== CLIENT_URL) {
    return res.status(401).json({ error: "Unauthorized client" });
  }
  next();
};

module.exports = verifyOrigin;
