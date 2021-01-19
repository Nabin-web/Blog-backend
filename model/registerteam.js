const mongoose = require('mongoose')

const Teams = mongoose.model('Teams', {
    team_name : {type:String},

    team_captian : {type: String},

    email : {type: String},

    password: {type: String},

    confirm_password : {type: String},

    team_contact: {type: String},

    team_home_ground: {type: String}
})

module.exports = Teams