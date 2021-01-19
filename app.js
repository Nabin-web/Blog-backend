const express= require('express');
const bodyParser = require('body-parser');
const db = require('./database/db');
const registerteam_route = require('./route/teams_route');
const app = express();

app.use(express.json());
app.use(registerteam_route);
app.use(bodyParser.urlencoded({extended: false}))



app.listen(90);

