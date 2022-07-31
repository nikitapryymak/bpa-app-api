const { LEADERBOARD } = require("../constants/tables");
const db = require("../db/db");

exports.getLeaderboard = async () => db(LEADERBOARD).orderBy("BPA", "desc");
