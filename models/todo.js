var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const toDoModel = new Schema({
    isItDone: Boolean,
    userID: Number,
    deadLine: Date
});

var ToDo = mongoose.model('Todo', toDoModel);

module.exports = {
    ToDo: ToDo
}
