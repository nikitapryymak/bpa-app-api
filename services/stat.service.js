const { STATS } = require("../constants/tables");
const db = require("../db/db");

exports.getStatsByGameId = async (gameId) =>
  db(STATS).where({ gameId }).orderBy("BPA", "desc");
exports.insertStats = async (stats) => db(STATS).insert(stats);
exports.deleteStatsByGameId = async (gameId) =>
  db(STATS).where({ gameId }).del();
