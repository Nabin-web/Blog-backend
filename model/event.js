const mongoose = require("mongoose");

const Events = mongoose.model("Events", {
  profile: { type: String },
  opponent_team: { type: String },
  date: { type: String },
  time: { type: String },
  contact: { type: String },
  event_location: { type: String },
});

module.exports = Events;
