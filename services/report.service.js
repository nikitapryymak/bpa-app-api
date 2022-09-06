const { CTCH_REPORTS, CTCH_PLAYERS } = require("../constants/tables");
const db = require("../db/db");

exports.addReport = async (data) => db(CTCH_REPORTS).insert(data);
exports.getReportById = async (id) =>
  db
    .select(
      "r.*",
      "p.firstName",
      "p.lastName",
      "c.firstName as catcherFirstName",
      "c.lastName as catcherLastName"
    )
    .from(`${CTCH_REPORTS} as r`)
    .innerJoin(`${CTCH_PLAYERS} as p`, "r.pitcherId", "p.playerId")
    .innerJoin(`${CTCH_PLAYERS} as c`, "r.catcherId", "c.playerId")
    .where({ id });

exports.getPitcherReports = async (pitcherId) =>
  db(CTCH_REPORTS).where({ pitcherId });
