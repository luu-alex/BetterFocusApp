var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const taskModel =  new Schema({
    task: String,
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    isItDone: Boolean
});

var Task = mongoose.model('Task', taskModel);

module.exports = {
    Task: Task
};
