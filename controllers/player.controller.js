const { ENTITY_NOT_FOUND } = require("../constants/AppErrorCodes.js");
const {
  POSITION_PITCHER,
  POSITION_CATCHER,
} = require("../constants/AppConstants");
const { validateId } = require("../schemas/schemas.js");
const {
  getPlayers,
  getPlayerRecentStats,
  getPlayerById,
  getPitchersAndCatchers,
} = require("../services/player.service.js");
const { tryCatch, assertCondition } = require("../utils/utils.js");

exports.getPlayersController = tryCatch(async (req, res) => {
  const players = await getPlayers();
  assertCondition(players.length > 0, ENTITY_NOT_FOUND, "No players found");

  return res.json(players);
});

exports.getPlayerInfoController = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { error } = validateId(id);
  if (error) throw error;

  const [player] = await getPlayerById(id);
  assertCondition(player, ENTITY_NOT_FOUND, `Player ${id} not found`);

  const stats = await getPlayerRecentStats(id);
  return res.json({ ...player, stats });
});

exports.getCtchPlayersController = tryCatch(async (req, res) => {
  const players = await getPitchersAndCatchers();
  assertCondition(players.length > 0, ENTITY_NOT_FOUND, "No players found");

  const response = players.reduce(
    (acc, player) => {
      if (player.position === POSITION_PITCHER) {
        acc.pitchers = [...acc.pitchers, player];
      }
      if (player.position === POSITION_CATCHER) {
        acc.catchers = [...acc.catchers, player];
      }
      return acc;
    },
    { pitchers: [], catchers: [] }
  );

  return res.json(response);
});
