var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const toDoModel = new Schema({
    todo: String,
    isItDone: {
        type: Boolean,
        default: false
    },
    user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

var ToDo = mongoose.model('Todo', toDoModel);

module.exports = {
    ToDo: ToDo
}
