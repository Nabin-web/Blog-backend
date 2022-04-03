const express = require("express");
const mongoose = require("mongoose");
const Events = require("../model/event");
const router = express.Router();
const authentication = require("../middleware/authentication");
const { route } = require("./teams_route");

router.post(
  "/insert/:id",
  authentication.verifyUser,
  function (req, res) {
    //getting data of client or user

    // const profile = req.body.profile;
    const home_team = req.params.id;
    const titile = req.body.title;
    const description = req.body.description;
    // const contact = req.body.contact;
    // const event_location = req.body.event_location;

    //Inserting in database
    const Event_data = new Events({
      home_team: home_team,
      titile: titile,
      description: description,
      // contact: contact,
      // event_location: event_location,
      // profile: profile,
    });
    // console.log(profile);

    //data saved to database
    Event_data.save()
      .then(function (result) {
        // res.status(201).json({ success: true, data: result });
        res.status(201).json({ success: true });

        console.log("Inserted");
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

  console.log(req.body.id);

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
      res.status(200).json({ success: true });
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
        res.status(200).json({ success: true });
      })
      .catch(function (err) {
        res.status(500).json({ error: err });
      });
  }
);

router.get("/posts", function (req, res) {
  console.log("Event showall");
  Events.find()
    .populate("home_team")
    .then(function (data) {
      console.log("We are here!");
      console.log("Eventss", data);
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

router.put(
  "/android/eventupdate/:id",
  authentication.verifyUser,
  function (req, res) {
    console.log("Inside event update");
    console.log(req.body.home_team_id);
    console.log(req.body.time);
    console.log(req.params.id);
    console.log(req.body.contact);
    console.log(req.body.date);
    console.log(req.body.event_location);

    const id = req.params.id;
    const home_team = req.body.home_team_id;
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
        console.log(result);
        res.status(200).json({ success: true });
      })
      .catch(function (err) {
        res.status(500).json({ Error: err });
      });
  }
);

module.exports = router;
