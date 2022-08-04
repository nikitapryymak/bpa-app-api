const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const {
  addGameController,
  getGameInfoController,
  getGamesController,
  getOpponentsController,
  deleteGameController,
} = require("./controllers/game.controller");
const {
  getPlayersController,
  getPlayerInfoController,
} = require("./controllers/player.controller");
const {
  getLeaderboardController,
} = require("./controllers/leaderboard.controller");
const authenticate = require("./middleware/authenticate");
const { CLIENT_URL, PORT, NODE_ENV } = require("./constants/envVariables");

// initialize modules and middleware
const app = express();
app.use(express.json());
app.use(cors({ origin: CLIENT_URL }));

app.get("/", (_, res) => res.status(200).json({ status: "healthy" }));
app.get("/leaderboard", getLeaderboardController);
app.get("/players", getPlayersController);
app.get("/players/:id", getPlayerInfoController);
app.get("/games", getGamesController);
app.post("/games", authenticate, addGameController);
app.get("/games/:id", getGameInfoController);
app.delete("/games/:id", authenticate, deleteGameController);
app.post("/opponents", getOpponentsController);

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} in ${NODE_ENV} environment`);
});
