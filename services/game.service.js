const { GAMES } = require("../constants/tables");
const db = require("../db/db");

exports.getGames = async () => db(GAMES).orderBy("date", "desc");
exports.getGameById = async (gameId) => db(GAMES).where({ gameId });
exports.addGame = async (data) => db(GAMES).insert(data);
exports.getOpponents = async () => db.select("oppponents").from(GAMES);
