const express = require("express");
const mongoose = require("mongoose");
const Events = require("../model/event");
const router = express.Router();
const authentication = require("../middleware/authentication");
const { route } = require("./teams_route");

router.post(
  "/event/insert/:id",
  authentication.verifyUser,
  function (req, res) {
    //getting data of client or user

    const profile = req.body.profile;
    const home_team = req.params.id;
    const date = req.body.date;
    const time = req.body.time;
    const contact = req.body.contact;
    const event_location = req.body.event_location;

    //Inserting in database
    const Event_data = new Events({
      home_team: home_team,
      date: date,
      time: time,
      contact: contact,
      event_location: event_location,
      profile: profile,
    });
    console.log(profile);

    //data saved to database
    Event_data.save()
      .then(function (result) {
        res.status(201).json({ success: true, data: result });
        console.log("Inseted");
      })
      //if error occur
      .catch(function (e) {
        res.status(500).json({ error: e });
      });
  }
);

//Update
router.put("/event/update/:id", authentication.verifyUser, function (req, res) {
  console.log("Inside event update");
  const id = req.body.id;
  const home_team = req.body.home_team;
  const date = req.body.date;
  const time = req.body.time;
  const contact = req.body.contact;
  const event_location = req.body.event_location;

  Events.updateOne(
    { _id: id },
    {
      home_team: home_team,
      date: date,
      time: time,
      contact: contact,
      event_location: event_location,
    }
  )

    .then(function (result) {
      res.status(200).json({ message: "Event updated" });
    })
    .catch(function (err) {
      res.status(500).json({ Error: err });
    });
});

//delete
router.delete(
  "/event/delete/:id",
  authentication.verifyUser,
  function (req, res) {
    const id = req.params.id;
    Events.deleteOne({ _id: id })
      .then(function (result) {
        res.status(200).json({ message: "User deleted" });
      })
      .catch(function (err) {
        res.status(500).json({ error: err });
      });
  }
);

router.get("/event/showall", function (req, res) {
  console.log("Event showall");
  Events.find()
    .populate("home_team")
    .then(function (data) {
      console.log("We are here!");
      console.log(data);

      res.status(200).json({ success: true, data: data });
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});

router.get("/event/singleEvent/:id", function (req, res) {
  // console.log("Inside event update single")
  const id = req.params.id;
  Events.findOne({ _id: id })
    .then(function (result) {
      res.status(200).json({ data: result });
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
