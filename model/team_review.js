const mongoose = require("mongoose");

const SchemaTypes = mongoose.Schema.Types;

const review = mongoose.model("review", {
  teamimage: { type: String },
  teamname: { type: String },
  rate: { type: String },
});

module.exports = review;
