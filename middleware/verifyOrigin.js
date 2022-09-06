const {
  BPA_APP_CLIENT_URL,
  CATCHER_APP_CLIENT_URL,
} = require("../constants/envVariables");

const validClients = [BPA_APP_CLIENT_URL, CATCHER_APP_CLIENT_URL];
const isValidClient = (url) => validClients.includes(url);

const verifyOrigin = (req, res, next) => {
  if (!isValidClient(req.headers.origin)) {
    return res.status(401).json({ error: "Unauthorized client" });
  }
  next();
};

module.exports = verifyOrigin;
