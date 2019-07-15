var mongoose = require("mongoose");
var Schema = mongoose.Schema;


const UserModel = new Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    created: { type: Date, default: Date.now },
    points: Number,
    tasks: [
        { type: mongoose.Schema.ObjectId, ref: 'Task' }
    ],
    todos: [
        { type: mongoose.Schema.ObjectId, ref: 'Todo' }
    ]
});

var User = mongoose.model('User', UserModel, 'Users');

module.exports = {
    User: User
};
