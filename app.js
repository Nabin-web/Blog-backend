const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database/db");
const cors = require("cors");
const fileupload = require("express-fileupload");

const registerteam_route = require("./route/teams_route");
const Event_route = require("./route/event_route");
const challenge_accept = require("./route/challenge_accept_route");
const review = require("./route/review");
const event_team_detail = require("./route/event_team_route");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/images", express.static(__dirname + "/Teamimages"));
// app.use(fileupload());
app.use(registerteam_route);
app.use(Event_route);
app.use(challenge_accept);
app.use(review);
// app.use(event_team_detail);
app.listen(90);
// "test": "echo \"Error: no test specified\" && exit 1"
