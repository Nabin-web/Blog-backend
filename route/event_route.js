const express = require("express");
const mongoose = require("mongoose");
const Events = require("../model/event");
const router = express.Router();

router.post("/event/insert", function (req, res) {
  //getting data of client or user
  const profile = req.body.profile;
  const opponent_team = req.body.opponent_team;
  const date = req.body.date;
  const time = req.body.time;
  const contact = req.body.contact;
  const event_location = req.body.event_location;

  //Inserting in database
  const Event_data = new Events({
    profile: profile,
    opponent_team: opponent_team,
    date: date,
    time: time,
    contact: contact,
    event_location: event_location,
  });

  //data saved to database
  Event_data.save()
    //if no error
    .then(function (result) {
      res.status(201).json({ Message: "Event inserted" });
    })
    //if error occur
    .catch(function (e) {
      res.status(500).json({ error: e });
    });
});

module.exports = router;
