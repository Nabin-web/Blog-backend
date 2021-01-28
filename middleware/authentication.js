const jwt = require("jsonwebtoken");
const Teams = require("../model/teams");
const Team = require("../model/teams");

module.exports.verifyUser = function (req, res, next) {
  try {
    console.log("This is a guard !");
    const token = req.headers.authorization.split(" ")[1];
    const teamData = jwt.verify(token, "secretkey"); //decode the encoded token

    Teams.findOne({ _id: teamData.TeamID })
      .then(function (result) {
        res.send("Auth successful");
      })
      .catch(function (e) {
        res.status(500).json({ error: e });
      });
  } catch (err) {
    res.status(401).json({ message: "Auth failed" });
  }

  next();
};
