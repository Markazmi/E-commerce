const mongoose = require('mongoose');
// use validator to check if the email is validator
const validator = require('validator')

const userScehma = new mongoose.Schema({
name:{
    type: String,
    required:[true, 'Please enter your name'],
    maxlength:[30, 'Your name cannot exceed 30 characters']
},
email:{
    type: String,
    required:[true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail,"Please enter valid email address"],
},
password:{
    type:String,
    required:[true, "Please enter a password"],
    minlength:[6,'Your password must be longer than 6 characters'],
    select:false,
},
avatar:{
    public_id:{
        type: String,
        required: true,
    },
    url:{
        type: String,
        required: true
    }
},
role:{
    type: String,
    default: 'user',
},
createdAt:{
    type: Date,
    default: Date.now,
},
resetPasswordToken: String,
resetPasswordExpire: Date,

})
module.exports = mongoose.model('User', userScehma);