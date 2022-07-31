const { ENTITY_NOT_FOUND } = require("../constants/AppErrorCodes.js");
const { validateId } = require("../schemas/schemas.js");
const {
  getPlayers,
  getPlayerRecentStats,
  getPlayerById,
} = require("../services/player.service.js");
const { tryCatch, assertCondition } = require("../utils/utils.js");

exports.getPlayersController = tryCatch(async (req, res) => {
  const players = await getPlayers();
  assertCondition(players.length > 0, ENTITY_NOT_FOUND, "No players found");

  res.json(players);
});

exports.getPlayerInfoController = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { error } = validateId(id);
  if (error) throw error;

  const [player] = await getPlayerById(id);
  assertCondition(player, ENTITY_NOT_FOUND, `Player ${id} not found`);

  const stats = await getPlayerRecentStats(id);
  res.json({ ...player, stats });
});
