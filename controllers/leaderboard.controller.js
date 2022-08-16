const { getLeaderboard } = require("../services/leaderboard.service.js");
const { tryCatch } = require("../utils/utils.js");

exports.getLeaderboardController = tryCatch(async (req, res) => {
  const leaderboard = await getLeaderboard();

  res.json(leaderboard);
});
