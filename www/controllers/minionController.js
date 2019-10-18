const db = require("../models/minions");

module.exports = {
    findAll: function(req, res) {
      db.Minion
        .find(req.query)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }}