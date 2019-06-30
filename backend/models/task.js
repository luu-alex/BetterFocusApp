var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const taskModel =  new Schema({
    task: String,
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    isItDone: {
        type: Boolean,
        default: false
    }
});

var Task = mongoose.model('Task', taskModel);

module.exports = {
    Task: Task
};
