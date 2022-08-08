const {
  ENTITY_NOT_CREATED,
  ENTITY_NOT_FOUND,
  ENTITY_NOT_DELETED,
} = require("../constants/AppErrorCodes.js");
const { validateAddGameRequest, validateId } = require("../schemas/schemas.js");
const {
  addGame,
  getGameById,
  getGames,
  deleteGameById,
  getOpponents,
} = require("../services/game.service.js");
const {
  insertStats,
  getStatsByGameId,
  deleteStatsByGameId,
} = require("../services/stat.service.js");
const { tryCatch, assertCondition } = require("../utils/utils.js");

exports.addGameController = tryCatch(async (req, res) => {
  const { error, value: request } = validateAddGameRequest(req.body);
  if (error) throw error;

  const { date, opponent, title, stats } = request;

  const [gameId] = await addGame({ date, opponent, title });
  assertCondition(gameId, ENTITY_NOT_CREATED, "Failed to add game");

  const success = await insertStats(stats.map((s) => ({ ...s, gameId })));
  assertCondition(
    success.length === 1,
    ENTITY_NOT_CREATED,
    "Failed to add stats"
  );

  res.json({ succes: true });
});

exports.getGamesController = tryCatch(async (req, res) => {
  const games = await getGames();
  res.json(games);
});

exports.getOpponentsController = tryCatch(async (req, res) => {
  const results = await getOpponents();
  res.json(results.map(({ opponent }) => opponent));
});

exports.getGameInfoController = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { error } = validateId(id);
  if (error) throw error;

  const [game] = await getGameById(id);
  assertCondition(game, ENTITY_NOT_FOUND, `Game ${id} not found`);

  const stats = await getStatsByGameId(id);
  assertCondition(
    stats.length > 0,
    ENTITY_NOT_FOUND,
    `Stats for game ${id} not found`
  );

  res.json({ ...game, stats });
});

exports.deleteGameController = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { error } = validateId(id);
  if (error) throw error;

  const statsDeleted = await deleteStatsByGameId(id);
  assertCondition(statsDeleted, ENTITY_NOT_DELETED, "Failed to delete stats");

  const gameDeleted = await deleteGameById(id);
  assertCondition(gameDeleted, ENTITY_NOT_DELETED, "Failed to delete game");

  res.json({ gameId: id });
});
