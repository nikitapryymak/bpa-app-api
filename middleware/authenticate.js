const { verifyAdminKey } = require("../utils/utils");

const authenticate = (req, res, next) => {
  const adminKey = req.headers["admin-key"];
  if (!adminKey || !verifyAdminKey(adminKey)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

module.exports = authenticate;
