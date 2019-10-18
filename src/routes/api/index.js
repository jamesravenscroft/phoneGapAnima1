const router = require("express").Router();
const minionRoutes = require("./minion");

// minion routes
router.use("/minions", minionRoutes);

module.exports = router;