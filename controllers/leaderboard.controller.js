const { ENTITY_NOT_FOUND } = require("../constants/AppErrorCodes.js");
const { getLeaderboard } = require("../services/leaderboard.service.js");
const { tryCatch, assertCondition } = require("../utils/utils.js");

exports.getLeaderboardController = tryCatch(async (req, res) => {
  const leaderboard = await getLeaderboard();
  assertCondition(
    leaderboard.length > 0,
    ENTITY_NOT_FOUND,
    "No leaderboard data found"
  );

  res.json(leaderboard);
});
