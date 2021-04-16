const mongoose = require("mongoose");

const Challenge_Accept = mongoose.model("Android_Challenge_Accept", {
  event_id: { type: String },
  home_team: { type: mongoose.Schema.Types.ObjectId, ref: "Teams" },
  away_team: { type: String },
  time: { type: String },
  date: { type: String },
  contact: { type: String },
  event_location: { type: String },
});

module.exports = Challenge_Accept;
