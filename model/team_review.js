const mongoose = require("mongoose");

const SchemaTypes = mongoose.Schema.Types;

const review = mongoose.model("review", {
  teamid: { type: String },
  teamname: { type: String },
  // teamimage: { type: String },
  comment: { type: String },
  postId: { type: String },

  // rate: { type: Number },
});

module.exports = review;
