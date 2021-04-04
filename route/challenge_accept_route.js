const express = require("express");
const router = express.Router();
const Challenge_Accept = require("../model/challenge_accept");
const authentication = require("../middleware/authentication");

router.post(
  "/challenge/accept",
  authentication.verifyUser,
  function (req, res) {
    console.log("User");
    console.log(req.user);
    const event_id = req.body.event_id;
    const home_team_id = req.body.home_team._id;
    const home_team = req.body.home_team.teamname;
    const away_team = req.user._id;
    const time = req.body.time;
    const date = req.body.date;
    const contact = req.body.contact;
    const event_location = req.body.event_location;
    //console.log(req.body.event_id);

    const challenge_data = new Challenge_Accept({
      event_id: event_id,
      home_team_id: home_team_id,
      home_team: home_team,
      away_team: away_team,
      time: time,
      date: date,
      contact: contact,
      event_location: event_location,
    });

    challenge_data
      .save()
      .then(function (result) {
        console.log(result);
        res.status(200).json({ message: true, data: result });
      })
      .catch(function (err) {
        res.status(400).json({ error: err });
      });
  }
);

router.delete("/challenge/delete/:id", function (req, res) {
  const idd = req.params.id;
  Challenge_Accept.deleteOne({ _id: id })
    .then(function (res) {
      res.status(200).json({ message: true });
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});


// router.put("/challenge/update/:id", function (req, res) {
//   const id = req.params.id;
//   const home_challenger = req.body.home_challenger;
//   const away_challenger = req.body.away_challenger;
//   const event_location = req.body.event_location;
//   const time = req.body.time;
//   Challenge_Accept.updateOne(
//     { _id: id },
//     {
//       home_challenger: home_challenger,
//       away_challenger: away_challenger,
//       event_location: event_location,
//       time: time,
//     }
//   )
//     .then(function (result) {
//       res.status(200).json({ message: true });
//     })
//     .catch(function (err) {
//       res.status(500).json({ error: err });
//     });
// });


router.get(
  "/challenge/show/:id",
  authentication.verifyUser,
  function (req, res) {
    console.log("Accept data khojna aayo");
    const id = req.user._id;
    console.log(id);
    Challenge_Accept.find({ away_team: id })
      .then(function (data) {
        console.log(data);
        res.status(200).json({ message: true, data: data });
      })
      .catch(function (err) {
        res.status(500).json({ error: err });
      });
  }
);


module.exports = router;
