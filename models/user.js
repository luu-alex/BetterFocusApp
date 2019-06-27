var mongoose = require("mongoose");
var Schema = mongoose.Schema;


const userModel = new Schema({
    name: String,
    userID: Number,
    email: String,
    password: String,
    created: { type: Date, default: Date.now },
    points: Number
});

var User = mongoose.model('User', userModel);

module.exports = {
    User: User
};
