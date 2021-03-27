const mongoose = require("mongoose");

const Challenge_Accpet = mongoose.model("Challenge_Accpet", {
  event_id: { type: String },
  home_team: { type: String },
  away_team: { type:String},
  time: { type:String},
  date: {type: String},
  contact: {type: String},
  event_location: {type: String}
});

module.exports = Challenge_Accpet;
