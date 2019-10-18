const router = require("express").Router();
const minionController = require("../../controllers/minionController");

// Matches with "/api/minions?"
router.route("/")
  .get(minionController.findAll)
  
module.exports = router;