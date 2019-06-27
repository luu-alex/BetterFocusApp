var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const taskModel =  new Schema({
    task: String,
    userID: Number,
    isItDone: Boolean
});

var Task = mongoose.model('Task', taskModel);

module.exports = {
    Task: Task
};
