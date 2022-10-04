const { getLeaderboard } = require("../services/leaderboard.service.js");
const { tryCatch, addTotals } = require("../utils/utils.js");

const initialTotals = {
  playerId: 0,
  Last: "Total",
  "1B": 0,
  "2B": 0,
  "2OUTRBI": 0,
  "3B": 0,
  AB: 0,
  BB: 0,
  BPA: 0,
  CI: 0,
  FC: 0,
  H: 0,
  HBP: 0,
  HEADSUP: 0,
  HR: 0,
  PA: 0,
  R: 0,
  RBI: 0,
  ROE: 0,
  SAC: 0,
  SB: 0,
  SF: 0,
  SO: 0,
  TB: 0,
};

exports.getLeaderboardController = tryCatch(async (req, res) => {
  const leaderboard = await getLeaderboard();
  const totals = leaderboard.reduce(
    (total, stat) => addTotals(total, stat),
    initialTotals
  );

  const totalAverageBPA = (totals.BPA / Object.keys(leaderboard).length)
    .toString()
    .substring(0, 5);
  const response = [...leaderboard, { ...totals, BPA: totalAverageBPA }];

  return res.json(response);
});
