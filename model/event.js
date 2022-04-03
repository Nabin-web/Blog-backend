const mongoose = require("mongoose");

const Events = mongoose.model("Events", {
  home_team: { type: mongoose.Schema.Types.ObjectId, ref: "Teams" },
  titile: { type: String },
  description: { type: String },
  // contact: { type: String },
  // event_location: { type: String },
});

module.exports = Events;
