var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const TaskModel =  new Schema({
    task: String,
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    isItDone: {
        type: Boolean,
        default: false
    }
});

var Task = mongoose.model('Task', TaskModel, 'Tasks');

module.exports = {
    Task: Task
};
