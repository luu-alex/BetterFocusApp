var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const TodoModel = new Schema({
    todo: String,
    isItDone: {
        type: Boolean,
        default: false
    },
    user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

var Todo = mongoose.model('Todo', TodoModel, 'Todos');

module.exports = {
    Todo: Todo
}
