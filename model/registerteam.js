const mongoose = require('mongoose')

const Teams = mongoose.model('Teams', {
    team_name : {type:String},

    team_captain : {type: String},

    email : {type: String},

    password: {type: String},

    team_contact: {type: String},

    team_home_ground: {type: String},

    team_image: {type: String}
})

module.exports = Teams