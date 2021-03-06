const express = require("express");
const router = express.Router();
const Teams = require("../model/teams");
const { check, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authentication = require("../middleware/authentication");

const querystring = require("querystring");
const upload = require("../middleware/upload");
const { response } = require("express");
// const test = require("../middleware/test");

//"clientData- Postman", "Message";
router.post(
  "/register",
  [
    check("teamname", "Team Name required!").not().isEmpty(),
    check("email", "Invalid Email").isEmail(),
    check("email", "Email required!").not().isEmpty(),
    // check("teamcaptain", "Team Captain required").not().isEmpty(),
    check("password", "Password required!").not().isEmpty(),
    // check("teamcontact", "Team contact required!").not().isEmpty(),
    // check("teamhomeground", "Team home ground required !").not().isEmpty(),
  ],

  function (req, res) {
    const error = validationResult(req);
    console.log(req.body.email);

    if (error.isEmpty()) {
      const teamname = req.body.teamname;
      // const teamcaptain = req.body.teamcaptain;
      const email = req.body.email;
      const password = req.body.password;
      // const teamcontact = req.body.teamcontact;
      // const teamhomeground = req.body.teamhomeground;
      // const teamimage = req.body.teamimage;
      //const teamimage = req.file.path;

      // console.log(teamimage);

      //Encrypt
      bcryptjs.hash(password, 10, function (err, hash) {
        const registration_data = Teams({
          teamname: teamname,
          // teamcaptain: teamcaptain,
          email: email,
          password: hash,
          // teamcontact: teamcontact,
          // teamhomeground: teamhomeground,
          // teamimage: "default.png",
        });

        registration_data
          .save()
          .then(function (result) {
            //generate status code with message
            return res.status(201).json({ message: true, data: result });
          })
          .catch(function (err) {
            res.status(500).json({ message: err });
          });
      });
    } else {
      res.status(400).json({ error: error.array() });
    }
  }
);

router.post("/login", function (req, res) {
  console.log("we are herre");
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  console.log(password);
  const user = Teams.findOne({ email: email })
    .then(function (teamData) {
      if (teamData === null) {
        //User does not exist
        console.log("incorrect email");
        return res.status(201).json({ message: false });
      }

      bcryptjs.compare(password, teamData.password, function (err, result) {
        if (result === false) {
          //email correct password incorrect
          console.log("incorrect password");
          return res.status(201).json({ message: false });
        }
        //now lets generate token
        const token = jwt.sign({ TeamID: teamData }, "secretkey");
        console.log("login success");

        res.status(200).json({ token: token, message: true, data: teamData });
        // console.log(teamData);
      });
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});

router.get("/show/allteam", function (req, res) {
  Teams.find()
    .then(function (team) {
      res.status(200).json({ data: team });
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});

router.get("/show/team/:id", function (req, res) {
  const id = req.params.id;
  Teams.find({ _id: id })
    .then(function (team) {
      res.status(200).json({ data: team });
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});

router.put("/update/:id", function (req, res) {
  const id = req.params.id;
  const file = req.files.file;
  console.log(file);
  file.mv(`Teamimages/${file.name}`, async (err) => {
    if (err) {
      console.err(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }
  });
  Teams.findOne({ _id: id }).then(function (r) {
    console.log(r);
  });
  Teams.findByIdAndUpdate(
    { _id: id },
    {
      teamimage: Date.now() + file.name,
    }
  )
    .then(function (res) {
      res.status(201).json({ success: true });
      console.log("TEAMIMAGEEEEEE");
    })
    .catch(function (error) {
      res.status(500).json({ error: error });
    });
});

router.get(
  "/review/singleteam/:id",
  authentication.verifyUser,
  function (req, res) {
    console.log("Inside team single");
    const id = req.params.id;
    Teams.findOne({ _id: id })
      .then(function (result) {
        res.status(200).json({ data: result });
      })
      .catch(function (err) {
        res.status(500).json({ error: err });
      });
  }
);

router.put("/photo/:id", upload.single("teamimage"), function (req, res) {
  const id = req.params.id;
  console.log(id);
  const file = req.file;
  console.log(file);
  Teams.updateOne(
    { _id: id },
    {
      teamimage: file.filename,
    }
  )
    .then(function (result) {
      console.log("Done");
      res.status(200).json({ message: true });
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});

module.exports = router;

//token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUZWFtSUQiOiI2MDBmOWI3YTE5NjNiNzI4ZTRiNjNiYWUiLCJpYXQiOjE2MTE4MjA4OTV9.GNRXDWPLqJaIu6SAs7sDeYGUSgPSTIflvwQIoEEFru0",
