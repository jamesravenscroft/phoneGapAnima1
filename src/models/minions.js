const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const minionSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  synopsis: String,
  date: { type: Date, default: Date.now },
  Name: {type: String, required: true},
  Type: {type: String, required: true},
  Attack1Name: {type: String, required: true},
  Attack1Power: {type: Number, required: true},
  Attack1Cost: {type: Number, required: true},
  Attack2Name: {type: String, required: true},
  Attack2Power: {type: Number, required: true},
  Attack2Cost: {type: Number, required: true},
  Health: {type: Number, required: true},
  WeakAgainst: {type: String, required: true},
  WeakAgainst: {type: String, required: true}
});

const Minion = mongoose.model("minion", minionSchema);

module.exports = Minion;