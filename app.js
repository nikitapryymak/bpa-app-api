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
  getCtchPlayersController,
} = require("./controllers/player.controller");
const {
  getLeaderboardController,
} = require("./controllers/leaderboard.controller");
const authenticate = require("./middleware/authenticate");
const {
  BPA_APP_CLIENT_URL,
  PORT,
  NODE_ENV,
  CATCHER_APP_CLIENT_URL,
} = require("./constants/envVariables");
const verifyOrigin = require("./middleware/verifyOrigin");
const {
  addReportController,
  getPitcherReportsController,
  getReportByIdController,
} = require("./controllers/report.controller");

// initialize modules and middleware
const app = express();
app.use(express.json());
app.get("/", (_, res) => res.status(200).json({ status: "healthy" }));
app.use(cors({ origin: [BPA_APP_CLIENT_URL, CATCHER_APP_CLIENT_URL] }));
app.use(verifyOrigin);

app.get("/leaderboard", getLeaderboardController);
app.get("/players", getPlayersController);
app.get("/players/:id", getPlayerInfoController);
app.get("/games", getGamesController);
app.post("/games", authenticate, addGameController);
app.get("/games/:id", getGameInfoController);
app.delete("/games/:id", authenticate, deleteGameController);
app.get("/opponents", getOpponentsController);

// catcher app endpoints
app.get("/ctch-app/players", getCtchPlayersController);
app.post("/ctch-app/reports", addReportController);
app.get("/ctch-app/reports/:id", getReportByIdController);
app.get("/ctch-app/pitchers/:id/reports", getPitcherReportsController);

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} in ${NODE_ENV} environment`);
});
