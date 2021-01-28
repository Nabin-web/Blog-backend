const express = require("express");
const router = express.Router();
const Teams = require("../model/teams");
const { check, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const test = require("../middleware/test");

//"clientData- Postman", "Message";
router.post(
  "/registerteam",
  [
    check("team_name", "Team Name required!").not().isEmpty(),
    check("email", "Invalid Email").isEmail(),
    check("email", "Email required!").not().isEmpty(),
    check("team_captain", "Team Captain required").not().isEmpty(),
    check("password", "Password required!").not().isEmpty(),
    check("team_contact", "Team contact required!").not().isEmpty(),
    check("team_home_ground", "Team home ground required !").not().isEmpty(),
  ],
  function (req, res) {
    const error = validationResult(req);
    //res.send(error.array())
    if (error.isEmpty()) {
      const teamname = req.body.team_name;
      const teamcaptain = req.body.team_captain;
      const email = req.body.email;
      const password = req.body.password;
      const confirmpassword = req.body.confirm_password;
      const teamcontact = req.body.team_contact;
      const teamhomeground = req.body.team_home_ground;
      const teamimage = req.body.team_image;

      //Encrypt
      bcryptjs.hash(password, 10, function (err, hash) {
        const registration_data = Teams({
          team_name: teamname,
          team_captain: teamcaptain,
          email: email,
          password: hash,
          confirm_password: confirmpassword,
          team_contact: teamcontact,
          team_home_ground: teamhomeground,
          team_image: teamimage,
        });

        registration_data
          .save()
          .then(function (result) {
            //generate status code with message
            res.status(201).json({ message: "registration successfull" });
          })
          .catch(function (error) {
            res.status(500).json({ message: console.error() });
          });
      });

      res.send("Registration successful");
    } else {
      res.status(400).json({ error: error.array() });
    }
  }
);

router.post("/team/login", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  console.log(password);

  Teams.findOne({ email: email })
    .then(function (teamData) {
      if (teamData === null) {
        //User does not exist
        return res.status(401).json({ message: "Invalid credential " });
      }

      bcryptjs.compare(password, teamData.password, function (err, result) {
        if (result === false) {
          //email correct password incorrect
          return res
            .status(401)
            .json({ message: "password invalid credential" });
        }

        //now lets generate token
        const token = jwt.sign({ TeamID: teamData._id }, "secretkey");
        res.status(200).json({ token: token, message: "Auth success" });
      });
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});

module.exports = router;

//token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUZWFtSUQiOiI2MDBmOWI3YTE5NjNiNzI4ZTRiNjNiYWUiLCJpYXQiOjE2MTE4MjA4OTV9.GNRXDWPLqJaIu6SAs7sDeYGUSgPSTIflvwQIoEEFru0",
