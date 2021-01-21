const express = require('express')
const router = express.Router()
const Teams = require('../model/teams')
const {check, validationResult} = require('express-validator')

//"clientData- Postman", "Message"
router.post('/registerteam',
[
    check('team_name', "Team Name required!").not().isEmpty(), 
    check('email', "Invalid Email").isEmail(),
    check('email', "Email required!").not().isEmpty(),
    check('team_captain', "Team Captain required").not.isEmpty(),
    check('password', "Password required!").not.isEmpty(),
    check('team_contact', "Team contact required!").not.isEmpty(),
    check('team_home_ground', "Team home ground required !").not.isEmpty()

], 
function(req, res){
    const error = validationResult(req);
    //res.send(error.array())
    if(error.isEmpty()){
        const teamname = req.body.team_name
        const teamcaptain = req.body.team_captain
        const email = req.body.email
        const password = req.body.password
        const confirmpassword = req.body.confirm_password
        const teamcontact = req.body.team_contact
        const teamhomeground = req.body.team_home_ground
        const teamimage = req.body.team_image

        const registration_data = Teams({team_name: teamname, team_captain: teamcaptain, email: email, password: password, 
            confirm_password:confirmpassword, team_contact: teamcontact, team_home_ground: teamhomeground, team_image: teamimage })

        registration_data.save()
        res.send("Registration successful")
}
else{
    res.send(error.array());
}



})

module.exports= router;