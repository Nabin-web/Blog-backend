const mongoose = require('mongoose')

const Teams = mongoose.model('Teams', {
    team_name : {type:String, required: true},

    team_captain : {type: String, required: true},

    email : {
        type: String, 
        required: true, 
        unique: true
    },

    password: {type: String, required: true},

    team_contact: {type: String, required: true},

    team_home_ground: {type: String, required: true},

    team_image: {type: String}
})

module.exports = Teams