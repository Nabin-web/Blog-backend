const express = require("express");
const router = express.Router();
const review = require("../model/team_review");
const authentication = require("../middleware/authentication");

router.post("/review", authentication.verifyUser, function (req, res) {
  const teamid = req.body.teamid;
  const teamname = req.body.teamname;
  // const teamimage = req.body.teamimage;
  const comment = req.body.comment;
  // const rate = req.body.rate;
  const postId = req.body.postId;
  const reviews = new review({
    teamid: teamid,
    teamname: teamname,
    // teamimage: teamimage,
    comment: comment,
    postId: postId,
    // rate: rate,
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
        res.status(200).json({ message: true, data: data });
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
      console.log(data);
      res.status(200).json({ data: data, message: true });
    })
    .catch(function (err) {
      res.status(400).json({ error: err });
    });
});

router.get(
  "/update/singleReview/:id",
  authentication.verifyUser,
  function (req, res) {
    // console.log("Inside review update single")
    const id = req.params.id;
    review
      .findOne({ _id: id })
      .then(function (result) {
        res.status(200).json({ data: result });
      })
      .catch(function (err) {
        res.status(500).json({ error: err });
      });
  }
);

module.exports = router;
