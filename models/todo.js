var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const toDoModel = new Schema({
    isItDone: Boolean,
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    deadLine: Date
});

var ToDo = mongoose.model('Todo', toDoModel);

module.exports = {
    ToDo: ToDo
}
