const { PLAYERS } = require("../constants/tables");
const db = require("../db/db");

exports.getPlayers = async () => db(PLAYERS);
exports.getPlayerById = async (id) => db(PLAYERS).where({ id });
exports.getPlayerRecentStats = async (id) =>
  db
    .select(
      "g.gameId",
      "g.date",
      "g.opponent",
      "s.PA",
      "s.AB",
      "s.H",
      "s.1B",
      "s.2B",
      "s.3B",
      "s.HR",
      "s.RBI",
      "s.R",
      "s.HBP",
      "s.ROE",
      "s.FC",
      "s.CI",
      "s.BB",
      "s.SO",
      "s.SB",
      "s.TB",
      "s.SAC",
      "s.SF",
      "s.2OUTRBI",
      "s.HEADSUP",
      "s.BPA"
    )
    .from("stats as s")
    .innerJoin("games as g", "s.gameId", "=", "g.gameId")
    .where("playerId", id)
    .orderBy("date", "desc");
