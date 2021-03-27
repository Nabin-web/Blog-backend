const mongoose = require("mongoose");

const Teams = mongoose.model("Teams", {
  teamname: { type: String },

  teamcaptain: { type: String },

  email: {
    type: String,
  },

  password: { type: String },

  teamcontact: { type: String },

  teamhomeground: { type: String },

  teamimage: { type: String },
});

module.exports = Teams;
