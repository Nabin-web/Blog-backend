const express = require("express");
const router = express.Router();
const review = require("../model/team_review");
const authentication = require("../middleware/authentication");

router.post("/review/insert/", authentication.verifyUser, function (req, res) {
  const teamname = req.body.teamname;
  const rate = req.body.rate;
  console.log(rate);
  const reviews = new review({
    teamname: teamname,
    rate: rate,
  });
  console.log("review");

  reviews
    .save()
    .then(function (result) {
      res.status(200).json({ message: true });
    })
    .catch(function (error) {
      res.status(400).json({ error: error });
    });
});

router.delete(
  "/review/delete/:id",
  authentication.verifyUser,
  function (req, res) {
    const id = req.params.id;
    review
      .deleteOne({ _id: id })
      .then(function (result) {
        res.status(200).json({ message: true });
      })
      .catch(function (err) {
        res.status(400).json({ error: err });
      });
  }
);

router.put(
  "/review/update/:id",
  authentication.verifyUser,
  function (req, res) {
    const id = req.params.id;
    const comment = req.body.comment;
    const rate = req.body.rate;
    review
      .updateOne(
        { _id: id },
        {
          comment: comment,
          rate: rate,
        }
      )
      .then(function (data) {
        res.status(200).json({ message: true });
      })
      .catch(function (err) {
        res.status(400).json({ error: err });
      });
  }
);

router.get("/review/show", function (req, res) {
  review
    .find()
    .then(function (data) {
      res.status(200).json({ data: data });
    })
    .catch(function (err) {
      res.status(400).json({ error: err });
    });
});

module.exports = router;
