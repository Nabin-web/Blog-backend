// const express = require("express");
// const mongoose = require("mongoose");
// const event_team_detail = require("../model/event_team");
// const router = express.Router();

// router.post("/teameventdetail/insert", function (req, res) {
//   const event_id = req.body.event_id;
//   const user_id = req.body.user_id;

//   const teameventdetail = new event_team_detail({
//     event_id: event_id,
//     user_id: user_id,
//   });
//   teameventdetail
//     .save()
//     .then(function (result) {
//       res.send(200).json({ message: true });
//     })
//     .catch(function (err) {
//       res.send(500).json({ error: err });
//     });
// });

// router.get("/teameventdetail/show", function (req, res) {
//   console.log("inside");
//   event_team_detail
//     .find()
//     .populate("event_id", "-date -time")
//     .populate("team_id")
//     .then(function (result) {
//       res.status(201).json({ message: true, id: result });
//     })
//     .catch(function (err) {
//       res.status(500).json({ error: err.message });
//     });
// });

// module.exports = router;
