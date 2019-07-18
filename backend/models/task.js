var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const taskModel =  new Schema({
    task: String,
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    isItDone: {
        type: Boolean,
        default: false
    },
    deadLine: {
        type: Date,
        min: Date.now,
        max: '2099-12-31'
    }
});

var Task = mongoose.model('Task', taskModel);

module.exports = {
    Task: Task
};
