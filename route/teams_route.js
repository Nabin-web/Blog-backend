const express = require('express')
const router = express.Router()
const Teams = require('../model/teams')

router.post('/registerteam', function(req, res){
    const teamname = req.body.team_name
    const teamcaptian = req.body.team_captian
    const email = req.body.email
    const password = req.body.password
    const confirmpassword = req.body.confirm_password
    const teamcontact = req.body.team_contact
    const teamhomeground = req.body.team_home_ground
    const teamimage = req.body.team_image

    

    const registration_data = Teams({team_name: teamname, team_captian: teamcaptian, email: email, password: password, 
        confirm_password:confirmpassword, team_contact: teamcontact, team_home_ground: teamhomeground, team_image: teamimage })

    registration_data.save()
    res.send("Registration successful")




})

module.exports= router;