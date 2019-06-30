var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const toDoModel = new Schema({
    todo: String,
    isItDone: {
        type: Boolean,
        default: false
    },
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    deadLine: {
        type: Date,
        min: Date.now,
        max: '2099-12-31'
    }
});

var ToDo = mongoose.model('Todo', toDoModel);

module.exports = {
    ToDo: ToDo
}
